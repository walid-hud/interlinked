type KeyListener<T, K extends keyof T> = (value: T[K]) => void

function create_store<T extends Record<string, any>>(initialState: T) {
  const listeners = new Map<keyof T, Set<(value: any) => void>>()

  const notify = <K extends keyof T>(key: K, value: T[K]) => {
    listeners.get(key)?.forEach(listener => listener(value))
  }

  const proxy = new Proxy(initialState, {
    set(target, prop: string | symbol, value, receiver) {
      // Ignore symbols (like Symbol.toStringTag, etc.)
      if (typeof prop === "symbol") {
        return Reflect.set(target, prop, value, receiver)
      }

      // Only react to known keys
      if (!(prop in target)) {
        return Reflect.set(target, prop, value, receiver)
      }

      const key = prop as keyof T
      const prev = target[key]

      if (Object.is(prev, value)) return true

      target[key] = value
      notify(key, value)

      return true
    }
  })
  

  function subscribe<K extends keyof T>(
    key: K,
    listener: KeyListener<T, K>
  ) {
    let set = listeners.get(key)
    if (!set) {
      set = new Set()
      listeners.set(key, set)
    }

    set.add(listener as any)
    listener(proxy[key])

    return () => set!.delete(listener as any)
  }

  return Object.assign(proxy, { subscribe })
}
export {create_store}