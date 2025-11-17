// src/context/GameContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../axios';

// --- Interfaces ---
export interface MiniGame { id: string; name: string; icon: string; }
export interface RegionData { id: string; name: string; description: string; image: string; miniGames: MiniGame[]; }
export interface TriviaOption { text: string; isCorrect: boolean; }
export interface TriviaQuestion { id: string; questionText: string; options: TriviaOption[]; }
export interface FindObjectChallenge { id: string; backgroundImage: string; objectToFind: { name: string; area: { x: number; y: number; width: number; height: number; }; }; }
export interface ChooseSoundOption { id: string; text: string; image: string; }
export interface ChooseSoundChallenge { id: string; questionText: string; soundFile: string; options: ChooseSoundOption[]; correctOptionId: string; }


// --- Datos de Ejemplo (ELIMINAMOS TODOS LOS DATOS DE EJEMPLO) ---
// const triviaQuestions: TriviaQuestion[] = [ /* ... */ ];
// const findObjectGames: { [key: string]: FindObjectChallenge } = { /* ... */ };
// const chooseSoundGames: { [key: string]: ChooseSoundChallenge } = { /* ... */ };


// --- Definición del Contexto ---
interface GameState {
    selectedRegionId: string | null;
    activeMiniGameId: string | null;
    playerLevel: number;
    playerPoints: number;
    isSoundOn: boolean;
    isProfileModalOpen: boolean;
    isSettingsModalOpen: boolean;
}

export interface GameContextType {
    gameState: GameState;
    selectedRegionData: RegionData | null;
    triviaQuestions: TriviaQuestion[];
    findObjectGames: { [key: string]: FindObjectChallenge };
    chooseSoundGames: { [key: string]: ChooseSoundChallenge };
    setSelectedRegion: (id: string | null) => void;
    toggleSound: () => void;
    openProfileModal: () => void;
    closeProfileModal: () => void;
    startMiniGame: (gameId: string) => void;
    endMiniGame: () => void;
    addPoints: (points: number) => Promise<void>;
    openSettingsModal: () => void;
    closeSettingsModal: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [regions, setRegions] = useState<{[key: string]: RegionData}>({});
    const [trivia, setTrivia] = useState<TriviaQuestion[]>([]);
    
    // 1. AÑADIMOS NUEVOS ESTADOS para los juegos restantes
    const [findObjectData, setFindObjectData] = useState<{[key: string]: FindObjectChallenge}>({});
    const [chooseSoundData, setChooseSoundData] = useState<{[key: string]: ChooseSoundChallenge}>({});
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [gameState, setGameState] = useState<GameState>({
        selectedRegionId: null,
        activeMiniGameId: null,
        playerLevel: 1,
        playerPoints: 150,
        isSoundOn: true,
        isProfileModalOpen: false,
        isSettingsModalOpen: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // 2. AÑADIMOS las nuevas llamadas a la API a Promise.all
                const [
                    regionsResponse, 
                    triviaResponse,
                    findObjectResponse,
                    chooseSoundResponse,
                ] = await Promise.all([
                    axiosInstance.get('/regions'),
                    axiosInstance.get('/questions'), 
                    axiosInstance.get('/find-object-games'), // Nuevo endpoint
                    axiosInstance.get('/choose-sound-games'), // Nuevo endpoint
                ]);

                // Procesa las regiones
                const regionsAsObject = regionsResponse.data.reduce((acc: {[key: string]: RegionData}, region: RegionData) => {
                    acc[region.id] = region;
                    return acc;
                }, {});
                setRegions(regionsAsObject);

                // Procesa la trivia
                setTrivia(triviaResponse.data);

                // 3. PROCESAMOS Y GUARDAMOS los datos de los nuevos juegos
                const findObjectAsObject = findObjectResponse.data.reduce((acc: {[key: string]: FindObjectChallenge}, game: FindObjectChallenge) => {
                    acc[game.id] = game;
                    return acc;
                }, {});
                setFindObjectData(findObjectAsObject);

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
    }, []);

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

        setGameState(newState);

        try {
            await axiosInstance.post('/progress', {
                level: newState.playerLevel,
                points: newState.playerPoints,
            });
            console.log('Progreso guardado en el backend exitosamente.');
        } catch (error) {
            console.error('Error al guardar el progreso en el backend:', error);
            setGameState(currentState); 
            alert('Hubo un error al guardar tu progreso. Inténtalo de nuevo.');
        }
    };
    
    const selectedRegionData = gameState.selectedRegionId && regions[gameState.selectedRegionId]
        ? regions[gameState.selectedRegionId]
        : null;

    // 4. MODIFICAMOS el 'value' para que pase los estados dinámicos
    const value: GameContextType = {
        gameState,
        selectedRegionData,
        triviaQuestions: trivia, // AHORA USA EL ESTADO DINÁMICO
        findObjectGames: findObjectData, // AHORA USA EL ESTADO DINÁMICO
        chooseSoundGames: chooseSoundData, // AHORA USA EL ESTADO DINÁMICO
        setSelectedRegion,
        toggleSound,
        openProfileModal,
        closeProfileModal,
        startMiniGame,
        endMiniGame,
        addPoints,
        openSettingsModal,
        closeSettingsModal,
    };

    if (isLoading) {
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