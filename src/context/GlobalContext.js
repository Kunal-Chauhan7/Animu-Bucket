import React , {createContext, useContext, useReducer} from "react";

const GlobalContext = createContext();

const base_url = "https://api.jikan.moe/v4"

const reducer = (state,action)=>{
    return state;
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
    return (
        <GlobalContext.Provider value={{
            ...state,           
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext);
}