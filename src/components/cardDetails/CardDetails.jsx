import { useRef, useState } from "react"
import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"
import { compileString } from "sass"


export const CardDetails = () => {

    const inputRefs = { name : useRef(), card : useRef() }
    const [ nameState, changeName ] = useState("")
    const [ ccNumberState, changeCcNumber ] = useState("")
    const [ cvcState, changeCvc ] = useState("")

    const checkIfNumeric = ( input ) => {
        if( !( input.keyCode >= 48 && input.keyCode <= 57 ) && input.key !== 'Backspace' && input.key !== 'ArrowLeft'  && input.key !== 'ArrowRight' ){
            return false;
        }else{
            return true;
        }
    }

    const inputCheckStrgin = ( input ) => {
        if( !( input.keyCode >= 65 && input.keyCode <= 90 ) && input.key !== ' ' && input.key !== 'Backspace'  && input.key !== 'ArrowLeft'  && input.key !== 'ArrowRight' ){
            input.preventDefault()
        }
    }

    const inputCheckCard = ( input ) => {
        if( !checkIfNumeric( input ) ){
            input.preventDefault()
        }else{
            if( !( inputRefs.card.current.value.length < 19 ) ){ return }

            let ccNumber = ""
            const ccNumberFromInput = inputRefs.card.current.value.replace( /\s/g, '' )
    
            for (let letter = 0; letter < ccNumberFromInput.length; letter++) {
                
                ccNumber += ccNumberFromInput[ letter ]
                if( (letter + 1) % 4 === 0 && letter !== 0 ){
                    
                    if( input.key === 'Backspace' ){
                        if( letter !== ccNumberFromInput.length - 1  ){
                            ccNumber += " "
                        }
                    }else{
                        ccNumber += " "
                    }
                
                }
    
            }
    
            if( input.key === 'Backspace' && ccNumber.charAt( ccNumber.length - 2 ) === ' ' ){
                ccNumber = ccNumber.slice( 0, -1 )
            }
    

            inputRefs.card.current.value = ccNumber 
        }
    }

    const inputCheckCvc = ( input ) => {
        if( !checkIfNumeric( input ) ){
            input.preventDefault()
        }
    }

    const inputCheckMonth = ( input ) => {

    }



    return (
        <div id="cardDetailsContent">

            <div id="cardDetailsCards">
                <CardFront data={{ name : nameState, ccNumber : ccNumberState }}/>
                <CardBack data={{ cvc : cvcState }} />
            </div>

            <div id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput" placeholder="e.g. Jane Appleseed" ref={inputRefs.name} onChange={() => ( changeName( inputRefs.name.current.value ) )} pattern="[A-Za-z]*" onKeyDown={(event) => {inputCheckStrgin(event)}} type="text" id="name" /> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle">Card Number</span>
                    <input className="detailsInput" placeholder="e.g. 1234 5678 9123 0000" ref={inputRefs.card} onChange={() => ( changeCcNumber( inputRefs.card.current.value ) )} onKeyDown={(event) => {inputCheckCard(event)}} maxLength="19" type="text" id="cardNumber" />
                </div>
                
                <div className="inputHolder" data-direction="row">
                    <div>
                        <span className="fieldTitle">Exp. Date (MM/YY)</span>
                        <div className="cardDate">
                            <input className="detailsInput" placeholder="MM" max="2" type="text" maxLength="2" id="Month" />
                            <input className="detailsInput" placeholder="YY" type="text" maxLength="2" id="Year" />
                        </div>
                    </div>
                    <div>
                        <span className="fieldTitle">CVC</span>
                        <input className="detailsInput" placeholder="e.g. 123" type="text" onKeyDown={(event) => {inputCheckCvc(event)}} onChange={(event) => changeCvc(event.currentTarget.value)} maxLength="4" id="CVC" />
                    </div>

                </div>

                <button className="cardDetailsSubmit">Confirm</button>

            </div>

        </div>
    )
}