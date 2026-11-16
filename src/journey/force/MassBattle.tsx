import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useJourney } from '../../store/journey'
import { EARTH_RADIUS, latLngToVector3 } from '../../utils/geo'
import { SurfaceAnchor } from './surfaceAnchor'
import {
  PEER,
  QIN,
  SPEAR_GRIP,
  type Palette,
  createBannerGeometry,
  createHorseGeometry,
  createShadowGeometry,
  createSoldierGeometry,
  createSpearGeometry,
  createRockGeometry,
  createTreeGeometry,
} from './unitGeometries'

export type BattleMode = 'clash' | 'encircle' | 'mass'

const Y_UP = new THREE.Vector3(0, 1, 0)
const WORLD_UP = new THREE.Vector3(0, 1, 0)
const _color = new THREE.Color()
const _matrix = new THREE.Matrix4()
const _position = new THREE.Vector3()
const _quaternion = new THREE.Quaternion()
const _scale = new THREE.Vector3()
const _euler = new THREE.Euler()
const _grip = new THREE.Vector3()
const _spearQ = new THREE.Quaternion()
const _pitchQ = new THREE.Quaternion()
const _axisX = new THREE.Vector3(1, 0, 0)

const TERRAIN = 0.22
const SOLDIER = 0.00208
const FILE_GAP = 0.00112
const RANK_GAP = 0.00142

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function terrainHeight(x: number, z: number) {
  const u = x / TERRAIN
  const v = z / TERRAIN
  const r = Math.hypot(u * 1.05, v)
  const rim = Math.pow(Math.max(0, r - 0.18), 2.2) * 0.028
  const hillL = Math.exp(-((u + 0.38) ** 2) / 0.05 - ((v - 0.15) ** 2) / 0.08) * 0.0075
  const hillR = Math.exp(-((u - 0.42) ** 2) / 0.06 - ((v - 0.08) ** 2) / 0.07) * 0.0065
  const far = Math.exp(-((v - 0.42) ** 2) / 0.06 - (u ** 2) / 0.15) * 0.008
  const nearRidge = Math.exp(-((v + 0.36) ** 2) / 0.04 - ((u - 0.1) ** 2) / 0.12) * 0.0035
  const rolls = Math.sin(u * 9.1) * Math.cos(v * 7.4) * 0.00055 + Math.sin(u * 21 + v * 13) * 0.00018
  const stream = -Math.exp(-((u * 0.7 + Math.sin(v * 8) * 0.04 + 0.05) ** 2) / 0.0018) * 0.0016
  const bowl = -Math.exp(-(r * r) / 0.12) * 0.0009
  return rim + hillL + hillR + far + nearRidge + rolls + stream + bowl
}

