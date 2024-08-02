import '../../styles/auth/Button.css'

export default function Button({ onClick, text }) {
    return (
        <div className='button' onClick={onClick}>
            {text}
        </div>
    )
}