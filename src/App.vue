<script setup lang="ts">
import { onMounted, ref } from "vue"
import UserSearch from "@/components/UserSearch.vue"
import UserProfileCard from "@/components/UserProfileCard.vue"
import UserPost from "@/components/UserPost.vue"
import { useTypedStore } from "@/store"
import * as api from "@/api"

const store = useTypedStore()
const message = ref("")
const showPosts = ref(true)

onMounted(async () => {
  const [profile, error] = await api.getUserProfile(7)
  if (error) message.value = error
  else {
    store.dispatch("users/fetchUserPosts", profile)
  }
})
</script>

<template>
  <v-app>
    <main class="container max-w-[980px] mx-auto h-full p-4">
      <div class="flex justify-center">
        <UserSearch />
      </div>
      <div class="mt-6">
        <div class="text-center">{{ message }}</div>
        <div
          v-if="store.state.users.profile?.id"
          class="flex flex-col items-start md:flex-row gap-6"
        >
          <UserProfileCard class="mx-auto flex-shrink-0" @toggle-posts="showPosts = !showPosts" />
          <div class="flex-grow flex flex-col gap-6">
            <template v-if="showPosts">
              <div class="text-2xl"># Posts</div>
              <UserPost
                v-for="(post, index) in store.state.users.posts"
                :key="post.id"
                v-bind="post"
              >
                <template v-if="index == 1" #title="{ title }">
                  <div class="font-semibold italic text-red-700">{{ title }}</div>
                </template>
                <template v-if="index == 2" #body="{ body }">
                  <div class="text-indigo-600 text-xl">{{ body }}</div>
                </template>
              </UserPost>
            </template>
          </div>
        </div>
      </div>
    </main>
  </v-app>
</template>

<style></style>
