<template>
    <el-tag size="large" v-if="!currentProject">项目树</el-tag>
    <el-tag size="large" v-else>依赖树</el-tag>
</template>
<script lang="ts" setup>
import { ElTag } from "element-plus"
import { useProjectsStore } from "@/stores/home"

const { currentProject } = useProjectsStore()
</script>
<style lang="scss"></style>