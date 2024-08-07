import '../styles/auth/Auth.css'
import { Input, PasswordInput } from '../components/Inputs'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const handleLogin = async (email, password) => {
        setLoading(true)
        const res = await login(email, password)
        if (res.status === 'error') setError(res.message)
        setLoading(false)
    }

    return (
        <div className='main_container'>
            <div className='auth_container'>
                <div className='form_container'> 
                    <p className='main_text'>Log In</p>
                    <div className='error_container'>
                        { error && <p className='error_text'>{ error }</p> }
                    </div>
                    <div className='inputs_container'>
                        <Input placeholder='Email' value={ email } setValue={ setEmail } />
                        <PasswordInput placeholder='Password' value={ password } setValue={ setPassword } />
                    </div>
                    <div className='button_container'> 
                        <Button onClick={ () => handleLogin(email, password) } style={{width:'75%', height:'35px'}}> 
                            { loading ? 'Loading...' : 'Log In' }
                        </Button>
                    </div>
                    <div className='other_operation_text'>
                        <span>Don't have an account yet?</span>
                        <Link className='other_operation_link' to='/register'> Register </Link>
                    </div>
                </div> 
            </div>
        </div>
    )
}