import { Outlet, Link } from "react-router-dom"
import '../styles/common/Navbar.css'
import account_icon from "../assets/icons/account_blue.png"
import logout_icon from "../assets/icons/logout_blue.png"
import { logout, getFullUser } from "../services/auth"
import Loading from "./Loading"
import { useState, useEffect } from "react"

export default function Navbar() {
    const [fullUser, setFullUser] = useState(null)

    useEffect(() => {
        const fullUser = getFullUser()
        console.log("Inside Navbar.jsx")
        if (fullUser.error) window.location.href = '/login'
        else setFullUser(fullUser)
    }, [])

    return (
        <>
            { !fullUser 
                ? <Loading /> 
                : <NavbarComp user={fullUser.user} /> 
            }
        </>
    )
}

function NavbarComp(props) {
    return (
        <>
            <div className="navbar_container">
                <div className="navbar_name_container"> <Link className="navbar_name" to='/students'>Students Catalog</Link> </div>
                <div className="navbar_links_container">
                    <AccountInfo userName={props.user.name} />
                    <LogoutLink />
                </div>
            </div>
            <main> <Outlet /> </main>
        </>
    )
}

function AccountInfo(props) {
    const userName = props.userName

    return (
        <div className="navbar_link_container">
            <img className="navbar_link_icon" src={account_icon} alt="account_icon" />
            <span className="navbar_link" to='/students'>{userName}</span>
        </div>
    )
}

function LogoutLink() {
    const onClick = () => {
        logout()
    }
    
    return (
        <div className="navbar_link_container">
            <img className="navbar_link_icon" src={logout_icon} alt="account_icon" />
            <Link className="navbar_link" to='/login' onClick={onClick}>Logout</Link>
        </div>
    )
}

