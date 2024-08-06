import { useEffect, useState } from "react"
import Loading from "../components/Loading";
import { getToken } from "../services/storage";
import '../styles/home/Home.css'
import { Link } from "react-router-dom";

export default function Home() {
    const  [ loading, setLoading ]  = useState(true)

    useEffect(() => {
        setLoading(true)
        const token = getToken()
        if (token) window.location.href = '/students'
        else setLoading(false)
    }, [])

    return (
        <>
            { loading ? <Loading /> :
                <div className="main_container">
                    <p className="name"> Students Catalog </p>
                    <div className="slogan_container">
                         <p className="slogan"> Manage your students through our service </p>
                         <Link className="get_started_button" to='/login'>Get Started</Link>
                    </div>
                </div>
            }
        </>
    )
}