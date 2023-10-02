<script>
import { state } from '../assets/dataJs/state';

export default {
    name: 'Modal',

    data() {
        return {
            state,
        }
    },


}
</script>

<template>
    <div v-if="state.modalInfo" class="eb_more_info">

        <!-- modal -->

        <div class="eb_modal">
            <div class="card p-4 d-flex">

                <section class="actors">
                    <h3>Attori</h3>
                    <ul class="list-unstyled">
                        <li v-for=" actor in state.actors"> {{ actor.original_name }}</li>
                    </ul>
                </section>


                <section class="genres">
                    <h3>Generi:</h3>
                    <ul class="list-unstyled">
                        <li v-for="nameGenre in state.genresName">{{ nameGenre }}</li>
                    </ul>
                </section>


                <button class="btn bg-danger mt-4" @click="state.modalInfo = false">Close</button>

            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use '../assets/scss/partials/variables.scss' as *;

.eb_more_info {
    position: absolute;
    z-index: 99999999;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    color: white;
    background-color: rgba(128, 128, 128, 0.516);

    .eb_modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);


    }

    button {
        color: $color-netflix-white;
    }
}
</style>