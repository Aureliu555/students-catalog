import '../styles/auth/Login.css'
import { Input, PasswordInput } from '../components/auth/Inputs'
import { useState } from 'react'
import Button from '../components/auth/Button'
import { Link } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleLogin = async (email, password) => {
        setLoading(true)
        console.log('Inside handleLogin', email, password)
        const res = await login(email, password)
        
        setLoading(false)
    }

    return (
        <div className='main_container'>
            <div className='login_container'>
                <div className='form_container'> 
                    <p className='main_text'>Log In</p>
                    <div className='inputs_container'>
                        <Input placeholder='Email' value={ email } setValue={ setEmail } />
                        <PasswordInput placeholder='Password' value={ password } setValue={ setPassword } />
                    </div>
                    <div className='button_container'> 
                        <Button text={loading ? 'Loading...' : 'Log In'} onClick={ () => handleLogin(email, password) } />
                    </div>
                    <div className='register_text'>
                        <span>Don't have an account yet?</span>
                        <Link className='register_link' to='/register'> Register</Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}