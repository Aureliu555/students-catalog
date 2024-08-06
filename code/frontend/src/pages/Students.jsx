import { useState, useEffect } from "react"
import { getToken } from "../services/storage"
import { getStudents } from "../services/students"
import Loading from "../components/common/Loading"
import "../styles/students/Students.css"
import bin_icon from "../assets/icons/bin.png"

export default function Students() {
    const [students, setStudents] = useState(null)

    useEffect(() => {
        const token = getToken()
        getStudents(token).then(res => {
            setStudents(res)
            console.log(students)
        })
    }, [])

    return (
        <>
            { !students 
                ? <Loading />
                : <div className="students_container">
                    <Table students={students} />
                </div>
            }   
        </>
    )
}

function Table({students}) {
    return (
        <div className="table_container"> 
            <div className="table_name"> Students </div>
            {students.map((s, idx) => 
                <TableRow key={s.id} number={idx+1} name={s.name} />
            )}
            <div className="add_student_button">ADD NEW STUDENT<span>+</span></div>
         </div>
    )
}

function TableRow({key, number, name}) {
    return (
        <div key={key} className="table_row">
            <div className="row_number">{number}.</div>
            <div className="row_student_name"><span>{name}</span></div>
            <div className="row_delete_icon"> <img className="delete_icon" src={bin_icon} alt="bin_icon" /></div>
        </div>
    )
}

