import '../styles/auth/Auth.css'
import { Input, PasswordInput, DateInput } from '../components/Inputs'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'
import { register } from '../services/auth'

export default function Register() {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ birthDate, setBirthDate ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(false)

    const handleRegister = async (name, email, password, birth_date) => {
        setLoading(true)
        const res = await register(name, email, birth_date, password)
        if (res.status === 'error') setError(res.message)
        setLoading(false)
    }

    return (
        <div className='main_container'>
            <div className='auth_container'>
                <div className='form_container'> 
                    <p className='main_text'>Register</p>
                    <div className='error_container'>
                        { error && <p className='error_text'>{ error }</p> }
                    </div>
                    <div className='inputs_container'>
                        <Input placeholder='Name' value={ name } setValue={ setName } />
                        <Input placeholder='Email' value={ email } setValue={ setEmail } />
                        <DateInput placeholder='Birth Date' selectedDate={ birthDate } setSelectedDate={ setBirthDate } />
                        <PasswordInput placeholder='Password' value={ password } setValue={ setPassword } />
                    </div>
                    <div className='button_container'> 
                        <Button onClick={ () => handleRegister(name, email, password, birthDate) } style={{width:'75%', height:'35px'}}> 
                            {loading ? 'Loading...' : 'Register'} 
                        </Button>
                    </div>
                    <div className='other_operation_text'>
                        <span>Already have an account?</span>
                        <Link className='other_operation_link' to='/login'> Log In </Link> 
                    </div>
                </div> 
            </div>
        </div>
    )
}