import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => Promise<void>;
}

const showMoviesToast = () => {
  toast('Please enter your search query.', {
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
};

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSearch = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (query === '') {
      showMoviesToast();
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSearch}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
      <Toaster />
    </header>
  );
};

export default SearchBar;
