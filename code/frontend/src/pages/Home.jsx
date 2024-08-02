import { useEffect, useState } from "react"
import Loading from "../components/common/Loading";
import { getToken } from "../services/storage";

export default function Home() {
    const  [ loading, setLoading ]  = useState(true)

    useEffect(() => {
        const token = getToken()
        setTimeout(() => {
            if (!token) {
                window.location.href = '/login'
            } else {
                setLoading(false)
            }
        }, 1500)
    }, [])

    return (
        <>
            { loading 
                ? <Loading />
                : <div>Home</div>
            }
        </>
    )
}