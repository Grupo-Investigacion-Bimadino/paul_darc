// src/context/GameContext.tsx (ACTUALIZADO: Inicializando GameState desde AuthContext)

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../axios';
import { useAuth, UserProfile } from './AuthContext'; // <-- IMPORTAMOS useAuth y UserProfile

// --- Interfaces ---
export interface MiniGame { id: string; name: string; icon: string; }
export interface RegionData { id: string; name: string; description: string; image: string; miniGames: MiniGame[]; }
export interface TriviaOption { text: string; isCorrect: boolean; }
export interface TriviaQuestion { id: string; questionText: string; options: TriviaOption[]; }
export interface FindObjectChallenge { id: string; backgroundImage: string; objectToFind: { name: string; area: { x: number; y: number; width: number; height: number; }; }; }
export interface ChooseSoundOption { id: string; text: string; image: string; }
export interface ChooseSoundChallenge { id: string; questionText: string; soundFile: string; options: ChooseSoundOption[]; correctOptionId: string; }

// NUEVA INTERFAZ PARA LOGROS (Exportada para ProfileModal.tsx)
export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string; 
    condition: (state: GameState) => boolean; 
}


// --- Datos de Ejemplo (Logros) ---
const achievements: Achievement[] = [
    {
        id: 'first_point',
        name: 'Primer Paso',
        description: 'Gana tus primeros 10 puntos en cualquier minijuego.',
        icon: 'FaStar',
        condition: (state: GameState) => state.playerPoints >= 10,
    },
    {
        id: 'level_2',
        name: 'Novato',
        description: 'Alcanza el Nivel 2.',
        icon: 'FaTrophy',
        condition: (state: GameState) => state.playerLevel >= 2,
    },
    {
        id: 'expert_trivia',
        name: 'Experto en Trivia',
        description: 'Completa 5 preguntas de trivia correctamente (Placeholder).',
        icon: 'FaQuestionCircle',
        condition: (state: GameState) => state.playerPoints >= 100,
    },
    // Puedes añadir más logros aquí
];

// --- Datos de Juego Local (Solo para juegos, regiones se cargan de API) ---
// Note: Hemos eliminado los datos estáticos de regionsData, triviaQuestions, findObjectGames, chooseSoundGames
// ya que se cargan dinámicamente en useEffect.


// --- Definición del Contexto ---
interface GameState {
    selectedRegionId: string | null;
    activeMiniGameId: string | null;
    playerLevel: number;
    playerPoints: number;
    isSoundOn: boolean;
    isProfileModalOpen: boolean;
    isSettingsModalOpen: boolean;
    unlockedAchievements: string[]; 
}

export interface GameContextType {
    gameState: GameState;
    selectedRegionData: RegionData | null;
    triviaQuestions: TriviaQuestion[];
    findObjectGames: { [key: string]: FindObjectChallenge };
    chooseSoundGames: { [key: string]: ChooseSoundChallenge };
    achievements: Achievement[]; 
    setSelectedRegion: (id: string | null) => void;
    toggleSound: () => void;
    openProfileModal: () => void;
    closeProfileModal: () => void;
    startMiniGame: (gameId: string) => void;
    endMiniGame: () => void;
    addPoints: (points: number) => Promise<void>;
    resetProgress: () => Promise<void>; 
    openSettingsModal: () => void;
    closeSettingsModal: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    // 1. OBTENEMOS DATOS DE AUTH
    const authContext = useAuth(); 
    const { currentUser, loading: authLoading } = authContext;
    
    // Estados de datos de juego (cargados de la API)
    const [regions, setRegions] = useState<{[key: string]: RegionData}>({});
    const [trivia, setTrivia] = useState<TriviaQuestion[]>([]);
    const [findObjectData, setFindObjectData] = useState<{[key: string]: FindObjectChallenge}>({});
    const [chooseSoundData, setChooseSoundData] = useState<{[key: string]: ChooseSoundChallenge}>({});
    
    // Estado de carga de NestJS (independiente de Firebase Auth Loading)
    const [isLoading, setIsLoading] = useState(true); 
    
    // Variables para controlar la inicialización de GameState
    const [isInitialized, setIsInitialized] = useState(false);

