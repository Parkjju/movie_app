const API_KEY = '35962825f155cdfe3696115110be486a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrending = () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(
        (response) => response.json()
    );

export const getUpcoming = () =>
    fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((response) => response.json());

export const getNowPlaying = () =>
    fetch(
        `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((response) => response.json());

export const moviesAPI = { getTrending, getUpcoming, getNowPlaying };
