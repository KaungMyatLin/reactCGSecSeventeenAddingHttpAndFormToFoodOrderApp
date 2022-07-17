import classes  from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = val => val.trim() === '';
const isFiveChars = val => val.trim().length === 5;

const Checkout = props => {
    const [formValidity, setFormValidity] = useState({
        n: true,
        st: true,
        po: true,
        ci: true
    });
    const nInputRef = useRef();
    const stInputRef = useRef();
    const poInputRef = useRef();
    const ciInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();
        const entN = nInputRef.current.value;
        const entSt = stInputRef.current.value;
        const entPo = poInputRef.current.value;
        const entCi = ciInputRef.current.value;
        const entNisValid = !isEmpty(entN);
        const entStisValid = !isEmpty(entSt);
        const entPoisValid = isFiveChars(entPo);
        const entCiisValid = !isEmpty(entCi);
        setFormValidity({n:entNisValid, st:entStisValid, po:entPoisValid, ci:entCiisValid })
        const formIsValid = entNisValid
         && entStisValid
          && entPoisValid
           && entCiisValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({name:entN, street:entSt, postalCode:entPo, city:entCi})
    }

    const controlClass = val => {
        return `${classes.control} ${formValidity[val]?'':classes.invalid}`
    }
    return <form>
        <div className={controlClass("n")}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nInputRef}></input>
            { !formValidity.n && <p> Please enter a valid name! </p>}
        </div>
        <div className={`${classes.control} ${formValidity.st?'':classes.invalid}`}>
            <label htmlFor="street">Street</label>
            <input type="text" id="street" ref={stInputRef}></input>
            { !formValidity.st && <p> Please enter a valid street! </p>}
        </div>
        <div className={`${classes.control} ${formValidity.po?'':classes.invalid}`}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={poInputRef}></input>
            { !formValidity.po && <p> Please enter a valid postal! Please enter 5 char! </p>}
        </div>
        <div className={`${classes.control} ${formValidity.ci?'':classes.invalid}`}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={ciInputRef}></input>
            { !formValidity.ci && <p> Please enter a valid city! </p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button onClick={confirmHandler}>Confirm</button>
        </div>
    </form>
}

export default Checkout