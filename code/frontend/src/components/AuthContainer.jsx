import '../styles/auth/Auth.css'

export default function AuthContainer({name, children, error}) {
    return (
        <div className='main_container'>
            <div className='auth_container'>
                <div className='form_container'> 
                    <p className='main_text'>{name}</p>
                    <div className='error_container'>
                        { error && <p className='error_text'>{ error }</p> }
                    </div>
                    {children}
                </div> 
            </div>
        </div>
    )
}