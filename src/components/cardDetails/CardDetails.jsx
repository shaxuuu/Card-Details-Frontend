import { useEffect, useRef, useState } from "react"
import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"
import Utils from './CardFormatingUtils'

import complete from '../../assets/icons/icon-complete.svg'

export const CardDetails = () => {

    const inputRefs = { name : useRef(), card : useRef(), month : useRef(), year : useRef(), cvc : useRef() }
    
    const [ sent, changeSent ] = useState(false)
    const [ nameState, changeName ] = useState("")
    const [ ccNumberState, changeCcNumber ] = useState("")
    const [ cvcState, changeCvc ] = useState("")
    const [ monthState, changeMonth ] = useState(undefined)
    const [ yearState, changeYear ] = useState(undefined)
    const year = new Date().getFullYear().toString().slice(2)


    useEffect( () => {
        if( !sent ){

            for( const input in inputRefs ){
                inputRefs[input].current.addEventListener("invalid", (event) => {
                    event.preventDefault()
                })
            }
            
        }
    }, [sent])

    return (
        <div id="cardDetailsContent">

            <div id="cardDetailsCards">
                <CardFront data={{ name : nameState, ccNumber : ccNumberState, month : monthState, year : yearState }}/>
                <CardBack data={{ cvc : cvcState }} />
            </div>

        { !sent && 
            <form onSubmit={ (e) => { return Utils.validateForm(e, inputRefs, changeSent) } } id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput"  placeholder="e.g. Jane Appleseed" ref={inputRefs.name} onChange={() => ( changeName( inputRefs.name.current.value ), Utils.validateInput( inputRefs.name, i => i == 0 ) )} onKeyDown={(event) => {Utils.inputCheckStrgin(event)}} type="text" id="name" /> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle" >Card Number</span>
                    <input className="detailsInput"  placeholder="e.g. 1234 5678 9123 0000" ref={inputRefs.card} onChange={() => { changeCcNumber( inputRefs.card.current.value ), Utils.validateInput( inputRefs.card, i => i < 19 ) } } onKeyDown={(event) => {Utils.inputCheckCard(event, inputRefs.card)}} minLength="19" maxLength="19" type="text" id="cardNumber" />
                </div>
                
                <div className="inputHolder" data-direction="row">
                    <div>
                        <span className="fieldTitle">Exp. Date (MM/YY)</span>
                        <div className="cardDate">
                            <input className="detailsInput"  placeholder="MM" ref={inputRefs.month} type="text" minLength="2" maxLength="2" onBlur={ () => {Utils.inputMonthLostFocus(inputRefs.month, changeMonth)}} onChange={() => { Utils.validateInput( inputRefs.month, i => i == 0 ) }} onKeyDown={(event) => {Utils.inputCheckMonth( event, inputRefs.month, inputRefs.year, changeMonth )} } id="Month" />
                            <input className="detailsInput" placeholder="YY" ref={inputRefs.year} type="text" maxLength="2" onChange={() => { changeYear( inputRefs.year.current.value ), Utils.validateInput( inputRefs.year, i => i == 0 ) } } onKeyDown={Utils.inputCheckYear} id="Year" />
                        </div>
                    </div>
                    <div>
                        <span className="fieldTitle">CVC</span>
                        <input className="detailsInput" placeholder="e.g. 123" ref={inputRefs.cvc} type="text" onKeyDown={(event) => {Utils.inputCheckCvc(event)}} onChange={() => { changeCvc(inputRefs.cvc.current.value), Utils.validateInput( inputRefs.cvc, i => i < 3 ) } } minLength="3" maxLength="4"  id="CVC" />
                    </div>

                </div>

                <button type="submit" className="cardDetailsSubmit" >Confirm</button> 

            </form>
        }
        { sent &&
            <div id="formComplete">
                <img src={complete} alt="complete" width="90" />
                <span className="thanksTitle"> THANK YOU! </span>
                <span className="thanksDesc"> We've added your card details </span>
                <button onClick={ () => { window.location.reload() }} className="thanksContinue" >Continue</button> 
            </div>
        }

        </div>
    )
}