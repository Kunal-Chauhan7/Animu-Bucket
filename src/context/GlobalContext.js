import { type } from "@testing-library/user-event/dist/type";
import React , {createContext, useContext, useReducer , useState} from "react";

const GlobalContext = createContext();

const base_url = "https://api.jikan.moe/v4"

const LOADING = "LOADING";
const SEARCH = "SEARCH"
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_PICTURES = "GET_PICTURES";

const reducer = (state,action)=>{
    switch(action.type){
        case LOADING:
            return{...state,loading:true}
        case GET_POPULAR_ANIME:
            return{...state,popularAnime:action.payload,loading:false}
        case SEARCH:
            return{...state,searchResults:action.payload,loading:false}
        case GET_UPCOMING_ANIME:
            return {...state,upcomingAnime:action.payload,loading:false}
        case GET_AIRING_ANIME:
            return{...state,airingAnime:action.payload,loading:false}
        case GET_PICTURES:
            return{...state,pictures:action.payload,loading:false}
        default:
            return state
    }
}


// inintal state


export const GlobalContextProvider = ({children})=>{
    const initalState = {
        popularAnime:[],
        upcomingAnime:[],
        airingAnime:[],
        pictures:[],
        isSearch:false,
        searchResults:[],
        loading:false,
    }
    const [state,disptach] = useReducer(reducer,initalState);
    const [search,setSearch] = useState('');

    const handleChange = (e)=>{
        setSearch(e.target.value);
        if(e.target.value===''){
            state.isSearch = false;
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(search){
            searchAnime(search);
            state.isSearch=true;
        }
        else{
            state.isSearch=false;
            alert('please Enter Valid search...')
        }
    }

    const getPopularAnime = async()=>{
        disptach({type:LOADING})
        const response = await fetch(`${base_url}/top/anime?filter=bypopularity`);
        const data = await response.json();
        disptach({type:GET_POPULAR_ANIME,payload:data.data})
    }

    const getUpcomingAnime = async ()=>{
        disptach({type:LOADING})
        const responce = await fetch(`${base_url}/top/anime?filter=upcoming`);
        const data = await responce.json();
        disptach({type:GET_UPCOMING_ANIME,payload:data.data})
    }

    const getAiringAnime = async ()=>{
        disptach({type:LOADING})
        const responce = await fetch(`${base_url}/top/anime?filter=airing`);
        const data = await responce.json();
        disptach({type:GET_AIRING_ANIME,payload:data.data})
    }

    const getAnimePictures = async(id)=>{
        disptach({type:LOADING})
        const responce = await fetch(`${base_url}/characters/${id}/pictures`);
        const data = await responce.json();
        disptach({type:GET_PICTURES,payload:data.data})
    }


    const searchAnime = async(anime)=>{
        disptach({type:LOADING})
        const responce = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await responce.json();
        disptach({type:SEARCH,payload:data.data})
    }

    React.useEffect(()=>{
        getPopularAnime();

    },[])


    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getAiringAnime,
            getUpcomingAnime,
            getAnimePictures,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext);
}