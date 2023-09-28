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
    <h2 v-if="state.listMovies.length === 0">Nessun risultato per la ricerca.</h2>
    <Card v-else v-for="film in state.listMovies" :film="film" />
</template>


<style lang="scss" scoped></style>