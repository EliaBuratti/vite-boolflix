import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    base_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    movies_filter_url: 'https://api.themoviedb.org/3/search/movie',
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
                query: this.inputUser,

                include_adult: this.adultContent,

                //language: this.language,

                page: this.pageNum,

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