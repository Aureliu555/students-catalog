import { useParams } from "react-router-dom"
import { getStudent } from "../services/students"
import { useState, useEffect } from "react"
import Loading from "../components/Loading"
import Modal from "../components/Modal"
import { Button } from "../components/Button"
import "../styles/student/Student.css"
import "../styles/common/Table.css"
import { VerticalLine } from "../components/Lines"
import bin_icon from "../assets/icons/bin.png"
import { deleteSubject } from "../services/subjects"
import { AddSubjectForm, EditGradeForm } from "../components/ModalForms"

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
    const [addSubVisible, setAddSubVisible] = useState(false)
    const toggleAddSubModal = () => { setAddSubVisible((prev) => !prev) }

    return (
        <div className="table_container"> 
            <div className="table_name"> {student.name}'s Subjects</div>
            <div style={{marginBottom: "20px"}}>
                <TableElements />
                {subjects.map((s, idx) =>
                    <TableRow 
                        key={s.id} id={s.id} number={idx+1} name={s.name} grade={s.grade ? s.grade : "-"} setSubjects={setSubjects} 
                    />
                )}
            </div>  
            <Button onClick={toggleAddSubModal} className='add_button'> Add Subject<span>+</span> </Button>
            <Modal visible={addSubVisible} toggleModal={toggleAddSubModal}>
                <AddSubjectForm toggleModal={toggleAddSubModal} setSubjects={setSubjects} studentId={student.id} />
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
    const [editGradeVisible, setEditGradeVisible] = useState(false)
    const toggleEditGradeModal = () => { setEditGradeVisible((prev) => !prev) }

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
            <div className="row_grade"><span onClick={toggleEditGradeModal}>{grade}</span></div>
            <Modal visible={editGradeVisible} toggleModal={toggleEditGradeModal}>
                <EditGradeForm toggleModal={toggleEditGradeModal} setSubjects={setSubjects} subjectId={id} />
            </Modal>
        </div>
    )
}
