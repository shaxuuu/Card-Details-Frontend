import { useRef, useState } from "react"
import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"


export const CardDetails = () => {

    const inputRefs = { name : useRef(""), card : useRef() }
    const [ nameState, changeName ] = useState("")


    const inputCheckStrgin = ( input ) => {
        if( !( input.keyCode >= 65 && input.keyCode <= 90 ) && input.key !== ' ' && input.key !== 'Backspace'  && input.key !== 'ArrowLeft'  && input.key !== 'ArrowRight' ){
            input.preventDefault()
        }
    }

    const inputCheckCard = ( input ) => {
        if( !( input.keyCode >= 48 && input.keyCode <= 57 ) && input.key !== 'Backspace' && input.key !== 'ArrowLeft'  && input.key !== 'ArrowRight' ){
            input.preventDefault()
        }else{
            
            if( inputRefs.card.current.value.length % 4 === 0 ){
                console.log("add")
                inputRefs.card.current.value.replace("  ")
            }

        }

        
    }

    return (
        <div id="cardDetailsContent">

            <div id="cardDetailsCards">
                <CardFront data={{ name : nameState }}/>
                <CardBack />
            </div>

            <div id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput" placeholder="e.g. Jane Appleseed" ref={inputRefs.name} onChange={() => ( changeName( inputRefs.name.current.value ) )} pattern="[A-Za-z]*" onKeyDown={(event) => {inputCheckStrgin(event)}} type="text" id="name" /> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle">Card Number</span>
                    <input className="detailsInput" placeholder="e.g. 1234 5678 9123 0000" ref={inputRefs.card} onKeyDown={(event) => {inputCheckCard(event)}} type="text" id="cardNumber" />
                </div>
                
                <div className="inputHolder" data-direction="row">
                    <div>
                        <span className="fieldTitle">Exp. Date (MM/YY)</span>
                        <div className="cardDate">
                            <input className="detailsInput" placeholder="MM" max="2" type="text" id="Month" />
                            <input className="detailsInput" placeholder="YY" type="text" id="Year" />
                        </div>
                    </div>

                    <div>
                        <span className="fieldTitle">CVC</span>
                        <input className="detailsInput" placeholder="e.g. 123" type="text" id="CVC" />
                    </div>

                </div>

                <button className="cardDetailsSubmit">Confirm</button>

            </div>

        </div>
    )
}