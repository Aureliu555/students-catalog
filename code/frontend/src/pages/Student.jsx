import { useParams } from "react-router-dom"
import { getStudent } from "../services/students"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import Modal from "../components/Modal"
import { Button } from "../components/Button"
import "../styles/student/Student.css"
import "../styles/common/Table.css"
import "../styles/common/ModalForm.css"
import { VerticalLine } from "../components/Lines"
import bin_icon from "../assets/icons/bin.png"
import { addSubject, deleteSubject } from "../services/subjects"
import { Input } from "../components/Inputs"

export default function Student() {
    const { id } = useParams()
    const [student, setStudent] = useState(null)
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        getStudent(id).then(student => {
            setStudent({id: student.id, name: student.name})
            setSubjects(student.subjects)
        })
    }, [])

    return (
        !student ? <Loading /> :
            <div className="student_container"> <Table subjects={subjects} setSubjects={setSubjects} student={student}></Table> </div>
    )
}   

function Table({ subjects, setSubjects, student }) {
    const [visible, setVisible] = useState(false)
    const toggleModal = () => {
        setVisible((prev) => !prev)
    }

    return (
        <div className="table_container"> 
            <div className="table_name"> {student.name}'s Subjects</div>
            <div style={{marginBottom: "20px"}}>
                <TableElements />
                {subjects.map((s, idx) => 
                    <TableRow key={s.id} id={s.id} number={idx+1} name={s.name} grade={s.grade ? s.grade : "-"} setSubjects={setSubjects} />
                )}
            </div>  
            <Button onClick={toggleModal} className='add_button'> Add Subject<span>+</span> </Button>
            <Modal visible={visible} toggleModal={toggleModal}>
                <AddSubjectForm toggleModal={toggleModal} setSubjects={setSubjects} studentId={student.id} />
            </Modal>	
        </div>
    )
}

function TableElements() {
    return (
        <div className="table_row">
            <div className="row_subjects_number"></div>
            <VerticalLine />
            <div className="row_name row_subject_name"><span>Name</span></div>
            <VerticalLine />
            <div className="row_grade"><span>Grade</span></div>
        </div>
    )
}

function TableRow({ id, number, name, grade, setSubjects }) {

    const handleDelete = async () => {
        const success = await deleteSubject(id)
        if (success) {
            setSubjects(prev => prev.filter(s => s.id !== id))
        }
    }

    return (
        <div className="table_row">
            <div className="row_subjects_number">{number}.</div>
            <VerticalLine />
            <div className="row_subject_name">
                <span style={{width: "70%"}}>{name}</span>
                <div style={{width: "100%", display: "flex", justifyContent: "end", marginRight: "20px", alignItems: "center"}}>
                    <img className="delete_icon" src={bin_icon} alt="bin_icon" onClick={handleDelete}/>
                </div>
            </div>
            <VerticalLine />
            <div className="row_grade"><span>{grade}</span></div>
        </div>
    )
}

function AddSubjectForm({studentId, setSubjects, toggleModal}) {
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
