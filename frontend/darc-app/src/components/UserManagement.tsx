// src/components/Admin/UserManagement.tsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '@axios';
import { FaUserEdit, FaTrash, FaSpinner, FaSearch, FaUserTag } from 'react-icons/fa';
import { UserProfile } from '@context/AuthContext'; // Reutilizamos UserProfile

// Definimos la interfaz que esperamos del backend de administración
interface AdminUser extends UserProfile {
    isAnonymous: boolean;
    createdAt: string;
    lastSignInTime: string;
}

const ROLES = ['Administrador', 'Docente', 'Alumno', 'Invitado'];

const UserManagement = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/users');
            // La respuesta debe ser un array de AdminUser
            setUsers(response.data); 
        } catch (err) {
            console.error('Error al cargar usuarios:', err);
            setError('Error al cargar la lista de usuarios. ¿Tiene el rol de Administrador?');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChangeRole = async (uid: string, newRole: string) => {
        if (!window.confirm(`¿Estás seguro de cambiar el rol de ${uid} a ${newRole}?`)) {
            return;
        }

        try {
            // Llama al endpoint de NestJS para actualizar el rol
            await axiosInstance.patch(`/users/${uid}/role`, { role: newRole });
            
            // Actualizar el estado local
            setUsers(prevUsers => 
                prevUsers.map(user => 
                    user.uid === uid ? { ...user, role: newRole } : user
                )
            );
            alert('Rol actualizado exitosamente.');
        } catch (error) {
            console.error('Error al cambiar el rol:', error);
            alert('Error al actualizar el rol.');
        }
    };

    const handleDeleteUser = async (uid: string, email: string | null) => {
        if (!window.confirm(`ADVERTENCIA: ¿Estás seguro de ELIMINAR permanentemente al usuario ${email} (${uid})?`)) {
            return;
        }
        
        try {
            // Llama al endpoint de NestJS para eliminar el usuario y su progreso
            await axiosInstance.delete(`/users/${uid}`);
            
            // Actualizar el estado local
            setUsers(prevUsers => prevUsers.filter(user => user.uid !== uid));
            alert('Usuario eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            alert('Error al eliminar el usuario.');
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full text-cyan-400"><FaSpinner className="animate-spin mr-2" size={30} /> Cargando Usuarios...</div>;
    }

    if (error) {
        return <div className="text-red-500 p-4 border border-red-500 rounded">{error}</div>;
    }
    
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Gestión de Usuarios ({users.length})</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">UID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Último Login</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <tr key={user.uid} className="hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">{user.uid.substring(0, 8)}...</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.email || user.displayName || 'Invitado Anónimo'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleChangeRole(user.uid, e.target.value)}
                                        className={`bg-gray-600 text-white rounded p-1 text-sm ${user.role === 'Administrador' ? 'text-red-400' : ''}`}
                                    >
                                        {ROLES.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.isAnonymous ? 'Invitado' : 'Registrado'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(user.lastSignInTime).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button onClick={() => handleDeleteUser(user.uid, user.email)} className="text-red-500 hover:text-red-300 ml-3">
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

export default UserManagement;