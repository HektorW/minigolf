import { useEffect } from 'react'

export default function useOnUnmount(onUnmount) {
  useEffect(() => onUnmount, [])
}
