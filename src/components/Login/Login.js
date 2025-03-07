import { useState, useEffect, useReducer } from 'react'
import './Login.css'
import Card from '../UI/Card'
import Button from '../UI/Button'


const Login = (props) => {
    const [enteredEmail, setEnteredEmail] = useState('') 
    const [enteredPassword, setEnteredPassword] = useState('') 
    const [emailIsValid, setEmailIsValid] = useState()   
    const [passwordIsValid, setPasswordIsValid] = useState() 
    const [formIsValid, setFormIsValid] = useState(false) 
    
    useEffect( () => {
        const timeOut = setTimeout( () => {
            console.log('check form is valid')
            setFormIsValid(emailIsValid === true && passwordIsValid === true)
            console.log('checked')
        }, 500 )
        return () => {
            clearTimeout(timeOut)
        }  
    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    }  

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    } 

    const emailValidateHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    } 

    const passwordValidateHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }  

    const submitHandler = (event) => {
        event.preventDefault()
        props.onLogin(enteredEmail, enteredPassword)
    } 

    const emailReducer = (state, action) => {
        if(action.type === 'USER_INPUT'){
            return {
                value: action.val,
                isValid: action.val.includes('@')
            } 
        } 

        if(action.type === 'INPUT_BLUR') {
            return {
                value: state.value,
                isValid: state.value.includes('@')
            }  
        }
        
        return {
            value: '',
            isValid: false
         }  
    } 

    const passwordReducer = (state, action) => {
        if(action.type === 'USER_INPUT'){
            return {
                value: action.val,
                isValid: state.value.trim().length > 6
            } 
        } 

        if(action.type === 'USER_BLUR'){
            return{
                value: state.value,
                isValid: state.value.trim().length > 6

            }  
        } 

        return {
            value: '',
            isValid: false
        } 
    }  

    const [emailState, dispatchEmail] = useReducer(
        emailReducer,
       {
        value: '',
        isValid: null
       } 
    ) 

    const [passwordState, dispatchPassword] = useReducer(
        passwordReducer,
       {
        value: '',
        isValid: null
       } 
    ) 

    return (
        <Card className="login">
            <form onSubmit = {submitHandler} >
                <div className={`control ${emailState.isValid === false ? 'invalid' : ''}`}>
                    <label for="email">Email</label>
                    <input type="email" 
                    id="email"
                    value={emailState.value} 
                    onChange={emailChangeHandler}
                    onBlur ={emailValidateHandler}  ></input>
                </div>
                <div className={`control ${passwordState.isValid === false ? 'invalid' : ''}`} >
                    <label for="password">Password</label>
                    <input type="password" 
                    id="password"
                    value={passwordState.value}  
                    onChange={passwordChangeHandler} 
                    onBlur ={passwordValidateHandler}  ></input>
                </div>
                <div className="actions">
                    <Button type="submit" disabled={!formIsValid} >Login</Button>
                </div>
            </form>
        </Card>
    )
}  

export default Login