<script>
import { state } from '../assets/dataJs/state';

export default {
    name: 'FunctionButton',

    data() {
        return {
            state,
        }
    },


}
</script>

<template>
    <div v-if="state.result !== ''" class="function-button d-flex justify-content-center align-items-center">
        <div class="prev" @click="state.prev()">
            <svg xmlns="http://www.w3.org/2000/svg" height="2em"
                viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
            </svg>
        </div>

        <div class="info_pages">
            <h3 v-if="state.filterPage === 1">Pagina: {{ state.pageNumMovies }} di {{ state.listMovies.total_pages }}</h3>
            <h3 v-else>Pagina: {{ state.pageNumSeries }} di {{ state.listSeries.total_pages }}</h3>
        </div>

        <div class="next" @click="state.next()">
            <svg xmlns="http://www.w3.org/2000/svg" height="2em"
                viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                    d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
            </svg>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

.function-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;

    .info_pages {
        color: $color-netflix-white;
    }

    .next,
    .prev {
        padding: 1rem;
        cursor: pointer;
        transition: 0.3s;
    }

    .next:hover,
    .prev:hover {
        fill: $color-netflix-white;
        transform: scale(1.3);
    }

}
</style>