    // Definimos el estado inicial base
    const BASE_GAME_STATE: GameState = {
        selectedRegionId: null,
        activeMiniGameId: null,
        playerLevel: 1, 
        playerPoints: 150, 
        isSoundOn: true,
        isProfileModalOpen: false,
        isSettingsModalOpen: false,
        unlockedAchievements: [],
    };
    
    // El estado mutable del juego
    const [gameState, setGameState] = useState<GameState>(BASE_GAME_STATE);

    // 2. useEffect para INICIALIZAR GAMESTATE una vez que el usuario y la autenticación han cargado
    useEffect(() => {
        // Solo inicializamos si la autenticación ha terminado de cargar Y aún no hemos inicializado
        if (!authLoading && !isInitialized) {
            // Inicializa con los datos del usuario si existe, o con los valores base
            const initialData = {
                ...BASE_GAME_STATE,
                playerLevel: currentUser?.level || 1, 
                playerPoints: currentUser?.points || 150, 
                unlockedAchievements: currentUser?.unlockedAchievements || [], 
            };
            
            setGameState(initialData);
            setIsInitialized(true);
        }
    }, [authLoading, isInitialized, currentUser]);


    // Función auxiliar para verificar logros (usa la lista global achievements)
    const checkAchievements = (newState: GameState) => {
        let updatedAchievements = [...newState.unlockedAchievements];
        let newAchievementsUnlocked = 0;
        
        achievements.forEach(ach => {
            if (!updatedAchievements.includes(ach.id) && ach.condition(newState)) {
                updatedAchievements.push(ach.id);
                newAchievementsUnlocked++;
                console.log(`¡LOGRO DESBLOQUEADO: ${ach.name}!`);
                alert(`¡LOGRO DESBLOQUEADO: ${ach.name}!`);
            }
        });
        
        if (newAchievementsUnlocked > 0) {
            return {
                ...newState,
                unlockedAchievements: updatedAchievements,
            };
        }
        return newState;
    };


