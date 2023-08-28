<template>
    <div v-if="currentProject" class="depthSelect">
        <Label text="最大深度">
            <el-select v-model="currentProject.depth" style="width: 60px;">
                <el-option v-for="option in options" v-bind="option" />
            </el-select>
        </Label>
    </div>
</template>
<script lang="ts" setup>
import { ElSelect, ElOption, ElFormItem } from "element-plus"
import { computed } from "vue";
import { useProjectsStore } from "@/stores/home"
import Label from "./Label.vue";

const { currentProject } = useProjectsStore()

console.log(currentProject);

const options = new Array(currentProject.depth).fill(0).map((_, index) => ({ label: index + 1, value: index + 1 }))
</script>