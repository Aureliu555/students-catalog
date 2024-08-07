import '../styles/common/Button.css'

export function Button({ className, style, onClick, children }) {
    return (
        <div style={style} className={`button ${className}`} onClick={onClick}>
            {children}
        </div>
    )
}