import { useParams } from "react-router-dom"

export default function Student() {
    const { id } = useParams()

    return (
        <div>Student {id}</div>
    )
}