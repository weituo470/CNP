import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { OrbitControls } from 'three-stdlib'
import { worldSurfaceNormal, worldSurfacePoint } from '../../components/earth/planetApi'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { useNarration } from '../../store/narration'
import { EARTH_RADIUS } from '../../utils/geo'
import type { JourneyFocus } from '../types'

/**
 * Flies the existing Earth camera along its current radial offset to a beat distance,
 * or, when a beat asks for a dive, keeps pushing in until a typological battlefield
 * fills the frame. Does not add a second renderer.
 */

const ORBIT_RATE = 1.15
const SWING_SECONDS = 5.2
const PULL_SECONDS = 7.8
const BASE_FOV = 38
const WORLD_UP = new THREE.Vector3(0, 1, 0)

function diveDuration(beatIndex: number) {
  // Hook: hold through p0 (~13.6s) and descend through most of p1 (~21.8s).
  if (beatIndex === 0) return 34
  if (beatIndex === 5) return 18
  return 18
}

function diveHold(beatIndex: number) {
  // Hook p0 is now ~11.6s; hold through it, then descend with p1 (to 33.5s).
  if (beatIndex === 0) return 0.34
  return 0.12
}

const _normal = new THREE.Vector3()
const _northPole = new THREE.Vector3()
const _north = new THREE.Vector3()
const _east = new THREE.Vector3()
const _surface = new THREE.Vector3()
const _orbitPos = new THREE.Vector3()
const _divePos = new THREE.Vector3()
const _diveTarget = new THREE.Vector3()
const _look = new THREE.Vector3()
const _fromPos = new THREE.Vector3()
const _fromLook = new THREE.Vector3()

function shouldDive(focus: JourneyFocus | null, beatIndex: number, paragraphIndex: number, status: string) {
  if (!focus?.dive) return false
  // Hook paragraphs 0–1 are one cinematic: hold above China, then descend.
  if (beatIndex === 0 && paragraphIndex <= 1) return status === 'playing' || status === 'paused'
  return true
}

/** Hold on the globe, then a long descent, then a soft settle. t is raw 0–1 clock. */
function easeDive(t: number, hold = 0.12) {
  const x = THREE.MathUtils.clamp(t, 0, 1)
  if (x < hold) return 0
  const startEnd = hold + 0.08
  if (x < startEnd) {
    const u = (x - hold) / 0.08
    return 0.04 * (u * u * (3 - 2 * u))
  }
  // Reach most of the descent by 0.72 of the clock so the field can fill mid-narration.
  const midEnd = 0.72
  if (x < midEnd) {
    const u = (x - startEnd) / (midEnd - startEnd)
    return 0.04 + Math.pow(u, 0.82) * 0.84
  }
  const u = (x - midEnd) / (1 - midEnd)
  const s = u * u * (3 - 2 * u)
  return 0.88 + s * 0.12
}

/** Dolly along the dive path by remaining distance, not a linear world lerp. */
function lerpDivePath(start: THREE.Vector3, end: THREE.Vector3, t: number, out: THREE.Vector3) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1)
  if (clamped >= 1) {
    out.copy(end)
    return out
  }
  const d0 = Math.max(1e-4, start.distanceTo(end))
  const remaining = d0 * Math.pow(1 - clamped, 2.7)
  const u = 1 - remaining / d0
  out.copy(start).lerp(end, u)
  return out
}

/** 0 in orbit, 1 when the camera has settled over the field. Based on real distance. */
function closenessToDive(position: THREE.Vector3, divePos: THREE.Vector3) {
  const d = position.distanceTo(divePos)
  return 1 - THREE.MathUtils.smoothstep(d, 0.045, 1.55)
}

function easePull(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1)
  return 1 - Math.pow(1 - x, 2.15)
}

function easeSwing(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1)
  return x * x * (3 - 2 * x)
}

function composeOrbit(focus: JourneyFocus, out: THREE.Vector3) {
  worldSurfaceNormal(focus.lat, focus.lon, _normal)
  // Keep the camera on the current radial if it already almost faces the site,
  // so the planet's own turn can finish without the camera sliding sideways.
  return out.copy(_normal).multiplyScalar(focus.distance)
}