    // 3. useEffect para CARGAR DATOS DE NESTJS (se ejecuta después de inicializar el estado)
    useEffect(() => {
        // Esperar a que el estado se inicialice con datos de auth
        if (!isInitialized) return; 

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [
                    regionsResponse, 
                    triviaResponse,
                    findObjectResponse,
                    chooseSoundResponse,
                ] = await Promise.all([
                    axiosInstance.get('/regions'),
                    axiosInstance.get('/questions'), 
                    axiosInstance.get('/find-object-games'),
                    axiosInstance.get('/choose-sound-games'),
                ]);

                // Procesa las regiones
                const regionsAsObject = regionsResponse.data.reduce((acc: {[key: string]: RegionData}, region: RegionData) => {
                    acc[region.id] = region;
                    return acc;
                }, {});
                setRegions(regionsAsObject);

                // Procesa la trivia
                setTrivia(triviaResponse.data);

                // Procesa Find Object Games
                const findObjectAsObject = findObjectResponse.data.reduce((acc: {[key: string]: FindObjectChallenge}, game: FindObjectChallenge) => {
                    acc[game.id] = game;
                    return acc;
                }, {});
                setFindObjectData(findObjectAsObject);

                // Procesa Choose Sound Games
                const chooseSoundAsObject = chooseSoundResponse.data.reduce((acc: {[key: string]: ChooseSoundChallenge}, game: ChooseSoundChallenge) => {
                    acc[game.id] = game;
                    return acc;
                }, {});
                setChooseSoundData(chooseSoundAsObject);

            } catch (error) {
                console.error("Error al cargar los datos iniciales desde la API:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isInitialized]); // Se ejecuta solo cuando el estado inicial del juego ha sido establecido


    // --- FUNCIONES DEL CONTEXTO (Se quedan casi igual) ---
    const setSelectedRegion = (id: string | null) => setGameState(prevState => ({ ...prevState, selectedRegionId: id }));
    const toggleSound = () => setGameState(prevState => ({ ...prevState, isSoundOn: !prevState.isSoundOn }));
    const openProfileModal = () => setGameState(prevState => ({ ...prevState, isProfileModalOpen: true }));
    const closeProfileModal = () => setGameState(prevState => ({ ...prevState, isProfileModalOpen: false }));
    const startMiniGame = (gameId: string) => setGameState(prevState => ({ ...prevState, activeMiniGameId: gameId, selectedRegionId: null }));
    const endMiniGame = () => setGameState(prevState => ({ ...prevState, activeMiniGameId: null }));
    const openSettingsModal = () => setGameState(prevState => ({ ...prevState, isSettingsModalOpen: true }));
    const closeSettingsModal = () => setGameState(prevState => ({ ...prevState, isSettingsModalOpen: false }));
    
    
    const addPoints = async (pointsToAdd: number): Promise<void> => {
        const currentState = gameState;
        let newState = { ...currentState };
        const newPoints = currentState.playerPoints + pointsToAdd;
        const pointsNeededForNextLevel = currentState.playerLevel * 100;

        if (newPoints >= pointsNeededForNextLevel) {
            newState = {
                ...currentState,
                playerLevel: currentState.playerLevel + 1,
                playerPoints: newPoints - pointsNeededForNextLevel,
            };
            console.log(`¡NIVEL ALCANZADO! Nivel anterior: ${currentState.playerLevel}, Nivel nuevo: ${currentState.playerLevel + 1}`);
        } else {
            newState = {
                ...currentState,
                playerPoints: newPoints,
            };
        }
        
        newState = checkAchievements(newState); 

        setGameState(newState);

        try {
            await axiosInstance.post('/progress', {
                level: newState.playerLevel,
                points: newState.playerPoints,
                unlockedAchievements: newState.unlockedAchievements, // Usamos 'unlockedAchievements'
            });
            console.log('Progreso (incl. logros) guardado en el backend exitosamente.');
        } catch (error) {
            console.error('Error al guardar el progreso en el backend:', error);
            setGameState(currentState); 
            alert('Hubo un error al guardar tu progreso. Inténtalo de nuevo.');
        }
    };

    const resetProgress = async (): Promise<void> => {
        if (!window.confirm("¿Estás seguro de que quieres borrar todo tu progreso (puntos y nivel)? Esta acción es permanente.")) {
            return;
        }
        
        // El nuevo estado reseteado utiliza los valores del perfil actual para las variables Auth
        const newInitialState = {
            ...BASE_GAME_STATE,
            isSoundOn: gameState.isSoundOn,
            // Aquí no usamos currentUser, ya que el reseteo debe ser universal (Nivel 1, Puntos 150)
            // Si el backend es exitoso, el profile del frontend se actualizará en el siguiente login/re-fetch
        };

        try {
            await axiosInstance.post('/progress/reset'); 
            console.log('Progreso reseteado en el backend exitosamente.');

            setGameState(newInitialState); // Resetea el estado local
            
            closeSettingsModal();
            alert("Tu progreso ha sido borrado y reseteado a Nivel 1, 150 Puntos.");

        } catch (error) {
            console.error('Error al resetear el progreso en el backend:', error);
            alert('Hubo un error al resetear tu progreso. Verifica que tu backend esté listo.');
        }
    };
    
    // ... (selectedRegionData y value se quedan igual) ...

    const selectedRegionData = gameState.selectedRegionId && regions[gameState.selectedRegionId]
        ? regions[gameState.selectedRegionId]
        : null;

    const value: GameContextType = {
        gameState,
        selectedRegionData,
        triviaQuestions: trivia, 
        findObjectGames: findObjectData, 
        chooseSoundGames: chooseSoundData, 
        achievements, 
        setSelectedRegion,
        toggleSound,
        openProfileModal,
        closeProfileModal,
        startMiniGame,
        endMiniGame,
        addPoints,
        resetProgress, 
        openSettingsModal,
        closeSettingsModal,
    };
    
    // Mostrar cargando si Auth no ha cargado, o si NestJS data no ha cargado
    if (authLoading || !isInitialized || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <p className="text-2xl">Cargando DARC...</p>
            </div>
        );
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = (): GameContextType => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe ser usado dentro de un GameProvider');
    }
    return context;
};