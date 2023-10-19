import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Favorites from "./Favorites";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    // setRecipes(recipes.results)

    const favoritesFromLocalStorage = JSON.parse(
      localStorage.getItem("favorites")
    );
    setFavorites([...favoritesFromLocalStorage]);
    setRecipes(
      recipes.results.map((recipe) => ({
        ...recipe,
        isFavorite: favoritesFromLocalStorage.some(
          (favorite) => favorite.id === recipe.id
        ),
      }))
    );
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  useEffect(() => {
    if (recipes) {
      let newFavorites = [
        ...favorites.filter(
          (favorite) => !recipes.some((recipe) => recipe.id === favorite.id)
        ),
        ...recipes.filter((recipe) => recipe.isFavorite),
      ];

      const uniqueArray = [];
      const seenIds = new Set();

      for (const obj of newFavorites) {
        if (!seenIds.has(obj.id)) {
          uniqueArray.push(obj);
          seenIds.add(obj.id);
        }
      }

      setFavorites(uniqueArray);
    }
  }, [recipes]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setRecipes(
      recipes?.map((recipe) => {
        if (recipe.id === id) {
          return {
            ...recipe,
            isFavorite: !recipe.isFavorite,
          };
        }

        return recipe;
      })
    );
  };

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {recipes?.map((recipe) => {
        return (
          <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt="" />
              <h4>{recipe.title}</h4>
            </Link>
            <button onClick={() => toggleFavorite(recipe.id)}>
              {recipe.isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </Card>
        );
      })}

      <h4>This is list of favorites: </h4>
      <Splide>
        {favorites?.map((favorite) => (
          <SplideSlide key={favorite.id}>
            <CardFavorite>
              <Link to={"/recipe/" + favorite.id}>
                <h4>{favorite.title}</h4>
                <img src={favorite.image} alt={favorite.title} />
              </Link>
            </CardFavorite>
          </SplideSlide>
        ))}
      </Splide>
    </Grid>
  );
}

const favorites = <Favorites favorites />;

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  img {
    width: 20%;
    border-radius: 2rem;
  }
`;

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

const CardFavorite = styled.div`
  img {
    width: 30%;
    margin-left: 35%;
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
