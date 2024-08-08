import '../styles/common/Button.css'

export function Button({ className, style, onClick, children }) {
    const onClickHandler = (e) => {
        e.preventDefault()
        onClick()
    }

    return (
        <button type='submit' style={style} className={`button ${className}`} onClick={onClickHandler}>
            {children}
        </button>
    )
}