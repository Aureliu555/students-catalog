import { useParams, useSearchParams } from "react-router-dom";
import '../styles/error/ErrorPage.css'

export default function ErrorPage() {
    const { status } = useParams()
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get('message') || 'An unknown error occurred.';

    return (
        <div className="error_page_container">
            <span className="error_page_code">{status}</span> 
            <span className="error_page_text">{errorMessage}</span>
        </div>
    )
}