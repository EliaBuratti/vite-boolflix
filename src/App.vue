<script>
import { state } from './assets/dataJs/state.js';
import CardAlbum from './components/CardAlbum.vue';

export default {

  name: 'App',

  components: {
    CardAlbum,
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
  <div class="container">


    <section class="input">
      <input style="width: 40%;" type="text" placeholder="Type a Film or series tv name" v-model="state.inputUser"
        @keyup.enter="search()">
      <button @click="search()">cerca</button>
    </section>

    <section class="list-movies d-flex flex-wrap">
      <CardAlbum />

    </section>
  </div>
</template>

<style lang="scss" scoped>
@use './assets/scss/app.scss' as *;
@use './assets/scss/partials/variables.scss' as *;

.card {
  padding: 1rem;
  background-color: $bg-page;
}
</style>
