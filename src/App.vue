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
      state.filterTvMovies();
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
      <input style="width: 40%;" type="text" placeholder="Type a Film or series tv name" v-model="state.inputUser"
        @keyup.enter="search()">
      <button @click="search()">cerca</button>
    </section>

    <section class="list-movies">
      <div class="film-card" v-for="film in state.listMovies">
        <ul>
          <li>titolo: {{ film.title }}</li>
          <li>titolo originale: {{ film.originalTitle }}</li>
          <li>lingua: {{ film.language }}</li>
          <li>bandiera: <img v-if="state.getFlag(film.language)" :src="state.getFlag(film.language)">
            <img v-else src="./assets/img/Missing_flag.png" alt="no flag">
          </li>
          <li>voto: {{ film.vote }}</li>
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
