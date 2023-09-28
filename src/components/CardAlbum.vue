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
    <Card v-for="film in state.listMovies" :film="film" />
</template>


<style lang="scss" scoped></style>