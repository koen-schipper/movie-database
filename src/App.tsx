import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import ResultList from './components/ResultList';
import SearchBar from './components/SearchBar';
import TopRatedList from './components/TopRatedList';
import { searchMovies } from './data/api';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
import EmptyList from './components/EmptyList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
    const [movies, setMovies] = useState<AxiosResponse | null>(null);
    const [favorites, setFavorites] = useLocalStorage<any[]>('favorites', []);
    const [watchList, setWatchList] = useLocalStorage<any[]>('watchlist', []);

    const handleFavoriteClick = (movie: any) => {
        let newFavoritesArray: any[];
        if (favorites.includes(movie.title)) {
            const tempArray = [...favorites];
            const index = tempArray.indexOf(movie.title);
            tempArray.splice(index, 1);
            newFavoritesArray = tempArray;
        } else {
            newFavoritesArray = [...favorites];
            newFavoritesArray.push(movie.title);
        }
        setFavorites(newFavoritesArray);
    };

    const handleWatchListClick = (movie: any) => {
        let newWatchListArray: any[];
        if (watchList.includes(movie.title)) {
            const tempArray = [...watchList];
            const index = tempArray.indexOf(movie.title);
            tempArray.splice(index, 1);
            newWatchListArray = tempArray;
        } else {
            newWatchListArray = [...watchList];
            newWatchListArray.push(movie.title);
        }
        setWatchList(newWatchListArray);
    };

    const handleWatchListNavClick = (movie: any) => {
        let newWatchListArray: any[];
        if (watchList.includes(movie)) {
            const tempArray = [...watchList];
            const index = tempArray.indexOf(movie);
            tempArray.splice(index, 1);
            newWatchListArray = tempArray;
        } else {
            newWatchListArray = [...watchList];
            newWatchListArray.push(movie);
        }
        setWatchList(newWatchListArray);
    };

    const handleSubmit = async (term: string, category: number, adult: boolean) => {
        const result = await searchMovies(term, category, adult);
        setMovies(result);
    };

    let moviesLoaded: boolean = false;
    if (movies != null) {
        moviesLoaded = true;
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Navbar
                        favorites={favorites}
                        onWatchListClick={handleWatchListNavClick}
                        watchList={watchList}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SearchBar onSubmit={handleSubmit} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {moviesLoaded ? (
                        <ResultList
                            movies={movies}
                            onFavoriteClick={handleFavoriteClick}
                            favorites={favorites}
                            onWatchListClick={handleWatchListClick}
                            watchList={watchList}
                        />
                    ) : (
                        <EmptyList />
                    )}
                </Grid>
                <Grid item xs={12} md={4}>
                    <TopRatedList
                        onFavoriteClick={handleFavoriteClick}
                        favorites={favorites}
                        onWatchListClick={handleWatchListClick}
                        watchList={watchList}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;