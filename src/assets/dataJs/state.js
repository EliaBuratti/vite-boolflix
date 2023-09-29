import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    base_url: 'https://api.themoviedb.org/3/trending/movie/week?language=en-US',
    movies_filter_url: 'https://api.themoviedb.org/3/search/movie',
    tv_filter_url: 'https://api.themoviedb.org/3/search/tv',
    apiKey: '3117d9c7925ae74b7825993a59373499',

    path_image: 'https://image.tmdb.org/t/p/w342',
    listMovies: [],
    inputUser: '',
    result: '',
    adultContent: false,
    language: 'en-US',
    pageNum: 1,

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
                console.log(response.data.results);

                response.data.results.forEach(element => {

                    this.listMovies.push(this.genListObj('tv', element))
                })
                console.log(this.listMovies);
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
                }

                break;

            default:
                break;
        }
    }
})