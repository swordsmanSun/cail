<template>
    <Graph ref="graphRef" />
</template>
<script lang="ts" setup>
import Graph from "@/components/ui/graph/Graph.vue"
import { onMounted, ref } from "vue";
import { DFS } from "@tracer/utils";
import { useProjectsStore } from "@/stores/home";
import { TreeTraverseContext } from "@tracer/utils/types/tree";
import { Node } from "@antv/x6"

const graphRef = ref<InstanceType<typeof Graph>>(null)
const { projects } = useProjectsStore()

const gap = 80
const rectWith = 150
const rectHeight = 90
let startX = 100
const startY = 100

onMounted(() => {
    const { graph } = graphRef.value

    DFS({ children: projects }, (_, context: { rectChildren: Node<Node.Properties>[] } & TreeTraverseContext<any>) => {
        const { parent, depth } = context

        if (!context.rectChildren) {
            context.rectChildren = []
        }

        return (node2, context: { rectChildren: { depth: number, rect: Node<Node.Properties>, parent: any }[] } & TreeTraverseContext<any>) => {
            const { rectChildren } = context
            let childIndex = rectChildren.reduce((prev, curr) => curr.depth === depth ? prev + 1 : prev, 0)
            let x: number

            const nextDepthRectChildren = rectChildren.filter(item => item.parent === node2)
            if (nextDepthRectChildren.length) {
                // the x of the non-leaf nodes
                x = nextDepthRectChildren[0].rect.position().x + (nextDepthRectChildren[nextDepthRectChildren.length - 1].rect.position().x - nextDepthRectChildren[0].rect.position().x) / 2
            } else {
                // the x of the leaf nodes
                x = startX + (gap + rectWith) * childIndex
            }
            // ignore top empty root node
            if (depth > 1) {
                const rect = graph.addNode({
                    shape: 'rect',
                    x,
                    y: startY + (gap + rectHeight) * (depth - 2),
                    width: rectWith,
                    height: rectHeight,
                    attrs: {
                        body: {
                            fill: '#ecf5ff',
                            stroke: '#56a9ff',
                        },
                        label: {
                            text: node2.name,
                        },
                    },
                })
                nextDepthRectChildren.forEach(child => {
                    graph.addEdge({
                        source: rect,
                        target: child.rect
                    })
                })
                context.rectChildren.push({ depth, parent, rect })
            }
        }
    })
})
</script>