function makeGroundTexture(companies: Company[]) {
  const size = 1536
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const mid = size / 2
  const image = ctx.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x - mid) / mid
      const v = (y - mid) / mid
      const r = Math.hypot(u, v)
      const grain = (Math.sin(x * 0.037) * Math.cos(y * 0.031) + Math.sin((x * 0.13 + y) * 0.018)) * 0.28
      const grass = Math.max(0, Math.sin(x * 0.07 + y * 0.045) * 0.45 + Math.sin(y * 0.11) * 0.22)
      const stream = Math.exp(-((u * 0.7 + Math.sin(v * 8) * 0.04 + 0.05) ** 2) / 0.0018)
      const tracks = Math.exp(-((u + 0.04) ** 2) / 0.01) * (0.14 + Math.abs(Math.sin(y * 0.18)) * 0.1)
      const trampling = Math.exp(-((u * 2.4) ** 2 + ((v - 0.08) * 1.6) ** 2) / 0.22) * 0.28
      const farHost = Math.exp(-((v - 0.55) ** 2) / 0.02 - ((u + 0.12) ** 2) / 0.05) * 0.16
      const rim = Math.max(0, r - 0.72) / 0.28
      let red = 118 + grain * 22 + grass * 16 - stream * 18 - trampling * 26 - tracks * 18 - farHost * 22 - rim * 18
      let green = 100 + grain * 14 + grass * 32 - stream * 8 - trampling * 22 - tracks * 12 - farHost * 16 - rim * 14
      let blue = 62 + grain * 8 + grass * 6 - stream * 2 - trampling * 14 - tracks * 8 - farHost * 10 - rim * 10
      // Circular feather so the board never reads as a hard square against the globe.
      const fade = THREE.MathUtils.smoothstep(r, 0.74, 0.98)
      const i = (y * size + x) * 4
      image.data[i] = Math.max(0, Math.min(255, red))
      image.data[i + 1] = Math.max(0, Math.min(255, green))
      image.data[i + 2] = Math.max(0, Math.min(255, blue))
      image.data[i + 3] = Math.max(0, Math.min(255, 255 * (1 - fade)))
    }
  }
  ctx.putImageData(image, 0, 0)
  ctx.globalCompositeOperation = 'multiply'
  for (const company of companies) {
    const px = mid + (company.cx / (TERRAIN * 0.5)) * mid
    const py = mid + (company.cz / (TERRAIN * 0.5)) * mid
    const rx = (company.depth / TERRAIN) * size * 0.72
    const ry = (company.width / TERRAIN) * size * 0.72
    const gradient = ctx.createRadialGradient(px, py, 2, px, py, Math.max(rx, ry))
    gradient.addColorStop(0, 'rgba(40, 28, 16, 0.32)')
    gradient.addColorStop(0.55, 'rgba(40, 28, 16, 0.14)')
    gradient.addColorStop(1, 'rgba(40, 28, 16, 0)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(px, py, rx, ry, company.heading, 0, Math.PI * 2)
    ctx.fill()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.premultiplyAlpha = true
  texture.needsUpdate = true
  return texture
}

function makeSkyTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const gradient = ctx.createLinearGradient(0, 0, 0, 256)
  gradient.addColorStop(0, '#6f8498')
  gradient.addColorStop(0.45, '#b7b3a6')
  gradient.addColorStop(0.72, '#d9c4a0')
  gradient.addColorStop(1, '#c9b089')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 256)
  const sun = ctx.createRadialGradient(160, 170, 4, 160, 170, 90)
  sun.addColorStop(0, 'rgba(255, 230, 180, 0.85)')
  sun.addColorStop(0.25, 'rgba(255, 200, 130, 0.35)')
  sun.addColorStop(1, 'rgba(255, 200, 130, 0)')
  ctx.fillStyle = sun
  ctx.fillRect(0, 0, 512, 256)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function makeSmokeTexture() {
  const size = 160
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  const gradient = ctx.createRadialGradient(size * 0.5, size * 0.62, 6, size * 0.5, size * 0.42, size * 0.48)
  gradient.addColorStop(0, 'rgba(190, 170, 140, 0.55)')
  gradient.addColorStop(0.45, 'rgba(150, 132, 108, 0.22)')
  gradient.addColorStop(1, 'rgba(120, 104, 84, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

type Slot = {
  x: number
  z: number
  heading: number
  seed: number
  kind: 'foot' | 'cavalry' | 'banner' | 'fallen'
  side: 'west' | 'east' | 'ring' | 'pocket'
  live: boolean
  rank: number
  spearPitch: number
}

type Company = {
  cx: number
  cz: number
  width: number
  depth: number
  heading: number
  side: Slot['side']
}

function pushRanks(
  into: Slot[],
  side: Slot['side'],
  cx: number,
  cz: number,
  files: number,
  ranks: number,
  heading: number,
  kind: Slot['kind'] = 'foot',
  liveChance = 1,
  fileGap = FILE_GAP,
  rankGap = RANK_GAP,
) {
  let n = into.length
  for (let rank = 0; rank < ranks; rank++) {
    for (let file = 0; file < files; file++) {
      if ((file < 1 || file > files - 2 || rank === ranks - 1) && hash(n * 1.7 + cx * 80) > 0.82) continue
      const jitter = rank < 3 ? 0.03 : 0.08
      const stagger = rank < 3 ? 0.04 : 0.1
      const fx = (file - (files - 1) / 2 + (rank % 2) * stagger + (hash(n + 3) - 0.5) * jitter) * fileGap
      const rz = (rank - (ranks - 1) / 2 + (hash(n + 8) - 0.5) * jitter * 0.8) * rankGap
      const x = cx + fx * Math.cos(heading + Math.PI / 2) + rz * Math.cos(heading)
      const z = cz + fx * Math.sin(heading + Math.PI / 2) + rz * Math.sin(heading)
      const fallen = kind === 'foot' && liveChance < 1 && hash(n + 11) > liveChance
      const spearPitch =
        kind === 'foot'
          ? rank < 3
            ? 1.22 + (hash(n + 17) - 0.5) * 0.1
            : rank < 6
              ? 0.7 + (hash(n + 17) - 0.5) * 0.12
              : 0.28 + (hash(n + 17) - 0.5) * 0.1
          : 0.2
      into.push({
        x,
        z,
        heading: heading + (hash(n + 9) - 0.5) * (fallen ? 1.3 : rank < 3 ? 0.02 : 0.045),
        seed: hash(n + 13),
        kind: fallen ? 'fallen' : kind,
        side,
        live: !fallen,
        rank,
        spearPitch: fallen ? 1.45 + hash(n + 19) * 0.2 : spearPitch,
      })
      n++
    }
  }
}

function measure(files: number, ranks: number, fileGap = FILE_GAP, rankGap = RANK_GAP) {
  return { width: files * fileGap, depth: ranks * rankGap }
}

function plantBanner(into: Slot[], company: Company) {
  const rear = company.depth * 0.38
  into.push({
    x: company.cx - Math.cos(company.heading) * rear,
    z: company.cz - Math.sin(company.heading) * rear,
    heading: company.heading,
    seed: hash(company.cx * 40 + company.cz * 18),
    kind: 'banner',
    side: company.side,
    live: true,
    rank: 0,
    spearPitch: 0,
  })
}

function addCompany(
  into: Slot[],
  companies: Company[],
  side: Slot['side'],
  cx: number,
  cz: number,
  files: number,
  ranks: number,
  heading: number,
  liveChance = 1,
  kind: Slot['kind'] = 'foot',
  fileGap = FILE_GAP,
  rankGap = RANK_GAP,
) {
  const size = measure(files, ranks, fileGap, rankGap)
  const company: Company = { cx, cz, width: size.width, depth: size.depth, heading, side }
  companies.push(company)
  pushRanks(into, side, cx, cz, files, ranks, heading, kind, liveChance, fileGap, rankGap)
  if (kind === 'foot') plantBanner(into, company)
}

const LINE_OFFSET = 0.02

function layoutClash(): { qin: Slot[]; peer: Slot[]; companies: Company[] } {
  const qin: Slot[] = []
  const peer: Slot[] = []
  const companies: Company[] = []
  const frontZ = [-0.034, -0.01, 0.014, 0.038].map((z) => z + LINE_OFFSET)
  frontZ.forEach((z, i) => {
    addCompany(qin, companies, 'west', -0.011, z, 14, 8, Math.PI / 2, i === 1 || i === 2 ? 0.82 : 0.94)
    addCompany(peer, companies, 'east', 0.011, z + 0.002, 14, 8, -Math.PI / 2, i === 1 || i === 2 ? 0.8 : 0.94)
  })
  const rearZ = [-0.022, 0.006, 0.032].map((z) => z + LINE_OFFSET)
  rearZ.forEach((z) => {
    addCompany(qin, companies, 'west', -0.028, z, 16, 9, Math.PI / 2, 0.99)
    addCompany(peer, companies, 'east', 0.028, z, 16, 9, -Math.PI / 2, 0.99)
  })
  addCompany(qin, companies, 'west', -0.044, LINE_OFFSET + 0.006, 14, 8, Math.PI / 2, 1)
  addCompany(peer, companies, 'east', 0.044, LINE_OFFSET + 0.006, 14, 8, -Math.PI / 2, 1)
  addCompany(qin, companies, 'west', -0.02, LINE_OFFSET - 0.054, 8, 5, Math.PI / 2 + 0.2, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.75)
  addCompany(qin, companies, 'west', -0.02, LINE_OFFSET + 0.058, 8, 5, Math.PI / 2 - 0.2, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.75)
  addCompany(peer, companies, 'east', 0.02, LINE_OFFSET - 0.052, 8, 5, -Math.PI / 2 - 0.18, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.75)
  addCompany(peer, companies, 'east', 0.02, LINE_OFFSET + 0.056, 8, 5, -Math.PI / 2 + 0.18, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.75)
  return { qin, peer, companies }
}

function layoutEncircle(close: number): { qin: Slot[]; peer: Slot[]; companies: Company[] } {
  const qin: Slot[] = []
  const peer: Slot[] = []
  const companies: Company[] = []
  const pocket = [
    [0, LINE_OFFSET],
    [-0.008, LINE_OFFSET - 0.008],
    [0.008, LINE_OFFSET - 0.006],
    [0, LINE_OFFSET + 0.01],
  ] as const
  pocket.forEach(([x, z], i) => {
    addCompany(peer, companies, 'pocket', x, z, 10, 7, (i / pocket.length) * Math.PI * 2, 0.78)
  })
  const radius = THREE.MathUtils.lerp(0.05, 0.034, close)
  const count = 10
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2
    const cx = Math.cos(a) * radius
    const cz = Math.sin(a) * radius * 0.86 + LINE_OFFSET
    addCompany(qin, companies, 'ring', cx, cz, 12, 7, a + Math.PI, 0.98)
  }
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + 0.3
    const r = radius + 0.016
    addCompany(qin, companies, 'ring', Math.cos(a) * r, Math.sin(a) * r * 0.86 + LINE_OFFSET, 6, 4, a + Math.PI, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.7)
  }
  return { qin, peer, companies }
}

