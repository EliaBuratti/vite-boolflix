<script>
import { carousel } from '../assets/dataJs/carousel';
import { state } from '../assets/dataJs/state';
import Card from './Card.vue';

export default {
    name: 'CarouselSlider',

    components: {
        Card,
    },
    data() {
        return {
            carousel,
            state,
        }
    },


}
</script>
<template>
    <!-- manca tutto il file html da rifare!!! -->
    <Card v-for="film in state.listMovies" :film="film" />
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/carousel.scss';
</style>