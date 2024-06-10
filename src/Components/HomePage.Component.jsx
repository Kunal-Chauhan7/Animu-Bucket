import { useState } from "react"
import Popular from "./Popular.Component";
import { useGlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import Upcoming from "./UpComing.Component";
import Airing from "./Airing.Component";

const HomePage = () => {

    const {handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getAiringAnime,
        getUpcomingAnime,
    } = useGlobalContext();

    const [rendered,setRendered] = useState('Popular');

    const switchComponent = ()=>{
        switch (rendered) {
            case 'Popular':
                return<Popular rendered={rendered}/>
            case 'upcoming':
                return<Upcoming rendered={rendered}/>
            case 'airing':
                return<Airing rendered={rendered}/>
            default:
                return<Popular rendered={rendered}/>
        }
    }

    return (
        <HomePageStyle>
            <header>
                <div className="logo">
                    <h1 className="header">
                        {rendered==='Popular'?'Popular Anime':rendered==='airing'?'Airing Anime':'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={()=>{
                            setRendered('Popular')
                        }}>
                            Popular
                            <i className="fas fa-fire"/>
                        </button>
                    </div>
                    <form action="" className="search-form">
                        <div className="input-control">
                            <input type="text" placeholder="Search Anime..."value={search}onChange={handleChange} />
                            <button type="submit" onClick={handleSubmit}> Search </button>
                        </div>
                    </form>
                    <div className="filter-btn airing-filter">
                        <button onClick={()=>{
                            setRendered('airing')
                            getAiringAnime()
                        }}>
                            Airing
                        </button>
                    </div>
                    <div className="filter-btn upcoming-filter">
                        <button onClick={()=>{
                            setRendered('upcoming')
                            getUpcomingAnime()
                        }}>
                            Upcoming
                        </button>
                    </div>
                </div>
            </header>
            {switchComponent()}
        </HomePageStyle>
    )
}


const HomePageStyle = styled.div`
    .header {
	font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
	font-size:4rem;
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

    background-color: #EDEDED;
    header{
        padding: 2rem 5rem;
        width: 60%;
        margin: 0 auto;
        transition: all .4s ease-in-out;
        @media screen and (max-width:1530px){
            width:95%;
        }
        .logo{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 2rem;
        }
        .search-container{
            display:flex;
            align-items:center;
            justify-content:center;
            gap:1rem;
            button {
    display: flex;
    align-items: center;
    gap: .5rem;
    padding: .7rem 1.5rem;
    outline: none;
    border-radius: 30px;
    font-size: 1.2rem;
    background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%);
    cursor: pointer;
    transition: all .4s ease-in-out;
    font-family: inherit;
    border: 5px solid #e5e7eb;
}

button:hover {
    background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
    border: 5px solid #4caf50;
}
            form{
                position: relative;
                width: 100%;
                .input-control{
                    position: relative;
                    transition:all .4s ease-in-out; 
                }
                .input-control input{
                    width: 100%;
                    padding: .7rem 1rem;
                    border: none;
                    outline: none;
                    border-radius: 30px;
                    font-size:1.2rem;
                    background-color:#fff;
                    border:5px solid #e5e7eb;
                    transition:all .4s ease-in-out; 
                }
                .input-control button{
                    position:absolute;
                    right:0;
                    top:50%;
                    transform:translateY(-50%);
                }
            }
        }
    }
`


export default HomePage