function layoutMass(): { qin: Slot[]; peer: Slot[]; companies: Company[] } {
  const qin: Slot[] = []
  const peer: Slot[] = []
  const companies: Company[] = []
  const rows = [
    { x: 0.012, zs: [-0.04, -0.014, 0.012, 0.038] },
    { x: 0.03, zs: [-0.028, 0.0, 0.028] },
    { x: 0.046, zs: [-0.016, 0.016] },
  ]
  rows.forEach((row, rowIndex) => {
    row.zs.forEach((z) => {
      const cz = z + LINE_OFFSET
      const files = rowIndex === 0 ? 14 : 16
      const ranks = rowIndex === 0 ? 8 : 10
      addCompany(qin, companies, 'west', -row.x, cz, files, ranks, Math.PI / 2, rowIndex === 0 ? 0.9 : 0.99)
      addCompany(peer, companies, 'east', row.x, cz, files, ranks, -Math.PI / 2, rowIndex === 0 ? 0.9 : 0.99)
    })
  })
  addCompany(qin, companies, 'west', -0.024, LINE_OFFSET - 0.058, 8, 5, Math.PI / 2 + 0.16, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.7)
  addCompany(peer, companies, 'east', 0.024, LINE_OFFSET + 0.06, 8, 5, -Math.PI / 2 + 0.16, 1, 'cavalry', FILE_GAP * 1.7, RANK_GAP * 1.7)
  return { qin, peer, companies }
}

