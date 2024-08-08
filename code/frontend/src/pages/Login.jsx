import '../styles/auth/Auth.css'
import { Input, PasswordInput } from '../components/Inputs'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { login } from '../services/auth'
import AuthContainer from '../components/AuthContainer'

export default function Login() {
    const [ error, setError ] = useState(null)

    return (
        <AuthContainer name='Log In' error={error} style={{height: '500px'}}> 
            <FormContainer setError={ setError } />
            <RegisterLink />
        </AuthContainer>
    )
}

function FormContainer({setError}) {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const handleLogin = async (email, password) => {
        setLoading(true)
        const res = await login(email, password)
        if (res.status === 'error') setError(res.message)
        setLoading(false)
    }

    return (
        <form>
            <div className='inputs_container'>
                    <Input placeholder='Email' value={ email } setValue={ setEmail } />
                    <PasswordInput placeholder='Password' value={ password } setValue={ setPassword } />
            </div>
            <div className='button_container'> 
                <Button onClick={ () => handleLogin(email, password) } style={{width:'75%', height:'50px'}}> 
                    { loading ? 'Loading...' : 'Log In' }
                </Button>
            </div>
        </form>
    )
}

function RegisterLink() {
    return (
        <div className='other_operation_text'>
            <span>Don't have an account yet?</span>
            <Link className='other_operation_link' to='/register'> Register </Link>
        </div>
    )
}