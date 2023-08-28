<template>
    <div class="label">
        <div class="text">{{ text }}</div>
        <slot />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    text: string
}>()
</script>
<style lang="scss" scoped>
.label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
</style> 