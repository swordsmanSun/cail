<template>
    <div class="header">
        <TypeInfoVue />
        <DepthSelect />
    </div>
</template>

<script setup lang="ts">
import DepthSelect from '@/components/base/DepthSelect.vue';
import TypeInfoVue from '@/components/base/TypeInfo.vue';

</script>
<style scoped lang="scss">
.header {
    position: fixed;
    top: 10px;
    left: 50px;
    right: 50px;
    backdrop-filter: blur(10px);
    background-color: rgba($color: #fff, $alpha: 0.52);
    padding: 10px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    z-index: 2;
    display: flex;
    gap: 10px;
}
</style>