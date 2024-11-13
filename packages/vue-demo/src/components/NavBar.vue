<template>
    <div class="navbar-container">
        <RouterLink v-for="pathItem in routes" :to="pathItem.path" class="navbar-item">
            <div>{{ pathItem.name }}</div>
        </RouterLink>
    </div>
</template>
<script setup lang="ts">
    import {routes} from '../router/router'

</script>
<style scoped>
    .navbar-container{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: grid;
        /* grid-template-columns: repeat(3, auto-fit); */
    }
    .navbar-item{
        height: 100px;
        line-height: 100px;
        font-size: 48px;
    }
</style>