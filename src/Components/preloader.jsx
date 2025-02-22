import React from 'react'
import '../App.css';

import Loading from '../assets/preloader.gif'

const PreLoader = () =>{
    return(
        <div className="loader-container">

            <img src={Loading} alt="Loading gif" className="imgLoading" />
        </div>
    )
}

export default PreLoader