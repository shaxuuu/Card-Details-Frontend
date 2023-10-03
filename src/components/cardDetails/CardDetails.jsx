import { CardBack } from "./CardBack"
import { CardFront } from "./CardFront"


export const CardDetails = () => {

    const inputCheckStrgin = ( input ) => {
        if( !( input.keyCode >= 65 && input.keyCode <= 90 ) && input.key !== ' ' && input.key !== 'Backspace'){
            input.preventDefault()
        }
    }
    

    return (
        <div id="cardDetailsContent">

            <div id="cardDetailsCards">
                <CardFront />
                <CardBack />
            </div>

            <div id="cardDetails">
            
                <div className="inputHolder">
                    <span className="fieldTitle">Cardholder Name</span>
                    <input className="detailsInput" placeholder="e.g. Jane Appleseed" pattern="[A-Za-z]*" onKeyDown={(event) => {inputCheckStrgin(event)}} type="text" id="name" /> 
                </div>
                
                <div className="inputHolder">
                    <span className="fieldTitle">Card Number</span>
                    <input className="detailsInput" placeholder="e.g. 1234 5678 9123 0000" type="text" id="cardNumber" />
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