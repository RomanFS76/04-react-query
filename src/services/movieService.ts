import axios from 'axios';
import type { Movie } from '../types/movie';


const instanceTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await instanceTMDB.get<{ results: Movie[] }>(`/3/search/movie?query=${query}`);
  return response.data.results;
};


