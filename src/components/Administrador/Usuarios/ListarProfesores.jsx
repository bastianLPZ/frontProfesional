import React, { useEffect, useState } from 'react'
import profesoresService from '../../../services/Administrador/profesoresService';
import { Table, Button, Modal, Popconfirm } from 'antd';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import EditarProfesores from './EditarProfesores';

function ListarProfesores({ profesoresUpdated }) {
    const [profesores, setProfesores] = useState([]);
    const [error, setError] = useState('');
    const [editingProfesor, setEditingProfesor] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchProfesores();
    }, []);

    useEffect(() => {
        if (profesoresUpdated) {
            setProfesores(profesoresUpdated);
        }
    }, [profesoresUpdated]);

    const fetchProfesores = async () => {
        try {
            const response = await profesoresService.listarProfesores();
            console.log('Profesores obtenidos:', response);
            setProfesores(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los profesores: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

    const handleEdit = (id) => {
        const profesor = profesores.find(c => c.id === id);
        setEditingProfesor(profesor);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await profesoresService.eliminarProfesor(id);
            fetchProfesores(); // Actualiza la lista de canchas después de eliminar
            message.success('Profesor eliminado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el profesor: ' + (err.response?.data?.error || 'Error desconocido'));
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
        await fetchProfesores();
        setModalVisible(false);
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
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Apellido',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            key: 'direccion',
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

        <Table dataSource={profesores} columns={columns} rowKey="id"/>

        {editingProfesor && (
            <EditarProfesores
                profesor={editingProfesor}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpdate={handleUpdate}
            />
        )}
    </div>

  )
}

export default ListarProfesores