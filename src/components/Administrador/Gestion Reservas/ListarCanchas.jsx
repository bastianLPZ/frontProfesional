import React, { useEffect, useState } from "react";
import canchaService from '../../../services/Administrador/canchasService'; // Asegúrate de que la ruta sea correcta
import { Table, Button, Popconfirm, message } from 'antd';
import { PencilSquareIcon, TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import EditarCancha from "./EditarCancha";

const ListarCanchas = ({ canchasUpdated }) => {
    const [canchas, setCanchas] = useState([]);
    const [error, setError] = useState('');
    const [editingCancha, setEditingCancha] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchCanchas();
    }, []);

    useEffect(() => {
        if (canchasUpdated) {
            setCanchas(canchasUpdated); // Actualiza la lista de canchas cuando canchasUpdated cambie
        }
    }, [canchasUpdated]);

    const fetchCanchas = async () => {
        try {
            const response = await canchaService.listarCanchas();
            console.log('Canchas obtenidas:', response);
            setCanchas(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar las canchas: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    const handleEdit = (id) => {
        const cancha = canchas.find(c => c.id === id);
        setEditingCancha(cancha);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await canchaService.eliminarCancha(id);
            fetchCanchas(); // Actualiza la lista de canchas después de eliminar
            message.success('Cancha eliminada exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar la cancha: ' + (err.response?.data?.error || 'Error desconocido'));
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
        await fetchCanchas(); // Actualiza la lista de canchas
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
            title: 'Capacidad máxima Subcanchas',
            dataIndex: 'capacidad_subcanchas',
            key: 'capacidad_subcanchas',
            render: (text) => text || 'N/A',
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
            <Table dataSource={canchas} columns={columns} rowKey="id" />

            {editingCancha && (
                <EditarCancha 
                    cancha={editingCancha} 
                    visible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                    onUpdate={handleUpdate} // Pasa la función para actualizar las canchas
                />
            )}
        </div>
    );
};

export default ListarCanchas;