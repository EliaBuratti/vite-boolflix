<script>
import { state } from './assets/dataJs/state.js';

export default {

  name: 'App',

  data() {
    return {
      state,
    }
  },

  methods: {
    search() {
      console.log(state.inputUser);
      state.filterTv()
    }
  },

  created() {
    state.getData();
  }


}
</script>

<template>
  <div class="container">
    <section class="input">
      <input type="text" placeholder="Type a film name" v-model="state.inputUser" @keyup.enter="search()">
      <button @click="search()">cerca</button>
    </section>

    <section class="list-movies">
      <div class="film-card" v-for="film in state.listMovies">
        <ul>
          <li>titolo: {{ film.title }}</li>
          <li>titolo originale {{ film.original_title }}</li>
          <li>lingua: {{ film.original_language }}</li>
          <li>bandiera: <img v-if="state.getFlag(film.original_language)" :src="state.getFlag(film.original_language)">
            <img v-else src="./assets/img/Missing_flag.png" alt="no flag">
          </li>
          <li>voto: {{ film.vote_average }}</li>
        </ul>

      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/app.scss' as *;
@use './assets/scss/partials/variables.scss' as *;

div {
  background-color: $bg-page;
}
</style>