function slotXZ(slot: Slot, advance: number) {
  let x = slot.x
  let z = slot.z
  if (slot.side === 'west') x += advance
  if (slot.side === 'east') x -= advance
  if (slot.side === 'ring') {
    const len = Math.hypot(x, z - LINE_OFFSET) || 1
    x -= (x / len) * advance * 0.55
    z -= ((z - LINE_OFFSET) / len) * advance * 0.55
  }
  return { x, z }
}

function poseSlot(slot: Slot, scale: number, time: number, advance: number) {
  const { x, z } = slotXZ(slot, advance)
  const height = terrainHeight(x, z)
  const fallen = slot.kind === 'fallen'
  const bob = fallen
    ? 0
    : slot.kind === 'cavalry'
      ? Math.sin(time * 2.4 + slot.seed * 6) * 0.00012
      : slot.live
        ? Math.sin(time * 1.5 + slot.seed * 8) * 0.00004
        : 0
  _position.set(x, height + bob, z)
  const sway = fallen ? 0 : slot.kind === 'banner' ? Math.sin(time * 1.7 + slot.seed * 5) * 0.1 : Math.sin(time * 0.45 + slot.seed * 4) * 0.02
  if (fallen) {
    _euler.set(Math.PI / 2 - 0.18, slot.heading, (slot.seed - 0.5) * 0.5)
    _quaternion.setFromEuler(_euler)
  } else {
    _quaternion.setFromAxisAngle(Y_UP, slot.heading + sway)
  }
  const s = scale * (slot.kind === 'cavalry' ? 1.28 : slot.kind === 'banner' ? 0.92 : fallen ? 0.96 : 1)
  const flutter = slot.kind === 'banner' ? 1 + Math.sin(time * 2.1 + slot.seed) * 0.04 : 1
  _scale.set(s * flutter, s, s)
  return { x, z, height, fallen, s }
}

