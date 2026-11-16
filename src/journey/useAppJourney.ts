/**
 * Shared journey router for this standalone app.
 *
 * `useForceJourney` is left untouched and must not be called from App: it always
 * starts Chapter I, even when the URL is `?journey=korea`. This hook replaces it
 * at the App boundary.
 *
 * - `?journey=korea` starts the Korea chapter and loads Korea narration.
 * - `?journey=baseline2026` starts the 2026 military baseline journey.
 * - `?journey=mobilize` starts the disaster-response and mobilization journey.
 * - Port 5175 (Korea’s reserved preview) defaults to korea when the URL has no
 *   `journey` param, so bare `/` on 5175 does not open Chapter I.
 * - Any other first load, including `/` and `?journey=force` on 5173, preserves the
 *   existing Chapter I behavior.
 * - Keyboard shortcuts and the query string follow the ACTIVE journey and that
 *   journey’s beat count.
 */
import { useEffect } from 'react'
import { getJourneyBeatCount } from './runtime'
import { useExperience } from '../store/experience'
import { useJourney } from '../store/journey'
import { initNarration, useNarration } from '../store/narration'
import type { JourneyId } from './types'

function requestedJourney(): JourneyId {
  if (typeof window === 'undefined') return 'force'
  const value = new URL(window.location.href).searchParams.get('journey')
  if (value === 'korea') return 'korea'
  if (value === 'baseline2026') return 'baseline2026'
  if (value === 'mobilize') return 'mobilize'
  if (value === 'force') return 'force'
  // Port 5175 is reserved for the Korea preview; bare `/` there must not enter Chapter I.
  if (window.location.port === '5175') return 'korea'
  return 'force'
}

function syncJourneyQuery(active: JourneyId | null, lastExited: JourneyId | null = null) {
  const url = new URL(window.location.href)
  // Keep a non-default journey in the URL after Esc so refresh re-enters it.
  // Bare `/` and an exited Chapter I still drop the param, matching today.
  const keep = active ?? (lastExited && lastExited !== 'force' ? lastExited : null)
  if (keep) url.searchParams.set('journey', keep)
  else url.searchParams.delete('journey')
  const next = `${url.pathname}${url.search}${url.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) window.history.replaceState(window.history.state, '', next)
}

export function useAppJourney() {
  const activeJourney = useJourney((store) => store.activeJourney)
  const startJourney = useJourney((store) => store.startJourney)
  const exitJourney = useJourney((store) => store.exitJourney)
  const setBeat = useJourney((store) => store.setBeat)
  const advance = useJourney((store) => store.advance)
  const closeCard = useJourney((store) => store.closeCard)
  const sourcesOpen = useJourney((store) => store.sourcesOpen)
  const selectedCardId = useJourney((store) => store.selectedCardId)
  const toggleSources = useJourney((store) => store.toggleSources)
  const lastExitedJourney = useJourney((store) => store.lastExitedJourney)

  useEffect(() => {
    const apply = () => {
      const id = requestedJourney()
      startJourney(id)
      void initNarration(id)
    }
    apply()
    window.addEventListener('popstate', apply)
    return () => window.removeEventListener('popstate', apply)
  }, [startJourney])

  useEffect(() => {
    syncJourneyQuery(activeJourney, lastExitedJourney)
  }, [activeJourney, lastExitedJourney])

  useEffect(() => {
    if (!activeJourney) return
    const unsubscribe = useExperience.subscribe((state, previous) => {
      if (previous.spaceMode === 'earth' && state.spaceMode !== 'earth') {
        exitJourney({ restoreSpaceMode: false })
      }
    })
    return unsubscribe
  }, [activeJourney, exitJourney])

  useEffect(() => {
    if (!activeJourney) return
    const beatCount = getJourneyBeatCount(activeJourney)
    const lastDigit = String(Math.max(0, beatCount - 1))
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('button,a,input,textarea,select,[contenteditable="true"]')) {
        if (event.code !== 'Escape') return
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return
      if (event.code === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        if (sourcesOpen) toggleSources(false)
        else if (selectedCardId) closeCard()
        else exitJourney()
        return
      }
      if (event.key >= '0' && event.key <= lastDigit) {
        event.preventDefault()
        event.stopPropagation()
        setBeat(Number(event.key))
        return
      }
      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        advance(-1)
        return
      }
      if (event.code === 'Space') {
        event.preventDefault()
        event.stopPropagation()
        const narration = useNarration.getState()
        if (narration.status === 'playing') narration.pause()
        else if (narration.status === 'paused') narration.resume()
        else narration.play()
        return
      }
      if (event.code === 'ArrowRight') {
        event.preventDefault()
        event.stopPropagation()
        advance(1)
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [activeJourney, advance, closeCard, exitJourney, selectedCardId, setBeat, sourcesOpen, toggleSources])
}
