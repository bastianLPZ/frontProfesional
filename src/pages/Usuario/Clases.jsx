import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CardClass from "../../components/Usuario/MisClases/CardClass";
import ClasesUsuarioService from "../../services/Usuario/usuarioClasesService";


const Clases = ()=>{
    const [clases, setClases] = useState({}); // Cambiado a objeto

    useEffect(() => {
        ClasesUsuarioService.getClases()
            .then((response) => {
                console.log("Clases recibidas:", response);
                setClases(response);
            })
            .catch((error) => {
                console.error("Error fetching clases:", error);
            });
        
    }, []);


    const handleAddStudent = (id) => {
        console.log("La clase tiene id: " + id);
        let objetoTemporal ={};
        objetoTemporal.id_clase = id;
        objetoTemporal.id_usuario = JSON.parse(localStorage.getItem('user')).id;
        ClasesUsuarioService.unirseClase(objetoTemporal)
    }

    return(
        <div className="p-6 space-y-6">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <h1 className="text-2xl font-bold">Clases disponibles</h1>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {clases && clases.length > 0 ? (clases.map((clase) => (
                    <Col key={clase.id} xs={8} sm={8} md={8} lg={8}>
                        <CardClass clase={clase} onAddStudent={handleAddStudent} />
                    </Col>
                ))) : (
                    <Col span={24}>
                        <h2 className="text-lg font-semibold">No hay clases disponibles</h2>
                    </Col>
                )}
            </Row>


        </div>
    )
}


export default Clases;