function applySlot(mesh: THREE.InstancedMesh, index: number, slot: Slot, scale: number, time: number, advance: number) {
  poseSlot(slot, scale, time, advance)
  _matrix.compose(_position, _quaternion, _scale)
  mesh.setMatrixAt(index, _matrix)
}

function applySpear(mesh: THREE.InstancedMesh, index: number, slot: Slot, scale: number, time: number, advance: number) {
  const posed = poseSlot(slot, scale, time, advance)
  if (posed.fallen && slot.seed > 0.6) {
    _scale.set(0, 0, 0)
    _matrix.compose(_position, _quaternion, _scale)
    mesh.setMatrixAt(index, _matrix)
    return
  }
  _grip.set(SPEAR_GRIP.x, SPEAR_GRIP.y, SPEAR_GRIP.z).multiplyScalar(posed.s).applyQuaternion(_quaternion).add(_position)
  if (posed.fallen) {
    _grip.y = posed.height + 0.0002
    _euler.set(Math.PI / 2 - 0.08, slot.heading + (slot.seed - 0.5) * 0.8, 0)
    _spearQ.setFromEuler(_euler)
  } else {
    _pitchQ.setFromAxisAngle(_axisX, slot.spearPitch)
    _spearQ.copy(_quaternion).multiply(_pitchQ)
  }
  _matrix.compose(_grip, _spearQ, _scale)
  mesh.setMatrixAt(index, _matrix)
}

function applyShadow(mesh: THREE.InstancedMesh, index: number, slot: Slot, scale: number, time: number, advance: number) {
  const posed = poseSlot(slot, scale, time, advance)
  _position.set(posed.x, posed.height + 0.00016, posed.z)
  _quaternion.setFromAxisAngle(Y_UP, slot.heading)
  const s = posed.s * (slot.kind === 'cavalry' ? 1.55 : posed.fallen ? 1.35 : 1.08)
  _scale.set(s, 1, s * 0.72)
  _matrix.compose(_position, _quaternion, _scale)
  mesh.setMatrixAt(index, _matrix)
}

function unitMaterial(roughness = 0.58, metalness = 0.14) {
  return new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness,
    metalness,
  })
}

function tintInstances(mesh: THREE.InstancedMesh, slots: Slot[]) {
  for (let i = 0; i < slots.length; i++) {
    _color.setRGB(1, 1, 1)
    const fallen = slots[i].kind === 'fallen'
    _color.offsetHSL((slots[i].seed - 0.5) * 0.03, 0, (slots[i].seed - 0.5) * 0.1 - (fallen ? 0.16 : 0))
    mesh.setColorAt(i, _color)
  }
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
}

function NorthAligned({ lat, lon, children }: { lat: number; lon: number; children: ReactNode }) {
  const quaternion = useMemo(() => {
    const origin = latLngToVector3(lat, lon, 1).normalize()
    const towardNorth = latLngToVector3(Math.min(89, lat + 0.35), lon, 1).normalize()
    const north = towardNorth.addScaledVector(origin, -towardNorth.dot(origin)).normalize()
    if (north.lengthSq() < 1e-8) north.set(0, 0, 1)
    const east = new THREE.Vector3().crossVectors(origin, north).normalize()
    const parentQ = new THREE.Quaternion().setFromUnitVectors(WORLD_UP, origin)
    const inv = parentQ.clone().invert()
    const localNorth = north.clone().applyQuaternion(inv)
    const localEast = east.clone().applyQuaternion(inv)
    const matrix = new THREE.Matrix4().makeBasis(localEast, Y_UP, localNorth)
    return new THREE.Quaternion().setFromRotationMatrix(matrix)
  }, [lat, lon])
  return <group quaternion={quaternion}>{children}</group>
}

function Ground({ companies }: { companies: Company[] }) {
  const texture = useMemo(() => makeGroundTexture(companies), [companies])
  const geometry = useMemo(() => {
    const geo = new THREE.CircleGeometry(TERRAIN * 0.5, 96)
    geo.rotateX(-Math.PI / 2)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const curve = -((x * x + z * z) / (2 * EARTH_RADIUS))
      pos.setY(i, terrainHeight(x, z) + curve)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])
  useEffect(
    () => () => {
      geometry.dispose()
      texture?.dispose()
    },
    [geometry, texture],
  )
  return (
    <mesh geometry={geometry} position={[0, 0, 0]} receiveShadow={false}>
      <meshLambertMaterial
        map={texture ?? undefined}
        color={texture ? '#ffffff' : '#6d5a3d'}
        transparent
        opacity={1}
        alphaTest={0.12}
        depthWrite
        premultipliedAlpha
      />
    </mesh>
  )
}

