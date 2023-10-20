import { useEffect, useRef, useState } from "react"
import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"
import Utils from './CardFormatingUtils'

export const CardDetails = () => {

    const inputRefs = { name : useRef(), card : useRef(), month : useRef(), year : useRef(), cvc : useRef() }
    
    const [ nameState, changeName ] = useState("")
    const [ ccNumberState, changeCcNumber ] = useState("")
    const [ cvcState, changeCvc ] = useState(undefined)
    const [ monthState, changeMonth ] = useState(undefined)
    const [ yearState, changeYear ] = useState(undefined)
    const year = new Date().getFullYear().toString().slice(2)

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

            <form onSubmit={ (e) => {} } id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput" tabIndex="1" placeholder="e.g. Jane Appleseed" ref={inputRefs.name} onChange={() => ( changeName( inputRefs.name.current.value ), Utils.validateInput( inputRefs.name, i => i == 0 ) )} onKeyDown={(event) => {Utils.inputCheckStrgin(event)}} type="text" id="name" required/> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle">Card Number</span>
                    <input className="detailsInput" tabIndex="2" placeholder="e.g. 1234 5678 9123 0000" ref={inputRefs.card} onChange={() => { changeCcNumber( inputRefs.card.current.value ), Utils.validateInput( inputRefs.card, i => i < 19 ) } } onKeyDown={(event) => {Utils.inputCheckCard(event, inputRefs.card)}} minLength="19" maxLength="19" type="text" id="cardNumber" required/>
                </div>
                
                <div className="inputHolder" data-direction="row">
                    <div>
                        <span className="fieldTitle">Exp. Date (MM/YY)</span>
                        <div className="cardDate">
                            <input className="detailsInput" tabIndex="3" placeholder="MM" ref={inputRefs.month} type="text" minLength="2" maxLength="2" onBlur={ () => {Utils.inputMonthLostFocus(inputRefs.month, changeMonth)}} onChange={() => { Utils.validateInput( inputRefs.month, i => i == 0 ) }} onKeyDown={(event) => {Utils.inputCheckMonth( event, inputRefs.month, inputRefs.year, changeMonth )} } id="Month" required/>
                            <input className="detailsInput" tabIndex="4" placeholder="YY" ref={inputRefs.year} type="text" maxLength="2" onChange={() => { changeYear( inputRefs.year.current.value ), Utils.validateInput( inputRefs.year, i => i == 0 ) } } onKeyDown={Utils.inputCheckYear} id="Year" required/>
                        </div>
                    </div>
                    <div>
                        <span className="fieldTitle">CVC</span>
                        <input className="detailsInput" tabIndex="5" placeholder="e.g. 123" ref={inputRefs.cvc} type="text" onKeyDown={(event) => {Utils.inputCheckCvc(event)}} onChange={() => { changeCvc(inputRefs.cvc.current.value), Utils.validateInput( inputRefs.cvc, i => i < 3 ) } } minLength="3" maxLength="4"  id="CVC" required/>
                    </div>

                </div>

                <button type="submit" className="cardDetailsSubmit" >Confirm</button> 

            </form>

        </div>
    )
}