import React from "react";

export default function Question(props){

    function optionBg(option, index){
        if (props.showAnswer) {
            if(option === props.correct_answer){
                return ({backgroundColor: "#94D7A2"})
            }
            else if(props.mcq.selected_answer === index){
                return ({backgroundColor: "#F8BCBC"})
            }
            else{
                return ({backgroundColor: "#F5F7FB"})
            }
        }
        else{
            return (props.mcq.selected_answer === index ? {backgroundColor: "#D6DBF5"}:{backgroundColor: "#F5F7FB"})
        }
    }

    const options = props.options.map((option, index)=>{
        return (<button 
                key={index} 
                style={optionBg(option, index)}
                className="option" 
                onClick={(event)=>props.selectedOption(event, props.id, index)}
                dangerouslySetInnerHTML={{__html: option}}
           ></button>)
    })
    return (
        <main className="quiz">
            <p dangerouslySetInnerHTML={{__html: props.question}}></p>
            <div className="options">{options}</div>
        </main>
    )
}