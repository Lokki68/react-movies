import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import './Form.css';

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState('code');
  const [sortGoodBad, setSortGoodBad] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=30e44b3457325abb3b042c426c176238&query=${search}&language=fr-FR`,
      )
      .then((res) => {
        setMoviesData(res.data.results);
      });
  }, [search]);

  return (
    <div className='form-component'>
      <div className='form-container'>
        <form>
          <input
            type='text'
            id='search-input'
            placeholder="Entrez le titre d'un film"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type='submit' value='Rechercher' />
        </form>

        <div className='btn-sort-container'>
          <div
            className='btn-sort'
            id='goodToBad'
            onClick={() => setSortGoodBad('goodToBad')}
          >
            Top<span>&#10140;</span>
          </div>
          <div
            className='btn-sort'
            id='badToGood'
            onClick={() => setSortGoodBad('badToGood')}
          >
            Flop<span>&#10140;</span>
          </div>
        </div>
      </div>
      <div className='result'>
        {moviesData
          .slice(0, 12)
          .sort((a, b) => {
            if (sortGoodBad === 'goodToBad') {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === 'badToGood') {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
