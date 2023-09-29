<script>
import { state } from '../assets/dataJs/state';
import Card from './Card.vue';

export default {
    name: 'CardAlbum',

    components: {
        Card,
    },

    data() {
        return {
            state,
        }
    },


}
</script>
<template>
    <div class="eb_album">
        <h2 v-if="state.listMovies.length > 0 && state.result.length > 0">Ecco i risultati per: {{ state.result }}</h2>
        <div class="list_film d-flex flex-wrap">

            <h2 v-if="state.listMovies.length === 0">Nessun risultato per la ricerca.</h2>

            <!-- film e serie tv trovate -->
            <Card v-else v-for="film in state.listMovies" :film="film" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

h2 {
    color: $color-netflix-white;
}
</style>