import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";
import Favorites from "./Favorites";


function Pages() {
  const location=useLocation();
  return (
  <AnimatePresence mode='wait'>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />}/>
        <Route path="/recipe/:favorites" element={<Favorites />}/>
      </Routes>
  </AnimatePresence>
      
    
  );
}

export default Pages;
