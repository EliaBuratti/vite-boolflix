import { reactive } from 'vue';
import axios from 'axios';

export const data = reactive({
    base_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=3117d9c7925ae74b7825993a59373499',
    apiKey: '3117d9c7925ae74b7825993a59373499',
    listMovies: [],

    //'https://api.themoviedb.org/3/search/movie?query=rit&include_adult=false&language=all&page=1'
    //search_movies_url: 'https://api.themoviedb.org/3/search/movie',


    //base_url: 'https://api.themoviedb.org/3/movie/11?api_key=3117d9c7925ae74b7825993a59373499'

    getData() {
        axios.get(this.base_url)

            .then(response => {
                console.log('risposta');
                console.log(response);
            })

            .catch(error => {
                console.log(error);
            })
    }
})