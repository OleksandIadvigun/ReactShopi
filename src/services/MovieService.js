import {AXIOS} from "./Axios.config";

class MoviesService {

    async getMovies(){
        const {data} = await AXIOS.get('/discover/movie');
        return  data;
    }
    async getMovieByID(movieId){
        const {data} = await AXIOS.get(`/movie/${movieId}`)
        return data;
    }
}

export const movieService = new MoviesService();

export const getSomeData = () => {
    return movieService.getMovieByID(76340)
}