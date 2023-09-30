<script>
import { state } from '../assets/dataJs/state';
import { carousel } from '../assets/dataJs/carousel';
import Card from './Card.vue'; // se lo slider funge da togliere
import CarouselSlider from './CarouselSlider.vue';

export default {
    name: 'CardAlbum',

    components: {
        Card,
        CarouselSlider,
    },

    data() {
        return {
            state,
            carousel,
        }
    },


}
</script>
<template>
    <div class="eb_album">

        <div class="info d-flex justify-content-between">
            <h2 v-if="state.listMovies.length > 0 && state.result.length > 0">Ecco i risultati per: {{ state.result }}</h2>
            <h2>Pagina: {{ carousel.activeImage + 1 }} di {{ state.listMovieSlice.length }}</h2>
        </div>
        <div class="list_film d-flex flex-wrap ">

            <h2 v-if="state.listMovies.length === 0">Nessun risultato per la ricerca.</h2>

            <CarouselSlider />


        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

h2 {
    color: $color-netflix-white;
    padding-left: 0.5rem;
}
</style>