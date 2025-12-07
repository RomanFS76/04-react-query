import axios from 'axios';
import type { Movie } from '../types/movie';

const instanceTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const { data } = await instanceTMDB.get<MoviesResponse>(`/3/search/movie?`, {
    params: {
      query,
      page,
    },
  });
  return data;
};
