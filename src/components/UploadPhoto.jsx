import React, { useState } from "react";
import styled from "styled-components";

function UploadPhoto() {
  const [file, setFile] = useState();
  const [comment, setComment] = useState([]);
  const [print, setPrint]=useState(false);

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  
  
  function getRecipe (e){
   
    setComment(e.target.value)
    setPrint(false)
    
  }

  const handleSubmit=(event)=> {
    event.prevent.Default();
  }
  

  // setFiles(file.map(file => {
  //     let array= file;
  //     array.push(recipe)
  //       }))
  // setFiles([...file])
  return (
    <List>
      <form onSubmit={handleSubmit}>
        <h2>How did it turn out for me?</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
        <input
          type="text"
          placeholder="Type your recipe"
          onChange={getRecipe}
        />
        {print? <h1>
          {comment}
        </h1>:null}
        <button type="submit" onClick={()=>setPrint(true)} >
          Submit
        </button>
      </form>
      
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  img {
    width: 100px;
    height: 100px;
    border-radius: 0.5rem;
  }
  input {
    height: 100px;
  }
`;

export default UploadPhoto;
