import React from 'react'
import './card.css';

const Cards=(props)=>{
    return(
        <div className="cards">
        <li>{props.children}</li> 


        </div>

    )
}

export default Cards;