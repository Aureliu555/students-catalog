import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
    return (
        <ClipLoader
            color={"blue"}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}