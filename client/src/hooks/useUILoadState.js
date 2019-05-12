import { useState, useEffect, useRef } from 'react'
import useOnUnmount from './useOnUnmount'

export default function useUILoadState(
  isLoading,
  waitMs = 500,
  minLoadingMs = 750
) {
  const timeoutIdRef = useRef(null)
  const [showLoadingStartTime, setLoadingStartTime] = useState(
    isLoading ? Date.now() : null
  )

  const _clearTimeout = () => {
    clearTimeout(timeoutIdRef.current)
    timeoutIdRef.current = null
  }

  const _setTimeout = (callback, timeoutMs) => {
    timeoutIdRef.current = setTimeout(callback, timeoutMs)
  }

  useOnUnmount(_clearTimeout)

  useEffect(
    () => {
      const isShowingLoadingState = showLoadingStartTime !== null

      if (isLoading) {
        if (isShowingLoadingState) {
          _clearTimeout()
        } else {
          _setTimeout(() => setLoadingStartTime(Date.now()), waitMs)
        }
      } else {
        // Not loading
        if (isShowingLoadingState) {
          const timeSinceShowLoadingStart = Date.now() - showLoadingStartTime
          const additionalWaitMs = minLoadingMs - timeSinceShowLoadingStart
          _setTimeout(
            () => setLoadingStartTime(null),
            Math.max(0, additionalWaitMs)
          )
        } else {
          _clearTimeout()
        }
      }
    },
    [isLoading]
  )

  const shouldShowLoadingState = showLoadingStartTime !== null
  return shouldShowLoadingState
}
