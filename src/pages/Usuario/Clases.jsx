import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import CardClass from "../../components/Usuario/MisClases/CardClass";
import ClasesUsuarioService from "../../services/Usuario/usuarioClasesService";


const Clases = ()=>{
    const [clases, setClases] = useState({}); // Cambiado a objeto

    useEffect(() => {
        // Lógica para obtener las clases
        const getClases = async () => {
          try {
            const clases = await ClasesUsuarioService.getClases();
            console.log("Clases:", clases);
            setClases(clases);
          } catch (error) {
            console.error("Error al obtener las clases:", error);
          }
        };


        getClases();
    }, []);
    const handleAddStudent = (id) => {
        console.log(`Unirse a la clase con ID: ${id}`);
    }

    return(
        <div className="p-6 space-y-6">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <h1 className="text-2xl font-bold">Clases disponibles</h1>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <CardClass  clase={clases} onAddStudent={()=>{handleAddStudent}} />
                </Col>
            </Row>


        </div>
    )
}


export default Clases;