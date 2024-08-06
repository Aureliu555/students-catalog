import '../styles/common/Modal.css'

export default function Modal({visible, toggleModal, children}) {
    return (
        <>
            { visible && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
                )
            }
        </>
    )
}