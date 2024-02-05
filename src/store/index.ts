import { createStore, useStore } from "vuex"
import { type UserState, users } from "./modules/users"

export interface RootState {
  users: UserState
}

export const store = createStore<RootState>({
  modules: { users },
  strict: import.meta.env.MODE !== "production",
})

export function useTypedStore() {
  return useStore<RootState>()
}
