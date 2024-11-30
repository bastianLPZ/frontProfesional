import React, { useEffect, useState } from 'react'
import clasesService from '../../../services/Administrador/clasesService';
import { Table, Button, Modal, Popconfirm, message } from 'antd';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import EditarClase from './EditarClase';
import VerAlumnos from './VerAlumnos';
import { render } from '@react-three/fiber';

function ListarClases({ clasesUpdated }) {
    const [clases, setClases] = useState([]);
    const [error, setError] = useState('');
    const [editingClase, setEditingClase] = useState(null);
    const [viewStudent, setviewStudent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalStudent, setModalStudent] = useState(false);

    useEffect(() => {
        fetchClases();
    }, []);

    useEffect(() => {
        if (clasesUpdated) {
            setClases(clasesUpdated);
        }
    }, [clasesUpdated]);

    const fetchClases = async () => {
        try {
            const response = await clasesService.listarClases();
            console.log('Clases obtenidas:', response);
            setClases(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar las clases: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

    const handleEdit = (id) => {
        const clase = clases.find(c => c.id === id);
        setEditingClase(clase);
        setModalVisible(true);
    };

    const handleViewStudent = (id) => {
        const clase = clases.find(c => c.id === id);
        setviewStudent(clase);
        setModalStudent(true);
    };

    const handleDelete = async (id) => {
        try {
            await clasesService.eliminarClase(id);
            fetchClases(); // Actualiza la lista de canchas después de eliminar
            message.success('Clase eliminada exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar la clase: ' + (err.response?.data?.error || 'Error desconocido'));
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
        try {
            await fetchClases();
            setModalVisible(false);
        } catch (err) {
            console.error(err);
            setError('Error al actualizar las clases: ' + (err.response?.data?.error || 'Error desconocido'));
        }
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
            title: 'Profesor',
            dataIndex: 'clase_profesor__first_name', // Puedes usar cualquiera de las dos propiedades aquí solo para tener un key válido.
            key: 'profesor_nombre_completo',
            render: (text, record) => `${record.clase_profesor__first_name || ''} ${record.clase_profesor__last_name || ''}`,
        },
        {
            title: 'Nombre Clase',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Cupos Disponibles',
            dataIndex: 'cupo_total',
            key: 'cupos',
            render: (text, record) => `${record.cupo_disponible} / ${record.cupo_total}`,
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <span>
                    <button
                        className="bg-primary text-white px-6 py-1 rounded-md hover:bg-secondary mx-2"
                        onClick={() => handleViewStudent(record.id)}
                    >
                        <UserGroupIcon className="h-5 w-5 text-white inline-block mr-1" />
                        Alumnos
                    </button>

                    <button
                        className="bg-primary text-white px-6 py-1 rounded-md hover:bg-secondary mx-2"
                        onClick={() => handleEdit(record.id)}
                    >
                        <PencilSquareIcon className="h-5 w-5 text-white inline-block mr-1" />
                        Editar
                    </button>

                    <Popconfirm
                        icon={<QuestionMarkCircleIcon className="h-5 w-5 text-primary" />}
                        title="¿Estás seguro de que deseas eliminar este equipamiento?"
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
            {error && <div className="alert alert-danger">{error}</div>}

            <Table dataSource={clases} columns={columns} rowKey="id" />

            {editingClase && (
                <EditarClase
                    clase={editingClase}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onUpdate={handleUpdate}
                />
            )}

            {viewStudent && (
                <VerAlumnos
                clase={{viewStudent}}
                visible={modalStudent}
                onClose={() => setModalStudent(false)}
                onUpdate={handleUpdate}
                />
            )}

        </div>
    )
}

export default ListarClases