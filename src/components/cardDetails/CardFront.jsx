export const CardFront = ( props ) => {

    const name = props.data.name.split(" ") 

    return( 
        <div className="cardDetailsCard" data-side="front"> 
            
            <div className="circles">
                <div className="st"></div>
                <div className="nd"></div>
            </div>

            <span className="cardNumber">0000 0000 0000 0000</span>
            <span className="nameAndDate"> <span>{ name[0] != '' ? name[0] : "NAME" } { name[name.length - 1] != undefined && name.length > 1 ? name[name.length - 1] : "SURNAME" } </span>  <span>00/00</span> </span>


        </div>
    )
 
}