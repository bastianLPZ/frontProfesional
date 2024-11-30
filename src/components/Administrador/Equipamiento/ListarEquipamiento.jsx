import React, { useEffect, useState } from 'react'
import equipamientoService from '../../../services/Administrador/equipamientoService'; 
import EditarEquipamiento from './EditarEquipamiento';
import { Table, Button, Popconfirm, message } from 'antd';
import { PencilSquareIcon, QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline';


function ListarEquipamiento({ equipamientosUpdated }) {
    const [equipamientos, setEquipamientos] = useState([]);
    const [error, setError] = useState('');
    const [editingEquipamiento, setEditingEquipamiento] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchEquipamientos();
    }, []);

    useEffect(() => {
        if (equipamientosUpdated) {
            setEquipamientos(equipamientosUpdated); 
        }
    }, [equipamientosUpdated]);

    const fetchEquipamientos = async () => {
        try {
            const response = await equipamientoService.listarEquipamiento();
            console.log('Equipamientos obtenidos:', response);
            setEquipamientos(response);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los equipamientos: ' + (err.response?.data?.error || 'Error desconocido'));
        }
    }

    const handleEdit = (id) => {
        const equipamiento = equipamientos.find(c => c.id === id);
        setEditingEquipamiento(equipamiento);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await equipamientoService.eliminarEquipamiento(id);
            fetchEquipamientos(); // Actualiza la lista de canchas después de eliminar
            message.success('Equipamiento eliminado exitosamente');
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el equipamiento: ' + (err.response?.data?.error || 'Error desconocido'));
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
        await fetchEquipamientos(); 
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
            title: 'Cantidad',
            dataIndex: 'cantidad_disponible',
            key: 'cantidad_disponible',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Cantidad Total',
            dataIndex: 'cantidad_total',
            key: 'cantidad_total',
            render: (text) => text || 'N/A',
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
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <Table dataSource={equipamientos} columns={columns} rowKey="id" />

    {editingEquipamiento && (
        <EditarEquipamiento 
            equipamiento={editingEquipamiento} 
            visible={modalVisible} 
            onClose={() => setModalVisible(false)} 
            onUpdate={handleUpdate} // Pasa la función para actualizar las canchas
        />
    )} 
</div>

  )
}

export default ListarEquipamiento