import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    base_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    movies_filter_url: 'https://api.themoviedb.org/3/search/movie',
    tv_filter_url: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '3117d9c7925ae74b7825993a59373499',
    listMovies: [],
    inputUser: '',
    adultContent: false,
    language: 'en-US',
    pageNum: 1,

    //'https://api.themoviedb.org/3/search/movie?query=rit&include_adult=false&language=all&page=1'
    //search_movies_url: 'https://api.themoviedb.org/3/search/movie',


    //base_url: 'https://api.themoviedb.org/3/movie/11?api_key=3117d9c7925ae74b7825993a59373499'

    getData() {
        axios.get(this.base_url, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {
                console.log(response.data.results);

                this.listMovies = response.data.results

            })

            .catch(error => {
                console.log(error);
            })
    },

    filterMovies() {
        axios.get(this.movies_filter_url, {
            params: {
                api_key: this.apiKey,

                query: this.inputUser,

                include_adult: this.adultContent,

                //language: this.language,

                page: this.pageNum,

            }
        })

            .then(response => {
                console.log(response.data.results);

                this.listMovies = response.data.results

            })

            .catch(error => {
                console.log(error);
            })
    },

    filterTv() {
        /* this.filterMovies() se metto questa funzione 
        e aggiungo tramite +=    this.listMovies += response.data.results  ottengo la lista di film e sere tv*/
        axios.get(this.tv_filter_url, {
            params: {
                api_key: this.apiKey,

                query: this.inputUser,

                include_adult: this.adultContent,

                //language: this.language,

                page: this.pageNum,

            }
        })

            .then(response => {
                console.log(response.data.results);
                this.listMovies = [];

                this.listMovies = response.data.results

            })

            .catch(error => {
                console.log(error);
            })
        console.log(this.listMovies);

    },
    getFlag(lang) {
        let flagLink;
        switch (lang) {
            case 'cn':
                flagLink = false;
                break;

            case 'mr':
                flagLink = false;
                break;

            case 'xx':
                flagLink = false;
                break;

            case 'tl':
                flagLink = false;
                break;

            default:
                flagLink = `https://www.unknown.nu/flags/images/${lang}-100`;

        }

        return flagLink;
    }
})