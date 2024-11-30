import React, { useState } from 'react';
import CrudCanchas from './Canchas/CrudCancha';
import CrudSubcancha from './Canchas/CrudSubCancha';

const Canchas = () => {
    const [mostrarCanchas, setMostrarCanchas] = useState(true);

    const handleCanchasClick = () => {
        setMostrarCanchas(true);
    };

    const handleSubcanchasClick = () => {
        setMostrarCanchas(false);
    };

    return (
        <div className="text-center">
            <div className="mb-4">
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                    onClick={handleCanchasClick}
                >
                    Canchas
                </button>
                <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary mx-2"
                    onClick={handleSubcanchasClick}
                >
                    Subcanchas
                </button>
            </div>
            <div>
                {mostrarCanchas ? <CrudCanchas /> : <CrudSubcancha />}
            </div>
        </div>
    );
};

export default Canchas;