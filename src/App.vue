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
      if (state.inputUser === '' || state.inputUser === ' ') {
        state.listMovies = [];
        state.getData();

      } else {
        state.filterTvMovies();
      }
      console.log(state.inputUser);
      state.inputUser = '';
    }
  },
  created() {
    state.getData();
  }




}
</script>

<template>
  <div class="eb_app">
    <div class="eb_app_container rounded-3 overflowx-hidden overflow-y-auto">

      <section class="nav_bar">
        <NavBar @search-query="search" />
      </section>


      <section class="list-movies mt-4 ">
        <CardAlbum />

      </section>
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

  /*   .list-movies {
    overflow-y: scroll;
    overflow-x: hidden;
  } */
}
</style>
