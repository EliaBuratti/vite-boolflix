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
        <div class="list_film d-flex flex-wrap">
            <h2 v-if="state.listMovies.length === 0">Nessun risultato per la ricerca.</h2>
            <Card v-else v-for="film in state.listMovies" :film="film" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;
</style>