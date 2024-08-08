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
        <form className="modal_form">
            <div className="modal_form_name">Add a new subject</div>
            <Input placeholder="Subject Name" value={name} setValue={setName} />
            <Button onClick={handleSubmit} style={{width:"200px", height:"50px"}}>Add Subject</Button>
        </form>
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
        <form className="modal_form">
            <div className="modal_form_name">Add a new student</div>
            <Input placeholder="Student's Name" value={name} setValue={setName} />
            <Button onClick={handleSubmit} style={{width:"200px", height:"50px"}}>Add Student</Button>
        </form>
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
            <form className="edit_grade">
                <span>New Grade</span>
                <input type="number" value={grade} onChange={onChange}/>
                <Button onClick={() => handleUpdate(subjectId, grade)} style={{width:"100px", height: "60px"}}>
                    {loadingUpdate ? "..." : "Update"}
                </Button>
            </form>
            <Button onClick={handleDelete} style={{width:"150px", height: "60px", backgroundColor: "red"}}>
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
                <Button onClick={toggleModal} className='cancel_button'> Cancel </Button>
            </div>
        </div>
    )
}