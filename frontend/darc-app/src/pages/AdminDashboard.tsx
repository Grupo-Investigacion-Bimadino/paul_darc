// src/pages/AdminDashboard.tsx

import React, { useState } from 'react';
import { FaUserCog, FaGlobeAmericas, FaFileAlt } from 'react-icons/fa';
import { IconType } from 'react-icons'; 
import RegionManagement from '@components/RegionManagement'; 
import UserManagement from '@components/UserManagement'; // <-- IMPORTADO

const AdminDashboard = () => {
    // Estado para controlar la pestaña activa: 'regions', 'users', 'trivia'
    const [activeTab, setActiveTab] = useState('regions'); 

    // Interfaz para las props de los botones de Tab
    interface TabButtonProps {
        id: string;
        icon: IconType; 
        label: string;
    }

    // Componente auxiliar para las pestañas
    const TabButton: React.FC<TabButtonProps> = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 py-2 px-4 font-semibold transition-colors ${
                activeTab === id 
                ? 'text-cyan-400 border-b-2 border-cyan-400' 
                : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500'
            }`}
        >
            <Icon size={20} className="" /> {label} 
        </button>
    );

    return (
        <div className="w-full h-screen bg-gray-900 text-white p-8 overflow-y-auto">
            <h1 className="text-4xl font-bold mb-8 text-cyan-400">🛠️ Panel de Administración DARC</h1>
            
            {/* Navegación por Pestañas */}
            <div className="border-b border-gray-700 flex space-x-6">
                <TabButton id="regions" icon={FaGlobeAmericas} label="Regiones" />
                <TabButton id="trivia" icon={FaFileAlt} label="Trivia" />
                <TabButton id="users" icon={FaUserCog} label="Usuarios" />
            </div>

            {/* Contenido de la Pestaña Activa */}
            <div className="mt-6 p-6 bg-gray-800 rounded-b-lg rounded-r-lg min-h-[70vh] shadow-xl">
                {activeTab === 'regions' && <RegionManagement />}
                {activeTab === 'users' && <UserManagement />} {/* <-- CONECTADO */}
                
                {activeTab === 'trivia' && (
                    <div className="text-gray-400">
                        Gestión de Preguntas de Trivia (Próximamente CRUD).
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;