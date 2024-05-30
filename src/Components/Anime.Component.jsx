import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const AnimeItem = () => {
    const {id} = useParams();
    
    
    const [anime,setAnime] = useState({});
    const[characters , setCharacters] = useState([]);
    const [showMore , setShowMore] = useState(false);

    const getAnime = async(anime)=>{
        const responce = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await responce.json();
        setAnime(data.data);
        console.log(data.data)
    }

    const getCharacters = async (anime)=>{
        const responce = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await responce.json();
        setCharacters(data.data);
    }
    
    const{title , synopsis , trailer , duration , aired , 
        season , images , rank , score , scored_by , 
        popularity , status , rating , source} = anime;


    useEffect(()=>{
        getAnime(id);
        getCharacters(id);
    },[])

  return (
    <AnimeItemStyled>
        <h1>{title}</h1>
        <div className="details">
            <div className="detail">
                <div className="image">
                    <img src={images?.jpg.large_image_url} alt="Poster" />
                </div>
                <div className="anime-details">
                    <p><span>Aired:</span><span>{aired?.string}</span></p>
                    <p><span>Rating:</span><span>{rating}</span></p>
                    <p><span>Rank:</span><span>{rank}</span></p>
                    <p><span>Score:</span><span>{score}</span></p>
                    <p><span>Scored By:</span><span>{scored_by}</span></p>
                    <p><span>Popularity:</span><span>{popularity}</span></p>
                    <p><span>Status:</span><span>{status}</span></p>
                    <p><span>Source:</span><span>{source}</span></p>
                    <p><span>Season:</span><span>{season}</span></p>
                    <p><span>Duration:</span><span>{duration}</span></p>

                </div>
            </div>
            <p className="description">
                {showMore?synopsis:synopsis?.substring(0,450)+"..."}
                <button onClick={()=>{
                    setShowMore(!showMore)
                }}>{showMore?'Show less':'Read more'}</button>
            </p>
        </div>
        <h3 className="title">Trailer</h3>
        <div className="trailer-con">
            {trailer?.embed_url&&
            <iframe 
                src={trailer?.embed_url} 
                title={title}
                width="800"
                height="450"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>    
            </iframe>
            }
        </div>
    </AnimeItemStyled>
  )
}

const AnimeItemStyled = styled.div`

    padding:3rem 18rem;
    background-color: #EDEDED;
    h1{
        display: inline-block;
        font-size: 3rem;
        margin-bottom:1.5rem;
        cursor:pointer;
        background:linear-gradient(to right,#A855F7,#27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover{
            transform:skew(-3deg)
        }
    }
    .title{
        display:inline-block;
        margin:3rem 0;
        font-size:2rem;
        cursor:pointer;
        background:linear-gradient(to right,#A855F7,23%,#27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .description{
        margin-top:2rem;
        color:#6c7983;
        line-height:1.7rem;
        button{
            background-color:transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 0.9rem;
            color: #27AE60;
            font-weight: 600;
        }
    }
    .details{
        background-color:#fff;
        border-radius:20px;
        padding:2rem;
        border:5px solid #e5e7eb;

        .detail{
            display:grid;
            grid-template-columns:repeat(2,1fr);
            img{
                border-radius:7px;
            }
        }
    }
    .anime-details{
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        p{
            display:flex;
            gap:1rem;
        }
        p span:first-child{
            font-weight:600;
            color:#6c7983;
        }
    }
`;

export default AnimeItem;