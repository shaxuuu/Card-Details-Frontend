export const CardFront = ( props ) => {

    const name = props.data.name.split(" ") 
    let ccNumber = props.data.ccNumber.split(" ") 
    ccNumber = [ ccNumber[0] !== '' ?  ccNumber[0] : "0000", ccNumber[1] ?? "0000", ccNumber[2] ?? "0000", ccNumber[3] ?? "0000" ]

    return( 
        <div className="cardDetailsCard" data-side="front"> 
            
            <div className="circles">
                <div className="st"></div>
                <div className="nd"></div>
            </div>

            <span className="cardNumber">   <span className="ccNumberGroup"> {ccNumber[0]} </span>   <span className="ccNumberGroup"> {ccNumber[1]} </span>   <span className="ccNumberGroup"> {ccNumber[2]} </span>   <span className="ccNumberGroup"> {ccNumber[3]} </span>   </span>
            <span className="nameAndDate"> <span>{ name[0] != '' ? name[0] : "NAME" } { name[name.length - 1] != undefined && name.length > 1 ? name[name.length - 1] : "SURNAME" } </span>  <span>00/00</span> </span>


        </div>
    )
 
}