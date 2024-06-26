import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import '../Css/Tv.css';
const AnimeItem = () => {
    const { id } = useParams();


    const [anime, setAnime] = useState({});
    const [characters, setCharacters] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const getAnime = async (anime) => {
        const responce = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await responce.json();
        setAnime(data.data);
        console.log(data.data)
    }

    const getCharacters = async (anime) => {
        const responce = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await responce.json();
        setCharacters(data.data);
    }

    const { title, synopsis, trailer, duration, aired,
        season, images, rank, score, scored_by,
        popularity, status, rating, source } = anime;


    useEffect(() => {
        getAnime(id);
        getCharacters(id);
    }, [])

    return (
        <AnimeItemStyled>
            <h1 className="header">{title}</h1>
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
                    {showMore ? synopsis : synopsis?.substring(0, 450) + "..."}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show less' : 'Read more'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div class="trailer-container">
                {trailer?.embed_url ?
                    <div class="container">
                        <div class="monitor">
                            <div class="monitor-screen">
                                <iframe src={trailer?.embed_url} title={title} width="800" height="450" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div> : <div>
                        <h3>Trailer not available :(
                        </h3>
                    </div>}
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters.map((character, index) => {
                    const { role } = character;
                    const { images, name, mal_id } = character.character;
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt="" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
        </AnimeItemStyled>
    )
}

const AnimeItemStyled = styled.div`
    .image{
    padding:20px;
    }
    .header {
	font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
	font-size: 6rem;
	font-weight:  100;
	letter-spacing: 2px;
	text-align: center;
	color: #f35626;
	background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-webkit-animation: hue 10s infinite linear;
}

@-webkit-keyframes hue {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
}
    padding:3rem 7rem;
    background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);
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
    .trailer-con{
        display:flex;
        justify-content:center;
        align-items:center;
        iframe{
            outline:none;
            border:10px solid #e5e7eb;
            padding:1.5rem;
            border-radius:2rem;
            background-color:#FFFFFF;

        }
    }
    .characters{
        display:grid;
        grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
        grid-gap:2rem;
        background-color:#fff;
        padding:2rem;
        border-radius:20px;
        border:5px solid #e5e7eb;
        .character{
            padding:.4rem   .6rem;
            border-radius:7px;
            background-color:#EDEDED;
            transition: all .4s ease-in-out;
            img{
                width:100%;
            }
            h4{
                padding:.5rem 0;
                color:#454e56;
            }
            p{
                color:#27AE60;
            }
            &:hover{
                transform:translateY(-7px);
            }
        }
    }

`;

export default AnimeItem;
