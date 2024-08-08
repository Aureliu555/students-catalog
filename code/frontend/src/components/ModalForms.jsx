import { Input } from "./Inputs"
import { Button } from "./Button"
import { addSubject, addGrade, removeGrade } from "../services/subjects"
import { addStudent } from "../services/students"
import { useState } from "react"
import "../styles/common/ModalForm.css"

export function AddSubjectForm({studentId, setSubjects, toggleModal}) {
    const [name, setName] = useState('')

    const handleSubmit = async () => {
        const newSubject = await addSubject(studentId, name)
        if (newSubject) {
            toggleModal()
            setSubjects(prev => [...prev, newSubject])
        }
    }

    return (
        <div className="modal_form">
            <div className="modal_form_name">Add a new subject</div>
            <Input placeholder="Subject Name" value={name} setValue={setName} />
            <Button onClick={handleSubmit} style={{width:"200px", height:"30px"}}>Add Subject</Button>
        </div>
    )
}

export function AddStudentForm({setStudents, toggleModal}) {
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

export function EditGradeForm({toggleModal, subjectId, setSubjects}) {
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [grade, setGrade] = useState('')

    const handleUpdate = async (subjectId, grade) => {
        setLoadingUpdate(true)
        const success = await addGrade(subjectId, grade)
        if (success) {
            toggleModal()
            setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, grade } : s))
        }
        setLoadingUpdate(false)
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
        const success = await removeGrade(subjectId)
        if (success) {
            toggleModal()
            setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, grade: null } : s))
        }
        setLoadingDelete(false)
    }

    const onChange = (e) => setGrade(e.target.value)

    return (
        <div className="edit_grade_form">
            <div className="modal_form_name">Change Grade</div>
            <div className="edit_grade">
                <span>New Grade</span>
                <input type="number" value={grade} onChange={onChange}/>
                <Button onClick={() => handleUpdate(subjectId, grade)} style={{width:"100px", height: "30px"}}>
                    {loadingUpdate ? "..." : "Update"}
                </Button>
            </div>
            <Button onClick={handleDelete} style={{width:"140px", height: "35px", backgroundColor: "red"}}>
                {loadingDelete ? "..." : "Delete Grade"}
            </Button>
        </div>
    )
}

export function ConfirmationForm({toggleModal, action, question, highlightedText}) {
    const handleConfirm = () => {
        action()
        toggleModal()
    }

    return (
        <div className="confirmation_form">
            <div className="confirmation_modal_text">
                <span>{question}</span>
                <span style={{fontWeight: 'bolder', textDecoration: 'underline'}}>{highlightedText}</span>
                <span>{' ?'}</span>
            </div>
            <div className="confirmation_buttons_container">
                <Button onClick={handleConfirm} className='confirm_button'> Confirm </Button>
                <Button onClick={toggleModal} className='cancel_button' style={{width:"100px", height: "25px", backgroundColor: "gray"}}> Cancel </Button>
            </div>
        </div>
    )
}