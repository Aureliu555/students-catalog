import { useState, useEffect } from "react"
import { getStudents, addStudent, deleteStudent } from "../services/students"
import Loading from "../components/Loading"
import "../styles/students/Students.css"
import "../styles/common/Table.css"
import "../styles/common/Modal.css"
import "../styles/common/ModalForm.css"
import bin_icon from "../assets/icons/bin.png"
import { Input } from "../components/Inputs"
import { Button } from "../components/Button"
import Modal from "../components/Modal"
import { Link } from "react-router-dom"
import { VerticalLine } from "../components/Lines"

export default function Students() {
    const [students, setStudents] = useState(null)

    useEffect(() => {
        getStudents().then(res => {
            setStudents(res)
        })
    }, [])

    return (
        !students ? <Loading /> : 
            <div className="students_container"> <Table students={students} setStudents={setStudents} /> </div>
    )
}

function Table({ students, setStudents }) {
    const [visible, setVisible] = useState(false)
    const toggleModal = () => {
        setVisible((prev) => !prev)
    }

    return (
        <div className="table_container"> 
            <div className="table_name"> Students </div>
            <div style={{marginBottom: "20px"}}>
                <TableElements />
                {students.map((s, idx) => 
                    <TableRow key={s.id} id={s.id} number={idx+1} name={s.name} setStudents={setStudents}/>
                )}
            </div>

            <Button onClick={toggleModal} className='add_button'>
                Add New Student<span>+</span>
            </Button>

            <Modal visible={visible} toggleModal={toggleModal}>
                <AddStudentForm setStudents={setStudents} toggleModal={toggleModal}/>
            </Modal>	
        </div>
    )
}

function TableElements() {
    return (
        <div className="table_row">
            <div className="row_number"></div>
            <VerticalLine />
            <div className="row_name"><span>Name</span></div>
        </div>
    )
}

function TableRow({ id, number, name, setStudents }) {

    const handleDelete = async () => {
        const success = await deleteStudent(id)
        if (success) {
            setStudents(prev => prev.filter(s => s.id !== id))
        }
    }

    return (
        <div className="table_row">
            <div className="row_number">{number}.</div>
            <VerticalLine />
            <div className="row_student_name"><Link to={`/student/${id}`}>{name}</Link></div>
            <div className="row_delete_icon"> <img className="delete_icon" src={bin_icon} alt="bin_icon" onClick={handleDelete}/></div>
        </div>
    )
}

function AddStudentForm({setStudents, toggleModal}) {
    const [name, setName] = useState('')

    const handleSubmit = async () => {
        const newStudent = await addStudent(name)
        if (newStudent) {
            toggleModal()
            setStudents(prev => [...prev, newStudent])
        }
    }

    return (
        <div className="modal_form">
            <div className="modal_form_name">Add a new student</div>
            <Input placeholder="Student's Name" value={name} setValue={setName} />
            <Button onClick={handleSubmit} style={{width:"200px", height:"30px"}}>Add Student</Button>
        </div>
    )
}

