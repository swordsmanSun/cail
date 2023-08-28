<template>
    <Graph ref="graphRef" />
</template>
<script lang="ts" setup>
import Graph from "@/components/ui/graph/Graph.vue"
import { onMounted, ref } from "vue";
import { DFS } from "@tracer/utils";
import { useProjectsStore } from "@/stores/home";

const graphRef = ref<InstanceType<typeof Graph>>(null)
const { projects } = useProjectsStore()

onMounted(() => {
    const { graph } = graphRef.value
    // 实现项目
    DFS(projects, (node, context) => {
        console.log(node, context);
    })

    const rect = graph.addNode({
        shape: 'rect',
        x: 300,
        y: 300,
        width: 90,
        height: 60,
        attrs: {
            body: {
                fill: '#ff9c6e',
                stroke: '#ff7a45',
            },
            label: {
                text: 'A',
            },
        },
    })
    console.log(graphRef.value.graph);
})
</script>