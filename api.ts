const API_KEY = '35962825f155cdfe3696115110be486a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const moviesAPI = {
    getTrending: () =>
        fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(
            (response) => response.json()
        ),
    getUpcoming: ({ pageParam }) =>
        fetch(
            `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
        ).then((res) => res.json()),
    getNowPlaying: () =>
        fetch(
            `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
        ).then((response) => response.json()),
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
        ).then((response) => response.json());
    },
    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        return fetch(
            `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
        ).then((response) => response.json());
    },
};

export const tvApi = {
    getTrending: () =>
        fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then(
            (response) => response.json()
        ),
    getAiringToday: () =>
        fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then(
            (response) => response.json()
        ),
    getTopRated: () =>
        fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((response) =>
            response.json()
        ),
    search: ({ queryKey }) => {
        const [_, query] = queryKey;
        return fetch(
            `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
        ).then((response) => response.json());
    },
    detail: ({ queryKey }) => {
        const [_, id] = queryKey;
        return fetch(
            `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
        ).then((response) => response.json());
    },
};
