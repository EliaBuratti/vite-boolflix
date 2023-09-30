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

    <div class="container ">
        <div class="slider-wrapper" tabindex="0" @mouseover="stopPlay" @mouseleave="slidePlay">


            <div class="item d-flex flex-wrap">
                <Card v-for="film in state.listMovieSlice[carousel.activeImage]" :film="film" />
            </div>




        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/carousel.scss';
</style>