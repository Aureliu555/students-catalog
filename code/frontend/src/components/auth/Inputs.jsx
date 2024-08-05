import '../../styles/auth/Input.css'
import visible_icon from '../../assets/images/visible.png'
import non_visible_icon from '../../assets/images/non-visible.png'
import calendar_icon from '../../assets/images/calendar.png'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

export function Input({ placeholder, value, setValue }) {
    return (
        <div className='input_container'>
            <input
                className='input'
                type='text'
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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
                onChange={(e) => setValue(e.target.value)}
            />
            <div className='icon_container'>
                <img className='icon' onClick={onClick} src={visible ? visible_icon : non_visible_icon}/>
            </div>
        </div>
    )
}


export function DateInput({ placeholder, selectedDate, setSelectedDate }) {
    const [isVisible, setIsVisible] = useState(false)

    const handleDateChange = (date) => {
        setSelectedDate(date)
        setIsVisible(false)
    }

    return (
        <div className='input_container'>
            <input
                className='input'
                placeholder={placeholder}
                value={selectedDate && format(selectedDate, 'dd/MM/yyy')}
                readOnly
            />
            <div className='icon_container'>
                <img className='icon' onClick={() => {setIsVisible((prev) => !prev)}} src={calendar_icon}/>
            </div>
            {isVisible && (
                <div className='calendar_container'>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        showYearDropdown
                        yearDropdownItemNumber={30}  
                        scrollableYearDropdown    
                        minDate={new Date(1930, 0, 1)} 
                        maxDate={new Date(2007, 11, 31)}   
                    />
                </div>
            )}
        </div>
    )
}