
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

const inputCheckCard = ( input, ref ) => {
    if( !checkIfNumeric( input ) ){
        input.preventDefault()
    }else{
        if( !( ref.current.value.length < 19 ) ){ return }

        let ccNumber = ""
        const ccNumberFromInput = ref.current.value.replace( /\s/g, '' )

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


        ref.current.value = ccNumber 
    }
}

const inputCheckCvc = ( input ) => {
    if( !checkIfNumeric( input ) ){
        input.preventDefault()
    }
}

const inputCheckMonth = ( input, refMonth, refYear, changeMonth ) => {
    if( !checkIfNumeric( input ) ){
        input.preventDefault()
    }else if( input.key !== 'Backspace'){

        if( Number( input.key ) >= 2 && refMonth.current.value.length <= 1 && refMonth.current.value.charAt(0) !== '1' ){
            refMonth.current.value = '0' + input.key
            changeMonth( '0' + input.key )
            refYear.current.focus()
            input.preventDefault()

        }else if( refMonth.current.value.charAt(0) === '1' ) {
            if( Number(input.key) > 2 ){
                refMonth.current.value = '01'
                changeMonth( '01' )
            }else{
                refMonth.current.value = '1' + input.key
                changeMonth( '1' + input.key )
            }
            refYear.current.focus()
            input.preventDefault()

        }else if( refMonth.current.value.length === 2 ){
            refYear.current.focus()
            input.preventDefault()
        }

    }

}

const inputMonthLostFocus = ( ref, changeMonth ) => {
    if( ref.current.value === '1' ){
        ref.current.value = '01'
        changeMonth('01')
    }
}

const inputCheckYear = ( input ) => {
    if( !checkIfNumeric( input ) ){
        input.preventDefault()
    }

}

const validateInput = (ref, condition) => {
    if( condition( ref.current.value.length )  ){
        ref.current.classList.add('invalidInput')
        return false
    }else{
        ref.current.classList.remove('invalidInput')
        return true
    }
}

const validateForm = ( event, inputRefs, changeSent ) => {
    event.preventDefault()

    let pass = true

    for (const id in inputRefs) {

        const inputValid = validateInput( inputRefs[id], ( i => i === 0))   
        if( pass === true ){
            pass = inputValid
        }

    }
    
    if( pass == true ){ changeSent(true) };

}

const Utils = {
    checkIfNumeric,
    inputCheckStrgin,
    inputCheckCard,
    inputCheckCvc,
    inputCheckMonth,
    inputMonthLostFocus,
    inputCheckYear,
    validateInput,
    validateForm
}
export default Utils