function composeDive(focus: JourneyFocus, outPos: THREE.Vector3, outTarget: THREE.Vector3) {
  const dive = focus.dive
  if (!dive) {
    composeOrbit(focus, outPos)
    outTarget.set(0, 0, 0)
    return
  }
  worldSurfaceNormal(focus.lat, focus.lon, _normal)
  worldSurfacePoint(focus.lat, focus.lon, EARTH_RADIUS, _surface)
  worldSurfaceNormal(Math.min(89, focus.lat + 0.35), focus.lon, _northPole)
  _north.copy(_northPole).addScaledVector(_normal, -_northPole.dot(_normal)).normalize()
  if (_north.lengthSq() < 1e-8) {
    _east.crossVectors(WORLD_UP, _normal).normalize()
    _north.crossVectors(_normal, _east).normalize()
  } else {
    _east.crossVectors(_normal, _north).normalize()
  }
  const altitude = dive.altitude
  const back = dive.back ?? 0.028
  const pitch = dive.pitch ?? 0.36
  // pitch 1 = almost nadir (short back), pitch 0 = more oblique.
  const backUse = back * (1.15 - pitch * 0.7)
  outPos.copy(_surface).addScaledVector(_normal, altitude + 0.002).addScaledVector(_north, -backUse)
  outTarget.copy(_surface).addScaledVector(_normal, 0.0024).addScaledVector(_north, backUse * 0.45)
}

type Flight = {
  kind: 'idle' | 'orbit' | 'swing' | 'dive' | 'linger' | 'pull'
  startedAt: number
  duration: number
  fromDistance: number
}

