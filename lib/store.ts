import create from 'zustand'
import { persist } from 'zustand/middleware'

type UIState = {
  hasSeenOnboarding: boolean
  setSeenOnboarding: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      setSeenOnboarding: () => set({ hasSeenOnboarding: true })
    }),
    { name: 'bw-ui' }
  )
)
