<script>
import { state } from '../assets/dataJs/state.js';

export default {
    name: ' NavBar',
    emits: ['searchQuery'],

    data() {
        return {
            state,
        }
    },




}
</script>
<template>
    <nav class="navbar eb_bg rounded-top-3">
        <div class="container-fluid">
            <a class="navbar-brand">BoolFlix</a>
            <section class="input d-flex ">
                <input class="form-control me-2" type="text" placeholder="Search a Film or series Tv"
                    v-model="state.inputUser" @keyup.enter="$emit('searchQuery')">
                <button class="btn btn-warning" @click="$emit('searchQuery')">cerca</button>
            </section>
        </div>
    </nav>
</template>


<style lang="scss" scoped>
.eb_bg {
    background-image: linear-gradient(to bottom, #960000 0, #960000 2rem, #2e2e2e 100%, #2e2e2e 100%);

}
</style>