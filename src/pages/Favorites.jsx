import React from "react";

const Favorites = (props) => {
  const { cuisine } = props;
  const { favorite } = props;
  console.log(cuisine.length);
  var listOfFavorites = [];
  for (var i = 0; i < cuisine.length; i++) {
    if (!cuisine[i].favorite) {
      listOfFavorites.push(cuisine[i].title);
    }
  }

  console.log(listOfFavorites);
  console.log(cuisine[0].favorite);
  console.log(cuisine[1].favorite);
  console.log(cuisine[2].favorite);
  console.log(cuisine[3].favorite);
  console.log(cuisine[4].favorite);
  console.log(cuisine[5].favorite);
  console.log(cuisine[6].favorite);
};

export default Favorites;
