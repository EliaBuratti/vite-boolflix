<script>
import { state } from './assets/dataJs/state.js';
import CardAlbum from './components/CardAlbum.vue';
import NavBar from './components/NavBar.vue';

export default {

  name: 'App',

  components: {
    CardAlbum,
    NavBar,
  },

  data() {
    return {
      state,
    }
  },

  methods: {
    search() {
      state.result = '';
      if (state.inputUser === '' || state.inputUser === ' ') {
        state.listMovies = [];
        state.getData();
        state.inputUser = 'I film migliori della settimana'

      } else {
        state.filterSeries();
        state.filterMovies();
      }
      console.log(state.inputUser);
      state.result = state.inputUser;

    }
  },
  created() {
    state.getData();
    state.result = 'I film migliori della settimana'
  }




}
</script>

<template>
  <div class="eb_app position-relative">

    <!-- info film -->

    <div class="eb_more_info d-none">

      <!-- modal -->

      <div class="eb_modal">
        <h3>ciaooo</h3>
      </div>
    </div>
    <div class="eb_app_container rounded-3 overflow-x-hidden overflow-y-auto ">

      <!-- header section -->
      <section class="nav_bar">
        <NavBar @search-query="search" />
      </section>

      <!-- main section -->
      <section class="list-movies mt-4 ">
        <CardAlbum />

      </section>

    </div>

    <!-- nex e prev page button -->
    <div class="function-button d-flex justify-content-center">
      <div class="prev" @click="state.prev()">
        <svg xmlns="http://www.w3.org/2000/svg" height="2em"
          viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z" />
        </svg>
      </div>

      <div class="next" @click="state.next()">
        <svg xmlns="http://www.w3.org/2000/svg" height="2em"
          viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/app.scss' as *;
@use './assets/scss/partials/variables.scss' as *;



.eb_app {
  padding: 5vh 10vw;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to top, $color-netflix 0, $color-netflix 5rem, $color-netflix-dark 40%, $color-netflix-dark 60%);
  animation: fadeInAnimation ease 1.5s;
  animation-iteration-count: 1;
  animation-fill-mode: backwards;


  .eb_app_container {
    width: 80vw;
    height: 90vh;
  }

  .eb_more_info {
    position: absolute;
    z-index: 99999999;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    color: white;
    background-color: rgba(0, 128, 0, 0.413);

    .eb_modal {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, 50%);

    }
  }

  .function-button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 999;
  }

  .next,
  .prev {
    padding: 1rem;
    cursor: pointer;
  }

}
</style>
