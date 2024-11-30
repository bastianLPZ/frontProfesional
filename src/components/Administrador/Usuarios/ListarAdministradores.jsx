import React, { useEffect, useState } from 'react'
import administradoresService from '../../../services/Administrador/administradoresService';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Table, Button, Popconfirm, message } from 'antd';
import EditarAdministrador from './EditarAdministrador';

function ListarAdministradores({ administradoresUpdated }) {
    const [administradores, setAdministradores] = useState([]);
    const [error, setError] = useState('');
    const [editingAdministrador, setEditingAdministrador] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchAdministradores();
    }, []);

    useEffect(() => {
        if (administradoresUpdated) {
            setAdministradores(administradoresUpdated); 
        }
    }, [administradoresUpdated]);

    const fetchAdministradores = async () => {
        try {
            const response = await administradoresService.listarAdministradores();
            console.log('Administradores obtenidos:', response);
            setAdministradores(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los administradores: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

    const handleEdit = (id) => {
        const administrador = administradores.find(c => c.id === id);
        setEditingAdministrador(administrador);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await administradoresService.eliminarAdministrador(id);
            fetchAdministradores(); // Actualiza la lista de canchas después de eliminar
            message.success('Administrador eliminado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el administrador: ' + (err.response?.data?.error || 'Error desconocido'));
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
        await fetchAdministradores(); 
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
        {error && <div className="text-red-500">{error}</div>}

    <Table dataSource={administradores} columns={columns} rowKey="id" />

    {editingAdministrador && (
        <EditarAdministrador
            administrador={editingAdministrador}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onUpdate={handleUpdate}
        />
    )}
    </div>
  )
}

export default ListarAdministradores