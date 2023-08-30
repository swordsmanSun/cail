<template>
    <div class="graph" ref="graphRef" style="min-height: 100vh"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Graph } from '@antv/x6'

const graphRef = ref<HTMLElement>()
const expose: {
    graph: Graph
} = {
    graph: null
}

onMounted(() => {
    expose.graph = new Graph({
        container: graphRef.value,
        // resizing: true,
        background: {
            color: '#f5f5f5',
        },
        grid: {
            visible: true,
        },
        panning: {
            enabled: true,
        },
        mousewheel: {
            enabled: true,
            modifiers: ['ctrl', 'meta'],
            minScale: 0.5,
            maxScale: 2,
        },
    })
})

defineExpose(expose)
</script>