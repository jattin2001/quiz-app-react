import React from "react";

export default function Start(props){
    return(
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Made using React Js</p>
            <button onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}