import React, { useEffect, useState } from 'react'

function Favorites() {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    getFavorite();
  }, []);

  const getFavorite =  async () => {
    var check = localStorage.getItem("favorites");
    // window.addEventListener("storage",getFavorite)

    // if (check) {
    //   setFavorite(JSON.parse(check));
    // } 
      // const data = await api.JSON;

      // localStorage.setItem("favorites", JSON.stringify(data.recipes));
      setFavorite(check);
      console.log(check);
      console.log(favorite)
    }
  
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
    <div>{favorite}</div>
  )
  }

export default Favorites