function Sky({ appear }: { appear: number }) {
  const texture = useMemo(() => makeSkyTexture(), [])
  useEffect(() => () => texture?.dispose(), [texture])
  if (appear <= 0.04) return null
  return (
    <mesh rotation={[0, 0.4, 0]} renderOrder={-2}>
      <sphereGeometry args={[0.32, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
      <meshBasicMaterial
        map={texture ?? undefined}
        color={texture ? '#ffffff' : '#b7b3a6'}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        transparent
        opacity={appear}
      />
    </mesh>
  )
}

function Scatter({ appear }: { appear: number }) {
  const treeGeom = useMemo(() => createTreeGeometry(), [])
  const rockGeom = useMemo(() => createRockGeometry(), [])
  const treeMat = useMemo(() => new THREE.MeshLambertMaterial({ vertexColors: true }), [])
  const rockMat = useMemo(() => new THREE.MeshLambertMaterial({ vertexColors: true }), [])
  const trees = useMemo(
    () =>
      [
        [-0.072, 0.055, 1.15],
        [-0.08, 0.03, 1.05],
        [-0.068, -0.02, 0.95],
        [0.078, 0.048, 1.2],
        [0.086, 0.01, 1.0],
        [0.07, 0.07, 0.9],
        [-0.05, 0.088, 1.1],
        [0.04, 0.092, 1.05],
        [-0.09, 0.07, 0.85],
        [0.094, 0.036, 0.88],
        [-0.06, -0.07, 0.8],
        [0.055, -0.066, 0.9],
      ] as Array<[number, number, number]>,
    [],
  )
  const rocks = useMemo(
    () =>
      [
        [-0.05, 0.07, 0.004],
        [0.06, 0.062, 0.0036],
        [-0.074, 0.01, 0.0032],
        [0.08, -0.02, 0.003],
        [0.03, 0.08, 0.0028],
        [-0.03, -0.06, 0.0034],
        [0.048, -0.05, 0.0026],
        [-0.088, 0.04, 0.0038],
      ] as Array<[number, number, number]>,
    [],
  )
  useEffect(
    () => () => {
      treeGeom.dispose()
      rockGeom.dispose()
      treeMat.dispose()
      rockMat.dispose()
    },
    [rockGeom, rockMat, treeGeom, treeMat],
  )
  return (
    <group visible={appear > 0.05}>
      {trees.map(([x, z, s], index) => (
        <mesh key={`t${index}`} geometry={treeGeom} material={treeMat} position={[x, terrainHeight(x, z), z]} scale={s * 0.0034} />
      ))}
      {rocks.map(([x, z, s], index) => (
        <mesh key={`r${index}`} geometry={rockGeom} material={rockMat} position={[x, terrainHeight(x, z), z]} scale={s * 1.1} />
      ))}
    </group>
  )
}

function Grass({ appear }: { appear: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(0.0007, 0.0014)
    geo.translate(0, 0.0007, 0)
    return geo
  }, [])
  const material = useMemo(
    () => new THREE.MeshLambertMaterial({ color: '#5a6840', side: THREE.DoubleSide, transparent: true, opacity: 0.9 }),
    [],
  )
  const positions = useMemo(() => {
    const list: Array<[number, number, number]> = []
    for (let i = 0; i < 900; i++) {
      const a = hash(i + 1) * Math.PI * 2
      const r = 0.03 + hash(i + 4) * 0.085
      const x = Math.cos(a) * r
      const z = Math.sin(a) * r * 0.95 + 0.01
      if (Math.abs(x) < 0.055 && z > -0.03 && z < 0.09) continue
      list.push([x, terrainHeight(x, z), z])
    }
    return list
  }, [])
  useEffect(() => {
    if (!mesh.current) return
    for (let i = 0; i < positions.length; i++) {
      const [x, y, z] = positions[i]
      const s = 0.7 + hash(i + 9) * 0.7
      _position.set(x, y, z)
      _quaternion.setFromAxisAngle(Y_UP, hash(i + 2) * Math.PI)
      _scale.set(s, s, s)
      _matrix.compose(_position, _quaternion, _scale)
      mesh.current.setMatrixAt(i, _matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  }, [positions])
  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )
  material.opacity = 0.35 + appear * 0.5
  return <instancedMesh ref={mesh} args={[geometry, material, positions.length]} frustumCulled={false} />
}

function Smoke({ appear, mode }: { appear: number; mode: BattleMode }) {
  const texture = useMemo(() => makeSmokeTexture(), [])
  const group = useRef<THREE.Group>(null)
  const columns = useMemo(() => {
    if (mode === 'encircle') {
      return Array.from({ length: 8 }, (_, i) => ({
        x: Math.cos((i / 8) * Math.PI * 2) * 0.028,
        z: Math.sin((i / 8) * Math.PI * 2) * 0.024 + LINE_OFFSET,
        h: 0.01 + (i % 3) * 0.002,
        seed: i * 0.2,
      }))
    }
    return [
      { x: 0, z: LINE_OFFSET - 0.01, h: 0.014, seed: 0.2 },
      { x: 0.002, z: LINE_OFFSET + 0.012, h: 0.016, seed: 0.45 },
      { x: -0.002, z: LINE_OFFSET + 0.032, h: 0.012, seed: 0.7 },
      { x: 0.001, z: LINE_OFFSET - 0.028, h: 0.011, seed: 0.15 },
    ]
  }, [mode])
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.children.forEach((child, index) => {
      const mesh = child as THREE.Mesh
      const material = mesh.material as THREE.MeshBasicMaterial
      const seed = columns[index]?.seed ?? 0
      material.opacity = appear * (0.22 + Math.sin(t * 0.3 + seed * 6) * 0.06)
      mesh.position.y = columns[index].h * 0.55 + Math.sin(t * 0.34 + seed) * 0.0005
    })
  })
  useEffect(() => () => texture?.dispose(), [texture])
  return (
    <group ref={group}>
      {columns.map((column, index) => (
        <mesh key={index} position={[column.x, column.h * 0.55, column.z]} renderOrder={4}>
          <planeGeometry args={[0.02, column.h]} />
          <meshBasicMaterial
            map={texture ?? undefined}
            color="#c6b496"
            transparent
            opacity={0.2}
            depthWrite={false}
            side={THREE.DoubleSide}
            fog
          />
        </mesh>
      ))}
    </group>
  )
}

