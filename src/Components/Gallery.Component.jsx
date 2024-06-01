import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";

const Gallery = () => {
  const {getAnimePictures , pictures} = useGlobalContext();
  const {id} = useParams()

  useEffect(()=>{
    getAnimePictures(id);
  },[])

  return (
    <GalleryStyled>
      <div className="back">
        <Link to={"/"}>Back</Link>
      </div>
      <div className="big-image">
        <img src="" alt="" />
      </div>
      <div className="small-images">
        {pictures?.map((picture,i)=>{
          return <div className="image-con" key={i}>
            <img 
            src={picture.jpg.image_url} 
            alt="Anime Character Picture" 
            />
          </div>
        })}
      </div>
    </GalleryStyled>
  )
}

const GalleryStyled = styled.div`

    background-color: #EDEDED;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .back{
        position: absolute;
        top: 2rem;
        left: 2rem;
        a{
          font-weight: 600;
          text-decoration: none;
          color: #EB5757;
        }
      }
      .big-image{
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: #fff;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
        position: relative;
        img{
          width:350px;
        }
      }

`
export default Gallery;