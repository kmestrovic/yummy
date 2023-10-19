
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function UploadPhoto() {
  const [file, setFile] = useState([]);
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState([]);

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile([...file, selectedFile]);
    } else {
      console.log("No file selected");
    }
  }

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  const handleDisplayImage = () => {
    if (file.length > 0) {
      const fileURLs = file.map((file) => URL.createObjectURL(file));
      const newUserData = {
        images: fileURLs,
        comment: comment,
      };

      setUserData([...userData, newUserData]);
      setFile([]);
      setComment("");
    }
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(storedUserData);
  }, []);

  useEffect(() => {
    
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div>
      <h2>How did it turn out for others?</h2>
      <Splide>
      {userData.map((user, index) => (
        <SplideSlide key={index} className="user-card">
          <Card>
          {user.images.map((image, imgIndex) => (
            <img key={imgIndex} src={image} alt={`Uploaded ${imgIndex}`} />
          ))}
          <p>{user.comment}</p>
          </Card>
          
        </SplideSlide>
      ))}
      </Splide>

      <h2>Want to show to the others your dish?</h2>
      <input type="file" onChange={handleChange} />
      <input
        type="text"
        placeholder="Type your recipe"
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleDisplayImage}>Submit</button>
      
    </div>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 0rem;

  .user-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 0.5rem;
  }

  input {
    height: 100px;
  }
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  margin: auto;
  margin-top:1rem;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 25%;
    width: 50%;
    height: 75%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    bottom: 0%;
    transform: translate (5%, 0%);
    color: #313131;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default UploadPhoto;