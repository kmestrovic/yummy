import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite =  () => {
    var check = JSON.parse(localStorage.getItem("favorites"));
    setFavorite(check);
    console.log(check);     
  }

  console.log(typeof(favorite))
  
  return (
    <List>
      <div> 
        {favorite && favorite.map((favorite)=> {
          return(<Link to={"/recipe/" + favorite.id} key={favorite.id}><h4>{favorite.title}</h4>
          <img src={favorite.image}/>
         </Link>)
        })}
      </div>
    </List>
    
      
    
  )
  }

  const List= styled.div `
display:flex;
justify-content:center;
margin:2rem 0rem;
img {
  width: 20%;
  border-radius: 2rem;
  
}

`;

export default Favorites
