<script setup lang="ts">
import { ref, computed } from "vue"
import { useTypedStore } from "@/store"

const store = useTypedStore()
const profile = computed(() => store.state.users.profile)
const loading = ref(false)

const emit = defineEmits<{
  togglePosts: []
}>()
</script>

<template>
  <v-card :loading="loading" :max-width="280">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate />
    </template>

    <v-img cover :src="profile?.profilePicture"></v-img>

    <v-card-item>
      <v-card-title>{{ profile?.name }}</v-card-title>
      <v-card-subtitle>{{ profile?.email }}</v-card-subtitle>
    </v-card-item>

    <v-card-actions>
      <v-btn color="primary" variant="text" @click="emit('togglePosts')"> Toggle Posts </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss"></style>
