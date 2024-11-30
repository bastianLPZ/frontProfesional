import React, { useEffect, useState } from 'react'
import usuariosService from '../../../services/Administrador/usuariosService';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Table, Button, Popconfirm, message } from 'antd';
import EditarUsuario from './EditarUsuarios';

function ListarUsuarios({ usuariosUpdated }) {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [editingUsuario, setEditingUsuario] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    useEffect(() => {
        if (usuariosUpdated) {
            setUsuarios(usuariosUpdated); 
        }
    }, [usuariosUpdated]);

    const fetchUsuarios = async () => {
        try {
            const response = await usuariosService.ListarUsuarios();
            console.log('Usuarios obtenidos:', response);
            setUsuarios(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los usuarios: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

    const handleEdit = (id) => {
        const usuario = usuarios.find(c => c.id === id);
        setEditingUsuario(usuario);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await usuariosService.eliminarUsuario(id);
            fetchUsuarios(); // Actualiza la lista de canchas después de eliminar
            message.success('Usuario eliminado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el usuario: ' + (err.response?.data?.error || 'Error desconocido'));
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
        await fetchUsuarios(); 
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

        <Table dataSource={usuarios} columns={columns} rowKey="id" />

        {editingUsuario && (
            <EditarUsuario
                usuario={editingUsuario}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onUpdate={handleUpdate}
            />
        )}
    </div>
  )
}

export default ListarUsuarios