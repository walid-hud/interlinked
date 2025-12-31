type Listener<T> = (state: T) => void

function create_store<T>(initialState: T) {
  let state = initialState
  const listeners = new Set<Listener<T>>()

  return {
    getState(): T {
      return state
    },

    setState(update: Partial<T> | ((prev: T) => T)) {
      state =
        typeof update === "function"
          ? update(state)
          : { ...state, ...update }

      listeners.forEach((listener) => listener(state))
    },

    subscribe(listener: Listener<T>) {
      listeners.add(listener)
      listener(state)
      return () => listeners.delete(listener)
    }
  }
}

export {create_store}