function ArmyInstances({
  slots,
  palette,
  visible,
}: {
  slots: Slot[]
  palette: Palette
  visible: number
}) {
  const foot = useMemo(() => slots.filter((slot) => slot.kind === 'foot' || slot.kind === 'fallen'), [slots])
  const cavalry = useMemo(() => slots.filter((slot) => slot.kind === 'cavalry'), [slots])
  const banners = useMemo(() => slots.filter((slot) => slot.kind === 'banner'), [slots])
  const grounded = useMemo(() => slots.filter((slot) => slot.kind !== 'banner'), [slots])
  const soldierGeom = useMemo(() => createSoldierGeometry(palette), [palette])
  const spearGeom = useMemo(() => createSpearGeometry(palette), [palette])
  const horseGeom = useMemo(() => createHorseGeometry(palette), [palette])
  const bannerGeom = useMemo(() => createBannerGeometry(palette), [palette])
  const shadowGeom = useMemo(() => createShadowGeometry(), [])
  const material = useMemo(() => unitMaterial(0.58, 0.14), [])
  const spearMat = useMemo(() => unitMaterial(0.42, 0.28), [])
  const horseMat = useMemo(() => unitMaterial(0.62, 0.08), [])
  const bannerMat = useMemo(() => unitMaterial(0.78, 0.04), [])
  const shadowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.32,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  )
  const soldierRef = useRef<THREE.InstancedMesh>(null)
  const spearRef = useRef<THREE.InstancedMesh>(null)
  const horseRef = useRef<THREE.InstancedMesh>(null)
  const bannerRef = useRef<THREE.InstancedMesh>(null)
  const shadowRef = useRef<THREE.InstancedMesh>(null)
  const tinted = useRef(false)
  const frame = useRef(0)

  useEffect(() => {
    tinted.current = false
  }, [slots])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    const dive = useJourney.getState().diveProgress
    const advance = dive * 0.0007
    frame.current += 1
    const write = (
      mesh: THREE.InstancedMesh | null,
      list: Slot[],
      always: boolean,
      apply: (mesh: THREE.InstancedMesh, index: number, slot: Slot, scale: number, time: number, advance: number) => void,
    ) => {
      if (!mesh || list.length === 0) return
      if (!tinted.current) tintInstances(mesh, list)
      if (!always && dive > 0.92 && frame.current % 2 === 1) return
      for (let i = 0; i < list.length; i++) apply(mesh, i, list[i], SOLDIER, time, advance)
      mesh.instanceMatrix.needsUpdate = true
    }
    if (visible > 0.02) {
      write(soldierRef.current, foot, false, applySlot)
      write(spearRef.current, foot, false, applySpear)
      write(horseRef.current, cavalry, true, applySlot)
      write(bannerRef.current, banners, true, applySlot)
      write(shadowRef.current, grounded, false, applyShadow)
      tinted.current = true
    }
  })

  useEffect(
    () => () => {
      soldierGeom.dispose()
      spearGeom.dispose()
      horseGeom.dispose()
      bannerGeom.dispose()
      shadowGeom.dispose()
      material.dispose()
      spearMat.dispose()
      horseMat.dispose()
      bannerMat.dispose()
      shadowMat.dispose()
    },
    [bannerGeom, bannerMat, horseGeom, horseMat, material, shadowGeom, shadowMat, soldierGeom, spearGeom, spearMat],
  )

  return (
    <group visible={visible > 0.02}>
      {grounded.length > 0 && <instancedMesh ref={shadowRef} args={[shadowGeom, shadowMat, grounded.length]} frustumCulled={false} renderOrder={1} />}
      {foot.length > 0 && <instancedMesh ref={soldierRef} args={[soldierGeom, material, foot.length]} frustumCulled={false} />}
      {foot.length > 0 && <instancedMesh ref={spearRef} args={[spearGeom, spearMat, foot.length]} frustumCulled={false} />}
      {cavalry.length > 0 && <instancedMesh ref={horseRef} args={[horseGeom, horseMat, cavalry.length]} frustumCulled={false} />}
      {banners.length > 0 && <instancedMesh ref={bannerRef} args={[bannerGeom, bannerMat, banners.length]} frustumCulled={false} />}
    </group>
  )
}

