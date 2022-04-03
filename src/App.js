import React, { useEffect, useState } from "react";
import './App.css';
// import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";


const OMDB_API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=9ddc7de4';

const App = () => {

    // state hook for movies
    const [movies, setMovies] = useState();

    const [searchTerm, setSearchTerm] = useState('batman');


    // async is a function that required time to fetch the movies.
    const searchMovies = async (title) => {
        // request for data from the api.
        const response = await fetch(`${OMDB_API_URL}&t=${title}`);
        const data = await response.json();
        setMovies(data);
    }

    useEffect(() => {
        // [] at second arg -> only call when output
        searchMovies('Batman');
    }, []);

    return (
        <div className="app">
            <h1>MoveLand</h1>
            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <div>
                    <i 
                        className="fas fa-search" 
                        onClick={()=>searchMovies(searchTerm)}
                    />
                </div>
            </div>
            {movies?.Response === 'True'
            ? (
                <div className="container">
                    <MovieCard movie={movies}/>
                </div>
            ): 
            (
                <div className="empty">
                    <h2>No movies found.</h2>
                </div>
            )}
        </div>
    )
};

export default App;