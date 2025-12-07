import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import { fetchMovies } from '../../services/movieService';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SearchBar from '../SearchBar/SearchBar';
import MovieModal from '../MovieModal/MovieModal';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useEffect, useState } from 'react';

export default function App() {
  const [movie, setMovies] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', movie, page],
    queryFn: () => fetchMovies(movie, page),
    enabled: movie !== '',
    placeholderData: keepPreviousData,
  });

  const results = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (data && results.length === 0) {
      toast('No movies found for your request.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#fff',
          marginTop: '100px',
          fontSize: '18px',
          padding: '16px 20px',
          color: 'black',
          fontWeight: '700',
          border: '2px solid black',
          borderRadius: '8px',
        },
      });
      return;
    }
  }, [data,results.length]);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = async (newMovie: string) => {
    setMovies(newMovie);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && results.length > 0 && (
        <MovieGrid movies={results} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
      <Toaster />
    </>
  );
}