export function JourneyCameraController() {
  const activeJourney = useJourney((store) => store.activeJourney)
  const focus = useJourney((store) => store.focus)
  const cameraNonce = useJourney((store) => store.cameraNonce)
  const beatIndex = useJourney((store) => store.beatIndex)
  const restoreCamera = useJourney((store) => store.restoreCamera)
  const captureCameraPosition = useJourney((store) => store.captureCameraPosition)
  const setDiveProgress = useJourney((store) => store.setDiveProgress)
  const paragraphIndex = useNarration((store) => store.paragraphIndex)
  const narrationStatus = useNarration((store) => store.status)
  const { camera, controls } = useThree()
  const reducedMotion = useReducedMotion()
  const orbitTarget = useRef<THREE.Vector3 | null>(null)
  const entered = useRef(false)
  const lookAt = useRef(new THREE.Vector3())
  const flight = useRef<Flight>({ kind: 'idle', startedAt: 0, duration: 1, fromDistance: 4.25 })
  const wasDiving = useRef(false)
  const lastNonce = useRef(-1)
  const lastShould = useRef(false)
  const lastDivePos = useRef(new THREE.Vector3())

  useEffect(() => {
    if (activeJourney && !entered.current) {
      entered.current = true
      captureCameraPosition(camera.position.toArray() as [number, number, number])
    }
    if (!activeJourney && entered.current) {
      entered.current = false
      flight.current.kind = 'idle'
      setDiveProgress(0)
      if (restoreCamera) {
        const restored = new THREE.Vector3(...restoreCamera)
        if (reducedMotion) {
          camera.position.copy(restored)
          camera.lookAt(0, 0, 0)
          lookAt.current.set(0, 0, 0)
          camera.updateProjectionMatrix()
          orbitTarget.current = null
        } else {
          orbitTarget.current = restored
        }
      }
    }
  }, [activeJourney, camera, captureCameraPosition, reducedMotion, restoreCamera, setDiveProgress])

  useEffect(() => {
    if (!activeJourney || !focus) return
    const diving = shouldDive(focus, beatIndex, paragraphIndex, narrationStatus)
    const nonceChanged = lastNonce.current !== cameraNonce
    const diveToggled = lastShould.current !== diving
    lastNonce.current = cameraNonce
    lastShould.current = diving

    if (!nonceChanged && !diveToggled) return

    const now = performance.now()
    const currentDistance = camera.position.length()
    if (diving) {
      worldSurfaceNormal(focus.lat, focus.lon, _normal)
      const angle = camera.position.clone().normalize().angleTo(_normal)
      const needsSwing = angle > 0.32
      if (reducedMotion) {
        composeDive(focus, camera.position, lookAt.current)
        camera.near = 0.002
        camera.updateProjectionMatrix()
        camera.lookAt(lookAt.current)
        flight.current = { kind: 'idle', startedAt: now, duration: 1, fromDistance: currentDistance }
        wasDiving.current = true
        setDiveProgress(1)
        orbitTarget.current = null
        return
      }
      flight.current = {
        kind: needsSwing ? 'swing' : 'dive',
        startedAt: now,
        duration: needsSwing ? SWING_SECONDS : diveDuration(beatIndex),
        fromDistance: currentDistance,
      }
      _fromPos.copy(camera.position)
      _fromLook.copy(lookAt.current)
      wasDiving.current = true
      orbitTarget.current = null
      return
    }

    composeOrbit(focus, _orbitPos)
    if (wasDiving.current && !reducedMotion) {
      flight.current = {
        kind: 'pull',
        startedAt: now,
        duration: PULL_SECONDS,
        fromDistance: currentDistance,
      }
      _fromPos.copy(camera.position)
      _fromLook.copy(lookAt.current)
      wasDiving.current = false
      orbitTarget.current = null
      return
    }
    wasDiving.current = false
    flight.current = { kind: 'idle', startedAt: now, duration: 1, fromDistance: currentDistance }
    if (reducedMotion) {
      camera.position.copy(_orbitPos)
      lookAt.current.set(0, 0, 0)
      camera.lookAt(0, 0, 0)
      camera.near = 0.01
      camera.updateProjectionMatrix()
      orbitTarget.current = null
      setDiveProgress(0)
    } else {
      orbitTarget.current = _orbitPos.clone()
      setDiveProgress(0)
    }
  }, [activeJourney, beatIndex, camera, cameraNonce, focus, narrationStatus, paragraphIndex, reducedMotion, setDiveProgress])

  useFrame((_, delta) => {
    const orbitControls = controls as OrbitControls | undefined
    const flying = flight.current.kind !== 'idle' || Boolean(orbitTarget.current)
    const progressNow = useJourney.getState().diveProgress

    if (orbitControls) {
      orbitControls.enabled = !flying && progressNow < 0.05 && Boolean(activeJourney)
      // During a journey flight the script owns the camera; after it settles, gentle orbit is allowed again.
      if (!activeJourney) {
        orbitControls.enabled = true
        orbitControls.minDistance = 1.72
      } else if (flying || progressNow > 0.05) {
        orbitControls.enabled = false
        orbitControls.minDistance = 0.003
      } else {
        orbitControls.minDistance = 1.72
      }
    }

    if (!activeJourney) {
      if (orbitTarget.current) {
        camera.position.lerp(orbitTarget.current, 1 - Math.exp(-delta * ORBIT_RATE))
        camera.lookAt(0, 0, 0)
        if (camera.position.distanceToSquared(orbitTarget.current) < 0.00002) {
          camera.position.copy(orbitTarget.current)
          camera.lookAt(0, 0, 0)
          orbitTarget.current = null
        }
      }
      return
    }

    if (!focus) return

    const now = performance.now()
    const fl = flight.current
    if (narrationStatus === 'paused' && (fl.kind === 'dive' || fl.kind === 'swing' || fl.kind === 'pull' || fl.kind === 'linger')) {
      fl.startedAt += delta * 1000
      syncControls(orbitControls, lookAt.current)
      return
    }
    const tRaw = (now - fl.startedAt) / Math.max(0.016, fl.duration * 1000)

    if (fl.kind === 'swing' && focus.dive) {
      const t = easeSwing(tRaw)
      composeOrbit(focus, _orbitPos)
      camera.position.lerpVectors(_fromPos, _orbitPos, t)
      _look.copy(_fromLook).lerp(new THREE.Vector3(0, 0, 0), t)
      lookAt.current.copy(_look)
      camera.lookAt(lookAt.current)
      const closeness = THREE.MathUtils.smoothstep(camera.position.length(), focus.distance + 0.8, focus.distance)
      setDiveProgress(closeness * 0.08)
      if (tRaw >= 1) {
        flight.current = {
          kind: 'dive',
          startedAt: now,
          duration: diveDuration(beatIndex),
          fromDistance: camera.position.length(),
        }
        _fromPos.copy(camera.position)
        _fromLook.copy(lookAt.current)
      }
      applyLens(camera, 0.08)
      syncControls(orbitControls, lookAt.current)
      return
    }

    if (fl.kind === 'dive' && focus.dive) {
      const t = easeDive(tRaw, diveHold(beatIndex))
      composeOrbit(focus, _orbitPos)
      composeDive(focus, _divePos, _diveTarget)
      lastDivePos.current.copy(_divePos)
      // Start from wherever we are on the radial, so a late play() still dives from the current overview.
      lerpDivePath(_fromPos, _divePos, t, camera.position)
      const pathU = _fromPos.distanceTo(_divePos) < 1e-5 ? t : 1 - camera.position.distanceTo(_divePos) / Math.max(1e-4, _fromPos.distanceTo(_divePos))
      lookAt.current.copy(_fromLook).lerp(_diveTarget, pathU)
      camera.lookAt(lookAt.current)
      const close = closenessToDive(camera.position, _divePos)
      setDiveProgress(close)
      applyLens(camera, close)
      syncControls(orbitControls, lookAt.current)
      if (tRaw >= 1) {
        camera.position.copy(_divePos)
        lookAt.current.copy(_diveTarget)
        camera.lookAt(lookAt.current)
        flight.current = { kind: 'linger', startedAt: now, duration: 1, fromDistance: camera.position.length() }
        setDiveProgress(1)
        applyLens(camera, 1)
      }
      return
    }

    if (fl.kind === 'linger' && focus.dive) {
      const elapsed = (now - fl.startedAt) / 1000
      composeDive(focus, _divePos, _diveTarget)
      lastDivePos.current.copy(_divePos)
      const sway = Math.sin(elapsed * 0.22) * 0.0016
      const lift = Math.sin(elapsed * 0.15) * 0.00045
      worldSurfaceNormal(focus.lat, focus.lon, _normal)
      _east.crossVectors(_normal, _north).normalize()
      _divePos.addScaledVector(_east, sway).addScaledVector(_normal, lift)
      _diveTarget.addScaledVector(_east, sway * 0.35)
      camera.position.lerp(_divePos, 1 - Math.exp(-delta * 1.2))
      lookAt.current.lerp(_diveTarget, 1 - Math.exp(-delta * 1.2))
      camera.lookAt(lookAt.current)
      setDiveProgress(1)
      applyLens(camera, 1)
      syncControls(orbitControls, lookAt.current)
      return
    }

    if (fl.kind === 'pull') {
      const t = easePull(tRaw)
      composeOrbit(focus, _orbitPos)
      camera.position.lerpVectors(_fromPos, _orbitPos, t)
      lookAt.current.copy(_fromLook).lerp(new THREE.Vector3(0, 0, 0), t)
      camera.lookAt(lookAt.current)
      const close = closenessToDive(camera.position, lastDivePos.current)
      setDiveProgress(close)
      applyLens(camera, close)
      syncControls(orbitControls, lookAt.current)
      if (tRaw >= 1) {
        camera.position.copy(_orbitPos)
        lookAt.current.set(0, 0, 0)
        camera.lookAt(0, 0, 0)
        flight.current.kind = 'idle'
        setDiveProgress(0)
        applyLens(camera, 0)
      }
      return
    }

    if (orbitTarget.current) {
      camera.position.lerp(orbitTarget.current, 1 - Math.exp(-delta * ORBIT_RATE))
      lookAt.current.lerp(new THREE.Vector3(0, 0, 0), 1 - Math.exp(-delta * ORBIT_RATE))
      camera.lookAt(lookAt.current)
      applyLens(camera, 0)
      if (camera.position.distanceToSquared(orbitTarget.current) < 0.00002) {
        camera.position.copy(orbitTarget.current)
        lookAt.current.set(0, 0, 0)
        camera.lookAt(0, 0, 0)
        orbitTarget.current = null
      }
      syncControls(orbitControls, lookAt.current)
      return
    }

    // Keep a settled dive locked to the surface if linger was interrupted.
    if (wasDiving.current && focus.dive && shouldDive(focus, beatIndex, paragraphIndex, narrationStatus)) {
      composeDive(focus, _divePos, _diveTarget)
      camera.position.lerp(_divePos, 1 - Math.exp(-delta * 1.4))
      lookAt.current.lerp(_diveTarget, 1 - Math.exp(-delta * 1.4))
      camera.lookAt(lookAt.current)
      applyLens(camera, 1)
      setDiveProgress(1)
      syncControls(orbitControls, lookAt.current)
    }
  })

  return null
}

function applyLens(camera: THREE.Camera, closeness: number) {
  if (!('isPerspectiveCamera' in camera) || !camera.isPerspectiveCamera) return
  const perspective = camera as THREE.PerspectiveCamera
  const c = THREE.MathUtils.clamp(closeness, 0, 1)
  const near = THREE.MathUtils.lerp(0.01, 0.0016, c)
  // Widen slightly mid-descent, then settle on a cinematic field of view.
  const fov = c < 0.55
    ? THREE.MathUtils.lerp(BASE_FOV, 42, c / 0.55)
    : THREE.MathUtils.lerp(42, 38.5, (c - 0.55) / 0.45)
  const nearChanged = Math.abs(perspective.near - near) > 0.0002
  const fovChanged = Math.abs(perspective.fov - fov) > 0.05
  if (nearChanged || fovChanged) {
    perspective.near = near
    perspective.fov = fov
    perspective.updateProjectionMatrix()
  }
}

function syncControls(controls: OrbitControls | undefined, target: THREE.Vector3) {
  if (!controls) return
  controls.target.copy(target)
  controls.update()
}
