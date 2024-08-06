import '../styles/common/Button.css'

export function Button({ onClick, text, width, height }) {
    return (
        <div style={{width: width, height: height}} className='button' onClick={onClick}>
            {text}
        </div>
    )
}