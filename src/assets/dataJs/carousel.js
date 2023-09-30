import { reactive } from 'vue';

import { state } from '../dataJs/state.js'

export const carousel = reactive({
    data() {
        return {
            state,
        }
    },

    activeImage: 0,

    //divido l'array di oggetti in pagine da 12
    sliceObj() {

        const pageNum = Math.ceil(state.listMovies.length / 12);
        console.log(pageNum);

        if (pageNum > 0) {

            for (let i = 0; i < pageNum; i++) {
                state.listMovieSlice.push(
                    state.listMovies.slice((i * 12), 12 + (i * 12))
                )
            }
        } else {
            state.listMovieSlice.push(state.listMovies);
        }

        console.log(state.listMovieSlice);
    },

    //slider
    next() {
        this.activeImage++;
        if (this.activeImage > state.listMovieSlice.length - 1) {
            this.activeImage = 0;
        }
    },

    prev() {
        this.activeImage--;
        if (this.activeImage < 0) {
            this.activeImage = state.listMovieSlice.length - 1
        };
        console.log(this.activeImage);

    },

})