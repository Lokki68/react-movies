import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '../components/card/Card';
import Header from '../components/Header/Header';
import './userList.css';

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(',')
      : [];

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=30e44b3457325abb3b042c426c176238&language=fr-FR`,
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className='user-list-page'>
      <Header />
      <h2>
        Coup de coeur <span>💝</span>
      </h2>
      <div className='result'>
        {listData.length > 0 ? (
          listData.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
