import React from "react";
import "./Modal.css"; // Aquí importamos el CSS para el modal

const Modal = ({ children , state, changeState}) => {
    return (
        <>
        {state && (
            <div className="overlay" >
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    <h1>Modal de ejemplo</h1>
                    <button onClick={ ()=>changeState(false)}>Cerrar Modal</button>
                </div>
                {children}
            </div>
            
        )}
        </>

    );
};

export default Modal;
