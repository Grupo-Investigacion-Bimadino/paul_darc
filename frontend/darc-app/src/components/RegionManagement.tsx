// src/components/Admin/RegionManagement.tsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '@axios'; 
import { FaEdit, FaTrash, FaPlus, FaSpinner } from 'react-icons/fa';
// La interfaz RegionData se exporta desde GameContext, usamos alias
import { RegionData } from '@context/GameContext'; 

const RegionManagement = () => {
    const [regions, setRegions] = useState<RegionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar los datos de las regiones desde la API de NestJS
    const fetchRegions = async () => {
        setLoading(true);
        setError(null);
        try {
            // Llama al endpoint GET /regions
            const response = await axiosInstance.get('/regions');
            setRegions(response.data); 
        } catch (err) {
            console.error('Error al cargar regiones:', err);
            setError('Error al cargar las regiones. ¿Está el backend corriendo y el token es válido?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRegions();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-cyan-400">
                <FaSpinner className="animate-spin mr-2" size={30} /> Cargando Regiones...
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 p-4 border border-red-500 rounded">{error}</div>;
    }


    // Handlers para CRUD (por ahora solo placeholders)
    const handleAddRegion = () => {
        alert('Abrir Modal para Añadir Región');
    };

    const handleEditRegion = (id: string) => {
        alert(`Editar Región: ${id}`);
    };

    const handleDeleteRegion = (id: string) => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar la región ${id}?`)) {
            alert(`Eliminar Región: ${id} (Implementar DELETE API)`);
        }
    };


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold">Gestión de Regiones</h2>
                <button 
                    onClick={handleAddRegion}
                    className="flex items-center gap-2 py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition"
                >
                    <FaPlus /> Añadir Región
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID DANE</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Minijuegos</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {regions.map((region) => (
                            <tr key={region.id} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-cyan-300">{region.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{region.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{region.miniGames.length}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button onClick={() => handleEditRegion(region.id)} className="text-yellow-500 hover:text-yellow-300 mr-3">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDeleteRegion(region.id)} className="text-red-500 hover:text-red-300">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegionManagement;