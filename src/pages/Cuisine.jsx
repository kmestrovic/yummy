import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import Favorites from "./Favorites";
import Favorite from "../components/Favorite";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  for (var i = 0; i < cuisine.length; i++) {
    cuisine[i].favorite = false;
  }

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  // const addToFavorite= id=> {
  //     if (!favorite.includes(id)) setFavorite(favorite.concat(id))
  // };

  const [favorite, setFavorite] = useState(cuisine.favorite);
  var btn = document.querySelector("button");

  const addToFavorite = () => {
    setFavorite((favorite) => !favorite);
    if (favorite) {
      btn.innerHTML = "not favorite";
    } else {
      btn.innerHTML = "favorite";
    }
  };

  // const removeFavorite=id=> {
  //     let index =favorite.indexOf(id);
  //     console.log(index);
  //     let temp = [...favorite.slice(0,index), ...favorite.slice(index+1)];
  //     setFavorite(temp)
  // }
  // console.log(favorite.id)

  useEffect(() => {
    getCuisine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
    {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
            <button id="mybtn" onClick={addToFavorite}>
              <AiOutlineHeart />
            </button>
            <Favorites cuisine={cuisine} favorite={favorite} />

            <Favorite cuisine={cuisine} />
          </Card>
        );
      })
    }
    </Grid>
  );

  //   let findFavorite = cuisine.filter(item=>favorite.includes(item.id));

  console.log(favorite);
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