export function MassBattle({
  lat,
  lon,
  mode,
}: {
  lat: number
  lon: number
  mode: BattleMode
}) {
  const diveProgress = useJourney((store) => store.diveProgress)
  const reducedMotion = useReducedMotion()
  const world = useRef<THREE.Group>(null)
  const appear = reducedMotion ? 1 : THREE.MathUtils.smoothstep(diveProgress, 0.86, 0.95)
  const skyAppear = reducedMotion ? 1 : THREE.MathUtils.smoothstep(diveProgress, 0.92, 0.985)
  const armyAppear = reducedMotion ? 1 : THREE.MathUtils.smoothstep(diveProgress, 0.89, 0.97)

  const layouts = useMemo(() => {
    if (mode === 'encircle') return layoutEncircle(reducedMotion ? 0.85 : 0.4)
    if (mode === 'mass') return layoutMass()
    return layoutClash()
  }, [mode, reducedMotion])

  useFrame(() => {
    if (!world.current) return
    world.current.visible = appear > 0.02
  })

  return (
    <SurfaceAnchor lat={lat} lon={lon} altitude={EARTH_RADIUS * 1.0012}>
      <NorthAligned lat={lat} lon={lon}>
        <ambientLight intensity={0.5} color="#cbb89a" />
        <hemisphereLight args={['#f0e2c4', '#6a4e2a', 0.74]} />
        <directionalLight position={[0.08, 0.06, -0.04]} intensity={1.8} color="#ffd4a0" />
        <directionalLight position={[-0.05, 0.04, 0.06]} intensity={0.42} color="#8898aa" />
        <group ref={world} visible={false}>
          <Sky appear={skyAppear} />
          <Ground companies={layouts.companies} />
          <Scatter appear={appear} />
          <Grass appear={appear} />
          <Smoke appear={appear} mode={mode} />
          <group visible={armyAppear > 0.02}>
            <ArmyInstances slots={layouts.qin} palette={QIN} visible={armyAppear} />
            <ArmyInstances slots={layouts.peer} palette={PEER} visible={armyAppear} />
          </group>
        </group>
      </NorthAligned>
    </SurfaceAnchor>
  )
}
