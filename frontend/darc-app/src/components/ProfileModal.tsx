// src/components/ProfileModal.tsx

import React from 'react';
// Importamos Achievement de GameContext, y UserProfile de AuthContext
import { useGame, Achievement } from '../context/GameContext'; 
import { useAuth, UserProfile } from '../context/AuthContext'; 
import { FaTimes, FaTrophy, FaSignOutAlt, FaUserPlus, FaLock, FaUnlock } from 'react-icons/fa'; 

const ProfileModal = () => {
    // Obtenemos logros de useGame (gameState)
    const { gameState, closeProfileModal, achievements } = useGame(); 
    // Obtenemos información básica de useAuth (currentUser, logout, isGuest)
    const { currentUser, logout, isGuest } = useAuth(); 

    if (!gameState.isProfileModalOpen) return null;

    const handleLogout = async () => {
        // ... (Lógica de logout sin cambios) ...
    };
    
    // Función para renderizar logros
    // Acepta la lista de IDs desbloqueados directamente del gameState
    const renderAchievements = (unlockedIds: string[], allAchievements: Achievement[]) => {
        return (
            <div className="mt-6">
                <h3 className="font-bold text-xl mb-2 text-yellow-300">
                    Logros Desbloqueados ({unlockedIds.length} / {allAchievements.length})
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {allAchievements.map(ach => {
                        const isUnlocked = unlockedIds.includes(ach.id); // <-- Aquí usamos el ID
                        const IconComponent = isUnlocked ? FaUnlock : FaLock;
                        
                        return (
                            <div key={ach.id} className={`flex items-start gap-3 p-3 rounded-lg transition ${
                                isUnlocked ? 'bg-yellow-800 border border-yellow-400' : 'bg-gray-700 opacity-60'
                            }`}>
                                <IconComponent size={24} className={isUnlocked ? 'text-yellow-400' : 'text-gray-500'} />
                                <div>
                                    <p className="font-bold">{ach.name}</p>
                                    <p className="text-sm text-gray-300">{ach.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };
    
    // Renderizado principal
    return (
        <div 
            // AÑADIDO: Transición para que el fondo se desvanezca
            className="fixed inset-0 bg-black bg-opacity-70 z-40 flex justify-center items-center transition-opacity duration-300" 
            onClick={closeProfileModal}
        >
            <div 
                className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white border-4 border-yellow-400"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={closeProfileModal} 
                    className="absolute top-4 right-4 text-white hover:text-yellow-300 transition"
                >
                    <FaTimes size={24} />
                </button>

                {currentUser && isGuest ? (
                    // Vista para el usuario INVITADO
                    <div className="flex flex-col items-center text-center">
                        <img 
                            src={'/icons/avatar.png'} 
                            alt="Avatar de invitado" 
                            className="w-24 h-24 rounded-full border-4 border-white mb-4" 
                        />
                        <h2 className="text-3xl font-bold mb-2">Eres un Invitado</h2>
                        <p className="text-gray-300 mb-6">Tu progreso no se guardará. ¡Crea una cuenta para guardar tus logros!</p>

                        {/* LISTA DE LOGROS (para invitado, usa el estado del juego) */}
                        {renderAchievements(gameState.unlockedAchievements, achievements)} 

                        <button className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition mt-4">
                            <FaUserPlus /> Crear Cuenta
                        </button>
                        
                        <button 
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full mt-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg"
                        >
                            <FaSignOutAlt /> Salir
                        </button>
                    </div>
                ) : currentUser ? (
                    // Vista para el usuario REGISTRADO
                    <div className="flex flex-col items-center">
                        <img 
                            src={currentUser.photoURL || '/icons/avatar.png'} 
                            alt="Avatar del jugador" 
                            className="w-24 h-24 rounded-full border-4 border-white mb-4 object-cover" 
                        />
                        <h2 className="text-3xl font-bold mb-1">{currentUser.displayName || 'Jugador Anónimo'}</h2>
                        <p className="text-sm text-gray-300 mb-4">{currentUser.email}</p>

                        <div className="w-full bg-black/20 p-4 rounded-lg flex justify-around text-center">
                            {/* ... (Nivel y Puntos sin cambios) ... */}
                            <div><p className="text-sm text-gray-300">Nivel</p><p className="text-2xl font-bold text-yellow-300">{gameState.playerLevel}</p></div>
                            <div><p className="text-sm text-gray-300">Puntos</p><p className="text-2xl font-bold text-yellow-300">{gameState.playerPoints}</p></div>
                            <div>
                                <p className="text-sm text-gray-300">Logros</p>
                                <p className="text-2xl font-bold text-yellow-300 flex items-center gap-1 justify-center">
                                    <FaTrophy /> {gameState.unlockedAchievements.length}
                                </p>
                            </div>
                        </div>

                        {/* Barra de progreso */}
                        <div className="mt-6 text-center w-full">
                            <h3 className="font-bold text-xl mb-2">Progreso General</h3>
                            <div className="w-full bg-gray-700 rounded-full h-4">
                                <div className="bg-green-500 h-4 rounded-full" style={{width: `${Math.floor((gameState.playerPoints / (gameState.playerLevel * 100)) * 100)}%`}}></div>
                            </div>
                            <p className="text-sm mt-1">{Math.floor((gameState.playerPoints / (gameState.playerLevel * 100)) * 100)}% completado</p>
                        </div>
                        
                        {/* LISTA DE LOGROS */}
                        {renderAchievements(gameState.unlockedAchievements, achievements)} 

                        {/* Botón para Salir/Logout */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full mt-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition"
                        >
                            <FaSignOutAlt /> Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    // Si no hay usuario ni es invitado
                    <p className="text-center text-xl">Inicia sesión para ver tu perfil.</p>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;