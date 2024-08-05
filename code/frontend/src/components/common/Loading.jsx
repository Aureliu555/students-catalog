import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import '../../styles/common/Loading.css'

export default function Loading() {
    return (
        <div className='main_container'>
            <ClipLoader
                color={"blue"}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}