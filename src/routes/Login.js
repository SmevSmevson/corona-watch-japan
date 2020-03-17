import React, {useState, useContext} from 'react';
import { AuthContext } from '../contextProviders/AuthContext'


function Login() {
    let {auth, dispatch} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitState, setSubmitState] = useState('IDLE')

    let login = (e) => {
        e.preventDefault()
        if(submitState === 'IDLE') {
            setSubmitState('BUSY')
            dispatch({type: 'LOGIN', dispatch, credentials: {email, password}})
            setSubmitState('IDLE')
        }
    }

    return (
        <section className="form-section">
            <form onSubmit={login}>

                <label htmlFor="email">email</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <span></span>

                <label htmlFor="password">password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <span></span>

                <button type="submit" className={`button--submit button--submit__${submitState}`}>
                    {
                        submitState === "IDLE" ? 'Submit': 
                        submitState === "BUSY" ? 'Submitting': 
                        submitState === "SUCCESS" ? 'Success': 
                        'Failed'
                    }
                </button>

            </form>
        </section>
    )
}

export default Login;
