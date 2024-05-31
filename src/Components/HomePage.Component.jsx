import { useState } from "react"
import Popular from "./Popular.Component";

const HomePage = () => {

    const [rendered,setRendered] = useState('Popular');

    const switchComponent = ()=>{
        switch (rendered) {
            case Popular:
                return<Popular rendered={rendered}/>

            default:
                return<Popular rendered={rendered}/>
        }
    }

    return (
        <div>
            <header>
                <div className="logo">
                    <h1>
                        {rendered==='Popular'?'Popular Anime':rendered==='airing'?'Airing Anime':'Upcoming Anime'}
                    </h1>
                </div>
                <div className="search-container">
                    <div className="filter-btn popular-filter">
                        <button onClick={()=>{
                            setRendered('Popular')
                        }}>
                            Popular
                        </button>
                    </div>
                    <form action="" className="search-form">
                        <div className="input-control"></div>
                    </form>
                </div>
            </header>
        </div>
    )
}
export default HomePage