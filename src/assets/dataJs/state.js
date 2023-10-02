import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({

    base_url: 'https://api.themoviedb.org/3',

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


    //array attori film + serie tv
    actors: [],
    modalInfo: false,

    //lista generi delle serie tv e film
    genre_movies: [],
    genre_series: [],
    genres: [], //array con numeri dei generi del film/serie tv
    genresName: [], //array con nomi dei generi del film/serie tv


    getData() {

        Promise.all([this.getMovieTrend(), this.getSeriesTvTrend(), this.getMovieGen(), this.getSeriesTvGen()])
            .then(([movieTr, seriesTr, movieGen, seriesGen]) => {
                this.listMovies = movieTr.data;
                this.listSeries = seriesTr.data;
                this.genre_movies = movieGen.data.genres;
                this.genre_series = seriesGen.data.genres;
            })

        //svuoto i campi di ricerca e risultato della ricerca
        this.result = '';
        this.inputUser = '';

    },

    getMovieTrend() {
        return axios.get(this.base_url + '/trending/movie/week?language=en-US', {
            params: {
                api_key: this.apiKey,
            }
        });
    },

    getSeriesTvTrend() {
        return axios.get(this.base_url + '/trending/tv/week?language=en-US', {
            params: {
                api_key: this.apiKey,
            }
        });
    },

    getMovieGen() {
        return axios.get(this.base_url + '/genre/movie/list', {
            params: {
                api_key: this.apiKey,
            }
        });
    },

    getSeriesTvGen() {
        return axios.get(this.base_url + '/genre/tv/list', {
            params: {
                api_key: this.apiKey,
            }
        })
    },

    filterMovies() { //creo una richiesta con il film richiesto dall'utente

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

    filterSeries() { //creo una richiesta con le serie richieste dall'utente
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

    creditsUrl(numID) { //ottengo i crediti del film dall'id che mi viene passato
        this.modalInfo = true;// faccio apparire la modale

        const credits_movie_url = `https://api.themoviedb.org/3/movie/${numID}/credits` /* movie credits*/
        const credits_series_url = `https://api.themoviedb.org/3/tv/${numID}/credits` /* https://api.themoviedb.org/3/person/{person_id}/tv_credits  series tv credits da unire nelle funzioni */
        let genreUrl = '';

        if (this.filterPage === 1) {
            genreUrl = credits_movie_url;

        } else {
            genreUrl = credits_series_url;
        }

        axios.get(genreUrl, {
            params: {
                api_key: this.apiKey,
            }
        })

            .then(response => {

                console.log(response.data.cast.slice(0, 5));

                this.actors = response.data.cast.slice(0, 5)

            })

            .catch(error => {
                console.log(error);
            })

        this.genreFiltered();


    },

    genreFiltered() { //tramite i numeri dell'array filtro i codici per ottenere il nome del genere

        this.genresName = [];
        let typeGenre;

        //in base alla pagina visualizzata filtro per l'array corrispondente
        if (this.filterPage === 1) {
            typeGenre = this.genre_movies;

        } else {
            typeGenre = this.genre_series;
        }

        //filtro tramite un cliclo for
        for (let i = 0; i < typeGenre.length; i++) {
            typeGenre.forEach(element => {
                if (element.id === this.genres[i]) {
                    console.log(element.name);
                    this.genresName.push(element.name);
                }

            });
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