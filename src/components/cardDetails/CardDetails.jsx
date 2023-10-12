import { useEffect, useRef, useState } from "react"
import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"
import { compileString } from "sass"


export const CardDetails = () => {

    const inputRefs = { name : useRef(), card : useRef(), month : useRef(), year : useRef(), cvc : useRef() }
    const [ nameState, changeName ] = useState("")
    const [ ccNumberState, changeCcNumber ] = useState("")
    const [ cvcState, changeCvc ] = useState("")
    const [ monthState, changeMonth ] = useState(undefined)
    const [ yearState, changeYear ] = useState(undefined)

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
        if( !checkIfNumeric( input ) ){
            input.preventDefault()
        }else if( input.key !== 'Backspace'){

            if( Number( input.key ) >= 2 && inputRefs.month.current.value.length <= 1 && inputRefs.month.current.value.charAt(0) !== '1' ){
                inputRefs.month.current.value = '0' + input.key
                changeMonth( '0' + input.key )
                inputRefs.year.current.focus()
                input.preventDefault()

            }else if( inputRefs.month.current.value.charAt(0) === '1' ) {
                if( Number(input.key) > 2 ){
                    inputRefs.month.current.value = '01'
                    changeMonth( '01' )
                }else{
                    inputRefs.month.current.value = '1' + input.key
                    changeMonth( '1' + input.key )
                }
                inputRefs.year.current.focus()
                input.preventDefault()

            }else if( inputRefs.month.current.value.length === 2 ){
                inputRefs.year.current.focus()
                input.preventDefault()
            }

        }

    }

    const inputMonthLostFocus = () => {
        if( inputRefs.month.current.value === '1' ){
            inputRefs.month.current.value = '01'
            changeMonth('01')
        }
    }

    const inputCheckYear = ( input ) => {
        if( !checkIfNumeric( input ) ){
            input.preventDefault()
        }else{

        }

    }

    const validateForm = () => {
        if( inputRefs.name.current.value.length === 0 ){
            inputRefs.name.current.classList.add('invalidInput')
        }else{
            inputRefs.name.current.classList.remove('invalidInput')
        }
        if( inputRefs.card.current.value.length !== 19 ){
            inputRefs.card.current.classList.add('invalidInput')
        }else{
            inputRefs.card.current.classList.remove('invalidInput')
        }
        if( inputRefs.month.current.value.length !== 2 ){
            inputRefs.month.current.classList.add('invalidInput')
        }else{
            inputRefs.month.current.classList.remove('invalidInput')
        }
        if( inputRefs.year.current.value.length !== 2 ){
            inputRefs.year.current.classList.add('invalidInput')
        }else{
            inputRefs.year.current.classList.remove('invalidInput')
        }
        if( inputRefs.cvc.current.value.length < 3 ){
            inputRefs.cvc.current.classList.add('invalidInput')
        }else{
            inputRefs.cvc.current.classList.remove('invalidInput')
        }
    }

    useEffect( () => {
        for( const input in inputRefs ){
            inputRefs[input].current.addEventListener("invalid", (event) => {
                event.preventDefault()
            })
        }

    })

    return (
        <div id="cardDetailsContent">

            <div id="cardDetailsCards">
                <CardFront data={{ name : nameState, ccNumber : ccNumberState, month : monthState, year : yearState }}/>
                <CardBack data={{ cvc : cvcState }} />
            </div>

            <form id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput" placeholder="e.g. Jane Appleseed" ref={inputRefs.name} onChange={() => ( changeName( inputRefs.name.current.value ) )} onKeyDown={(event) => {inputCheckStrgin(event)}} type="text" id="name" required/> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle">Card Number</span>
                    <input className="detailsInput" placeholder="e.g. 1234 5678 9123 0000" ref={inputRefs.card} onChange={() => ( changeCcNumber( inputRefs.card.current.value ) )} onKeyDown={(event) => {inputCheckCard(event)}} maxLength="19" type="text" id="cardNumber" required/>
                </div>
                
                <div className="inputHolder" data-direction="row">
                    <div>
                        <span className="fieldTitle">Exp. Date (MM/YY)</span>
                        <div className="cardDate">
                            <input className="detailsInput" placeholder="MM" ref={inputRefs.month} type="text" maxLength="2" onBlur={inputMonthLostFocus} onKeyDown={inputCheckMonth} id="Month" required/>
                            <input className="detailsInput" placeholder="YY" ref={inputRefs.year} type="text" maxLength="2" onChange={() => ( changeYear( inputRefs.year.current.value ) )} onKeyDown={inputCheckYear} id="Year" required/>
                        </div>
                    </div>
                    <div>
                        <span className="fieldTitle">CVC</span>
                        <input className="detailsInput" placeholder="e.g. 123" ref={inputRefs.cvc} type="text" onKeyDown={(event) => {inputCheckCvc(event)}} onChange={() => changeCvc(inputRefs.cvc.current.value)} maxLength="4" id="CVC" required/>
                    </div>

                </div>

                <button className="cardDetailsSubmit" onClick={validateForm}>Confirm</button>

            </form>

        </div>
    )
}