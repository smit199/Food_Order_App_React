import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [enteredValueTouched, setEnteredValueTouched] = useState(false);

    const enteredValueIsValid = validateValue(enteredValue);
    const valueInputInvalid = enteredValueTouched && !enteredValueIsValid;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const valueInputBlurHandler = () => {
        setEnteredValueTouched(true);
    }

    const resetInput = () => {
        setEnteredValue('');
        setEnteredValueTouched(false)
    }

    return {
        value: enteredValue,
        isValueValid: enteredValueIsValid,
        isValueInvalid: valueInputInvalid,
        valueChangeHandler,
        valueInputBlurHandler,
        resetInput
    }
}

export default useInput;