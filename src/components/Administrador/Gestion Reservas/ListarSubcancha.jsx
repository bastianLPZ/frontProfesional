import React, { useState, useEffect }from "react";
import subcanchasService from "../../../services/Administrador/subcanchasService";
import { Table, Button, Popconfirm, message } from "antd";
import { PencilSquareIcon, TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import EditarSubcancha from "./EditarSubcancha";

const ListarSubcancha = ({ subcanchasUpdated }) => {
    const [subcanchas, setSubanchas] = useState([]);
    const [error, setError] = useState('');
    const [editingSubcancha, setEditingSubcancha] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchSubCanchas();
    }, []);

    useEffect(() => {
        if (subcanchasUpdated) {
            setSubanchas(subcanchasUpdated); // Actualiza la lista de canchas cuando canchasUpdated cambie
        }
    }, [subcanchasUpdated]);

    const fetchSubCanchas = async () => {
        try {
            const response = await subcanchasService.listarSubcanchas();
            console.log('SubCanchas obtenidas:', response);
            setSubanchas(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar las sub-canchas: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    const handleEdit = (id) => {
        const subcancha = subcanchas.find(c => c.id === id);
        console.log('Editando subcancha:', subcancha);
        setEditingSubcancha(subcancha);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await subcanchasService.eliminarSubcancha(id);
            fetchSubCanchas(); // Actualiza la lista de canchas después de eliminar
            message.success('Subcancha eliminada exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar la subCancha: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    const handleDeleteConfirm = (id) => {
        return new Promise((resolve) => {
            setTimeout(async () => {
                await handleDelete(id);
                resolve(null);
            }, 3000); // Simula el tiempo de espera
        });
    };

    const handleUpdate = async () => {
        await fetchSubCanchas(); // Actualiza la lista de canchas
    };

    const buttonStyle = {
        backgroundColor: '#35682d', // bg-primary
        color: 'white', // text-white
        padding: '8px 16px', // px-6 py-1
        borderRadius: '8px', // rounded-md
        margin: '0 8px', // mx-2
        cursor: 'pointer',
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Largo',
            dataIndex: 'largo',
            key: 'largo',
        },
        {
            title: 'Ancho',
            dataIndex: 'ancho',
            key: 'ancho',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <span>
                    <button
                        className="bg-primary text-white px-6 py-1 rounded-md hover:bg-secondary mx-2"
                        onClick={() => handleEdit(record.id)}
                    >
                        <PencilSquareIcon className="h-5 w-5 text-white inline-block mr-1" />
                        Editar
                    </button>

                    <Popconfirm
                        icon={<QuestionMarkCircleIcon className="h-5 w-5 text-primary" />}
                        title="¿Estás seguro de que deseas eliminar esta cancha?"
                        onConfirm={() => handleDeleteConfirm(record.id)}
                        okText="Sí"
                        cancelText="No"
                        okButtonProps={{ style: buttonStyle }}
                        cancelButtonProps={{ style: buttonStyle }}
                    >
                        <button className="bg-primary text-white px-6 py-1 rounded-md hover:bg-secondary mx-2">
                            <TrashIcon className="h-5 w-5 text-white inline-block mr-1" />
                            Eliminar
                        </button>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Table dataSource={subcanchas} columns={columns} rowKey="id" />

        {editingSubcancha && (
            console.log('Editando subcancha:', editingSubcancha),
                <EditarSubcancha 
                    subcancha={editingSubcancha} 
                    visible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                    onUpdate={handleUpdate} // Pasa la función para actualizar las canchas
                />
            )}
        </div>
    );
};


export default ListarSubcancha;