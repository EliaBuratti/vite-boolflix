import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({


    trending_movie_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    trending_seriesTv_url: 'https://api.themoviedb.org/3/trending/tv/week?language=en-US',
    movies_filter_url: 'https://api.themoviedb.org/3/search/movie',
    tv_filter_url: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '3117d9c7925ae74b7825993a59373499',

    path_image: 'https://image.tmdb.org/t/p/w342',

    listMovies: [],
    listSeries: [],
    inputUser: '', //testo che digita l'utente
    result: '', //testo che digita l'utente senza aggiornarsi di continuo
    filterPage: 1,

    //parametri de la ricerca del film o serie tv
    adultContent: false,
    language: 'en-US',
    pageNumMovies: 1,
    pageNumSeries: 1,

    /* -----------------------------------------  da implementare */
    //array attori film + serie tv
    actorMovie: [],
    actorSeriesTv: [],
    modalInfo: false,
    /* ------------------------------------------------------------------ */


    getData() { //trending movies 
        axios.get(this.trending_movie_url, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {

                this.listMovies = response.data;


            })

            .catch(error => {
                console.log(error);
            })

        // trending series

        axios.get(this.trending_seriesTv_url, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {

                this.listSeries = response.data;


            })

            .catch(error => {
                console.log(error);
            })

        this.result = '';
        this.inputUser = '';

    },

    filterMovies() {
        axios.get(this.movies_filter_url, {
            params: {
                api_key: this.apiKey,

                query: this.inputUser,

                include_adult: this.adultContent,

                //language: this.language,

                page: this.pageNumMovies,

            }
        })

            .then(response => {
                this.listMovies = [],

                    console.log('movies');
                console.log(response.data);

                this.listMovies = response.data;

            })

            .catch(error => {
                console.log(error);
            })
    },

    filterSeries() {
        axios.get(this.tv_filter_url, {
            params: {
                api_key: this.apiKey,

                query: this.inputUser,

                include_adult: this.adultContent,

                //language: this.language,

                page: this.pageNumSeries,

            }
        })

            .then(response => {

                this.listSeries = [];

                console.log(' series tv');
                console.log(response.data);

                this.listSeries = response.data;


            })

            .catch(error => {
                console.log(error);
            })
    },

    creditsUrl(numID) {

        const credits_movie_url = `https://api.themoviedb.org/3/movie/${numID}/credits` /* movie credits*/
        const credits_series_url = `https://api.themoviedb.org/3/tv/${numID}/credits` /* https://api.themoviedb.org/3/person/{person_id}/tv_credits  series tv credits da unire nelle funzioni */

        if (this.filterPage === 1) {
            axios.get(credits_movie_url, {
                params: {
                    api_key: this.apiKey,
                }
            })

                .then(response => {

                    console.log(response.data.cast.slice(0, 5));

                    this.actorMovie = response.data.cast.slice(0, 5)

                })

                .catch(error => {
                    console.log(error);
                })

        } else {

            axios.get(credits_series_url, {
                params: {
                    api_key: this.apiKey,
                }
            })
                .then(response => {

                    console.log(response.data.cast.slice(0, 5));

                    this.actorSeriesTv = response.data.cast.slice(0, 5);

                })

                .catch(error => {
                    console.log(error);
                })
        }


    },

    ratingStar(vote) {

        return Number(Math.ceil(vote / 2));

    },

    checkPath(path) {

        if (path) {
            return this.path_image + path
        } else {
            return path
        }

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

            case 'sh':
                flagLink = false;
                break;

            case 'ml':
                flagLink = false;
                break;

            default:
                flagLink = `https://www.unknown.nu/flags/images/${lang}-100`;

        }

        return flagLink;
    },

    next() {
        console.log('next');

        switch (this.filterPage) {
            case 1:

                console.log(this.listMovies);
                this.pageNumMovies++;
                if (this.pageNumMovies > this.listMovies.total_pages) {
                    this.pageNumMovies = 1;
                }
                this.filterMovies();
                break;

            case 2:
                this.pageNumSeries++;
                if (this.pageNumSeries > this.listSeries.total_pages) {
                    this.pageNumSeries = 1;
                }
                this.filterSeries();
                break;
        }

    },

    prev() {

        console.log('prev');

        switch (this.filterPage) {
            case 1:
                this.pageNumMovies--;
                if (this.pageNumMovies < 1) {
                    this.pageNumMovies = this.listMovies.total_pages;
                };
                this.filterMovies();

                break;

            case 2:

                this.pageNumSeries--;
                if (this.pageNumSeries < 1) {
                    this.pageNumSeries = this.listSeries.total_pages;
                };
                this.filterSeries();

                break;

        }

    },






})