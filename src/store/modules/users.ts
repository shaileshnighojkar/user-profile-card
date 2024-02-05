import type { Module } from "vuex"
import type { RootState } from "../index"
import * as api from "@/api"

export interface UserState {
  profile: UserProfile | null
  posts: UserPost[]
}

export const users: Module<UserState, RootState> = {
  namespaced: true,
  state: {
    profile: null,
    posts: [],
  },
  mutations: {
    setProfile: (state, profile: UserProfile) => (state.profile = profile),
    setPosts: (state, posts: UserPost[]) => (state.posts = posts),
  },
  actions: {
    async fetchUserPosts({ commit }, userProfile: UserProfile) {
      commit("setProfile", userProfile)
      const [posts, postsError] = await api.getUserPosts(userProfile.id)

      if (postsError) console.log(postsError)
      else commit("setPosts", posts)
    },
  },
}
