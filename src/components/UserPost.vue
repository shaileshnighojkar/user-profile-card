<script setup lang="ts">
const props = defineProps<{
  title: string
  body: string
}>()
</script>

<template>
  <div>
    <slot name="title" :title="props.title">
      <div class="font-semibold italic">{{ props.title }}</div>
    </slot>
    <slot name="body" :body="props.body">
      <div class="text-gray-600">{{ props.body }}</div>
    </slot>
  </div>
</template>

<style lang="scss"></style>
