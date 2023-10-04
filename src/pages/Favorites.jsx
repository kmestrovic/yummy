import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite =  async () => {
    var check = JSON.parse(localStorage.getItem("favorites"));
    
    // window.addEventListener("storage",getFavorite)

    // if (check) {
    //   setFavorite(JSON.parse(check));
    // } 
      // const data = await api.JSON;

      // localStorage.setItem("favorites", JSON.stringify(data.recipes));
      setFavorite(check);
      console.log(check);     
      
    }
    console.log(typeof(favorite))
  
    // const list= favorite.map((favorite)=> <li>{favorite}</li>)
  
  // var data=[];
  // data=JSON.parse(localStorage.getItem("favorites"))
  
  // var tempArray= new Array();
  // for (var i=0; i<data.length; i++) {
  //   tempArray.push(data[i]);
  // }
  // console.log(tempArray)

  return (
    // <div>
    //   {favorite.map((favorite)=> {
    //   return(<h4>{favorite}</h4>)
      
    // })}
    // </div>
    <List>
      <div> 
        {favorite.map((favorite)=> {
          return(<Link to={"/recipe/" + favorite.id}><h4>{favorite.title}</h4>
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
