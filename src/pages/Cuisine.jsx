import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Favorites from "./Favorites";

function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites]= useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setRecipes(recipes.results);
  };


  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  const toggleFavorite = (id) => {
    
    setRecipes(recipes.map(recipe => {
      if(recipe.id === id) {
        return {
          ...recipe,
          isFavorite: !recipe.isFavorite
        }
      }

      return recipe
    }))
    setFavorites(recipes.map(recipe => {
      let array= favorites;
      if(recipe.isFavorite) {
          array.push(recipe)
        }
        else {
          array=array.filter(array=>recipe.title)
        }
      }

      
    ))

    setFavorites([...favorites])
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    // var storage = localStorage.getItem('favItem' + (array)|| '0')
    // if (storage==null) {
    //   localStorage.setItem(('favItem'+(recipe.id)), JSON.stringify(recipe))
    // }
    // else {
    //   localStorage.removeItem('favItem' + (recipe.id))
    // }
    console.log(favorites)
    

  }


  return (
    
    <Grid
    
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <List>
      <div> List of favorites: 
        {favorites.map((favorites)=> {
          return(<Link to={"/recipe/" + favorites.id}><h4>{favorites.title}</h4>
          <img src={favorites.image}/>
         </Link>)
        })}
      </div>
      </List>
    {recipes.map((recipe) => {
        return (
             <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt="" />
              <h4>{recipe.title}</h4>
            </Link>
            <button onClick={() => toggleFavorite(recipe.id)}>
              {recipe.isFavorite ? <AiOutlineHeart /> : <AiFillHeart />}
            </button>
            
            
          </Card>
          
        );
      })
    }
    </Grid>
  );
}

const favorites=<Favorites favorites/>

const List= styled.div `
display:flex;
justify-content:center;
margin:2rem 0rem;
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

export default Cuisine;