<script>
import { state } from '../src/assets/dataJs/state.js'

export default {

  name: 'App',

  data() {
    return {
      state,
    }
  },

  created() {
    state.getData();
  }


}

</script>

<template>
  <div class="h-100 w-100">ciaooo</div>
</template>

<style lang="scss" scoped>
@use './assets/scss/app.scss' as *;
@use './assets/scss/partials/variables.scss' as *;

div {
  background-color: $bg-page;
}
</style>
