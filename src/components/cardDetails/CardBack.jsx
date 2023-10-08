export const CardBack = (props) => {

    return( 
        <div className="cardDetailsCard" data-side="back">
            <span className="cvc">{props.data.cvc !== '' ? props.data.cvc : "000" }</span>
        </div>
    )

}