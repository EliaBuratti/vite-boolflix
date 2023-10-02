<script>
import { state } from '../assets/dataJs/state';
import Card from './Card.vue'; // se lo slider funge da togliere

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

        <div class="info d-flex align-items-center">

            <h2 v-if="state.listMovies != [] && state.result.length > 0">Ecco i risultati per: {{
                state.result }}</h2>

            <span class="ms-auto d-flex">
                <h2 class="ms-2 p-3 rounded-3" :class="state.filterPage === 2 ? 'active' : ''"
                    @click="state.filterPage = 2">Series Tv</h2>
                <h2 class=" ms-2 p-3 rounded-3" :class="state.filterPage === 1 ? 'active' : ''"
                    @click="state.filterPage = 1">Movies</h2>
            </span>



        </div>
        <div class="list_film d-flex flex-wrap ">

            <h2 v-if="state.listMovies.length === 0">Nessun risultato per la ricerca.</h2>

            <div class="w-100">

                <!-- movies -->

                <div v-if="state.filterPage === 1" class="item d-flex flex-wrap">
                    <Card v-for="movie in state.listMovies.results" :image="state.checkPath(movie.poster_path)"
                        :title="movie.title" :originalTitle="movie.original_title" :language="movie.original_language"
                        :vote="state.ratingStar(movie.vote_average)" :overview="movie.overview" :id="movie.id" />
                </div>

                <!-- series tv -->

                <div v-else class="item d-flex flex-wrap">
                    <Card v-for="tvShow in state.listSeries.results" :image="state.checkPath(tvShow.poster_path)"
                        :title="tvShow.name" :originalTitle="tvShow.original_name" :language="tvShow.original_language"
                        :vote="state.ratingStar(tvShow.vote_average)" :overview="tvShow.overview" :id="tvShow.id" />
                </div>





            </div>



        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

h2 {
    color: $color-netflix-white;
    padding-left: 0.5rem;
}

span {
    h2 {
        cursor: pointer;
    }

    .active {
        background-color: $color-netflix-lg-dark;
    }
}
</style>