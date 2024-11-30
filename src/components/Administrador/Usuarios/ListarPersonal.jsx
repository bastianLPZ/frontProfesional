import React, { useEffect, useState } from 'react';
import personalService from '../../../services/Administrador/personalService';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Table, Button, Popconfirm, message } from 'antd';
import EditarPersonal from './EditarPersonal';

function ListarUsuarios({ reload }) {
    const [personal, setPersonal] = useState([]);
    const [error, setError] = useState('');
    const [editingPersonal, setEditingPersonal] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchPersonal();
    }, []);

    // Detecta cambios en la prop `reload` para actualizar automáticamente.
    useEffect(() => {
        if (reload) {
            fetchPersonal();
        }
    }, [reload]);

    const handleUpdate = async () => {
        await fetchPersonal(); // Vuelve a cargar la lista
    };

    const fetchPersonal = async () => {
        try {
            const response = await personalService.listarPersonal();
            console.log('Personal obtenidos:', response);
            setPersonal(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar el personal: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    };

    const handleEdit = (id) => {
        const personals = personal.find(c => c.id === id);
        setEditingPersonal(personals);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await personalService.eliminarPersonal(id);
            fetchPersonal(); // Actualiza la lista de canchas después de eliminar
            message.success('Personal eliminado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el personal: ' + (err.response?.data?.error || 'Error desconocido'));
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
                        title="¿Estás seguro de que deseas eliminar este usuario?"
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

            <Table dataSource={personal} columns={columns} rowKey="id" />

            {editingPersonal && (
                <EditarPersonal
                    personal={editingPersonal}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default ListarUsuarios;