// Hook de persistance localStorage, tolérant aux erreurs (mode privé, quota, JSON invalide).
import { useCallback, useEffect, useState } from 'react'

type Updater<T> = T | ((prev: T) => T)

export function useLocalStorage<T>(key: string, initial: T): [T, (v: Updater<T>) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  const set = useCallback(
    (v: Updater<T>) => {
      setValue((prev) => {
        const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v
        try {
          localStorage.setItem(key, JSON.stringify(next))
        } catch {
          /* quota dépassé ou stockage indisponible : on garde l'état en mémoire */
        }
        return next
      })
    },
    [key],
  )

  // Synchronise entre onglets ouverts.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setValue(JSON.parse(e.newValue) as T)
        } catch {
          /* ignore */
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])

  return [value, set]
}
