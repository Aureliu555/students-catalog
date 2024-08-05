import { useState, useEffect } from "react"
import { getFullUser } from "../services/auth"

export default function Students() {
    const  [ loading, setLoading ]  = useState(true)

    useEffect(() => {
        setLoading(true)
        const user = getFullUser()
        
        setLoading(false)
    }, [])

    return (
        <div>Students</div>
    )
}