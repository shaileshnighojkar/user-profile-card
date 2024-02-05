<script setup lang="ts">
import { ref, computed, watch } from "vue"
import type { Ref } from "vue"
import { debounce } from "lodash"
import { useTypedStore } from "@/store"
import * as api from "@/api"

const store = useTypedStore()
const query = ref("")
const loading = ref(false)
const profiles: Ref<UserProfile[]> = ref([])

const message = computed(() => {
  if (loading.value) return "Searching..."
  else if (!query.value)
    return "Start typing a username in the input box to display search results here."
  else if (profiles.value.length == 0) return "No results found!"
  return ""
})

const selectProfile = (profile: UserProfile) => {
  store.dispatch("users/fetchUserPosts", profile)
  query.value = ""
}

watch(query, (q) => (loading.value = !!q.length))

const onQueryChange = debounce(async () => {
  profiles.value = []
  if (!query.value) return

  await new Promise((resolve) => setTimeout(resolve, 300))
  const [searchedProfiles] = await api.searchUser(query.value)
  if (searchedProfiles) {
    if (searchedProfiles.length) profiles.value = searchedProfiles
  }
  loading.value = false
}, 300)
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-text-field
        v-model="query"
        placeholder="Search users eg. Patricia"
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        variant="solo"
        class="max-w-[420px]"
        v-bind="props"
        rounded
        hide-details
        @update:model-value="onQueryChange"
      >
        <template #append-inner>
          <v-progress-circular
            v-if="loading"
            indeterminate
            :size="24"
            width="2"
          ></v-progress-circular>
        </template>
      </v-text-field>
    </template>

    <v-sheet class="w-[92%] mx-auto" elevation="4">
      <div v-if="message" class="max-w-[40ch] p-3 text-gray-600 text-center text-sm mx-auto">
        {{ message }}
      </div>

      <v-list v-else>
        <v-list-item v-for="profile in profiles" :key="profile.id" @click="selectProfile(profile)">
          <v-list-item-title>{{ profile.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-menu>
</template>

<style lang="scss"></style>
