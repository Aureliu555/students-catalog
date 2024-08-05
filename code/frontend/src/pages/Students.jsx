import { useState, useEffect } from "react"
import { getToken } from "../services/storage"
import { getStudents } from "../services/students"
import Loading from "../components/common/Loading"

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
            { !students ? <Loading /> :
                <div>Students</div>
            }
        </>
    )
}

