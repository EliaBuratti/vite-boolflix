import { reactive } from 'vue';
import { carousel } from './carousel';
import axios from 'axios';

export const state = reactive({

    data() {
        return {
            carousel,
        }
    },
    base_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    movies_filter_url: 'https://api.themoviedb.org/3/search/movie',
    tv_filter_url: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '3117d9c7925ae74b7825993a59373499',

    path_image: 'https://image.tmdb.org/t/p/w342',

    listMovies: [],
    inputUser: '', //testo che digita l'utente
    result: '', //testo che digita l'utente senza aggiornarsi di continuo

    //parametri de la ricerca del film o serie tv
    adultContent: false,
    language: 'en-US',
    pageNum: 1,

    //array diviso in pagine 12 risultati per pagina
    listMovieSlice: [],



    /* -----------------------------------------  da implementare */
    //array attori film + serie tv
    actorMovie: [],
    actotSeriesTv: [],
    genreSelection: '',
    /* ------------------------------------------------------------------ */


    getData() { //trending movies
        axios.get(this.base_url, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {
                console.log(response.data.results);

                response.data.results.forEach(element => {

                    this.listMovies.push((this.genListObj('movie', element)))
                });

                carousel.sliceObj();
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

                response.data.results.forEach(element => {

                    this.listMovies.push(this.genListObj('movie', element))
                });

            })

            .catch(error => {
                console.log(error);
            })
        console.log(this.listMovies);
    },

    filterTvMovies() {

        this.listMovies = [];
        this.listMovieSlice = [];

        this.filterMovies()

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
                //console.log(response.data.results);

                response.data.results.forEach(element => {

                    console.log(element);
                    this.listMovies.push(this.genListObj('tv', element))
                })
                console.log(this.listMovies);

                carousel.sliceObj();

            })

            .catch(error => {
                console.log(error);
            })

    },

    creditsUrl(numID) {

        const credits_url = `https://api.themoviedb.org/3/movie/${numID}/credits` /* movie credits*/
        /* https://api.themoviedb.org/3/person/{person_id}/tv_credits  series tv credits da unire nelle funzioni */
        axios.get(credits_url, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {

                console.log(response.data.cast.slice(0, 5));

                /*                 response.data.results.forEach(element => {
                
                                    this.listMovies.push(this.genListObj('movie', element))
                                }); */

            })

            .catch(error => {
                console.log(error);
            })

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

    genListObj(typeGender, element) {
        switch (typeGender) {
            case 'tv':
                return {
                    image: this.checkPath(element.poster_path),
                    title: element.name,
                    originalTitle: element.original_name,
                    language: element.original_language,
                    vote: this.ratingStar(element.vote_average),
                    overview: element.overview,
                    id: element.id,
                }

                break;

            case 'movie':
                return {
                    image: this.checkPath(element.poster_path),
                    title: element.title,
                    originalTitle: element.original_title,
                    language: element.original_language,
                    vote: this.ratingStar(element.vote_average),
                    overview: element.overview,
                    id: element.id,
                }

                break;

            default:
                break;
        }
    },



})