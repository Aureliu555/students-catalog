import '../../styles/auth/Input.css'
import visible_icon from '../../assets/images/visible.png'
import non_visible_icon from '../../assets/images/non-visible.png'
import { useState } from 'react'

export function Input({ placeholder, value, setValue }) {
    return (
        <div className='input_container'>
            <input
                className='input'
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(v) => setValue(v.target.value)}
            />
        </div>
    )
}

export function PasswordInput({ placeholder, value, setValue }) {
    const [visible, setVisible] = useState(false)
    const onClick = () => {
        setVisible((prev) => !prev)
    }

    return (
        <div className='input_container'>
            <input
                className='input'
                type={visible ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={(v) => setValue(v.target.value)}
            />
            <div className='icon_container'>
                <img className='icon' onClick={onClick} src={visible ? visible_icon : non_visible_icon}/>
            </div>
        </div>
    )
}
