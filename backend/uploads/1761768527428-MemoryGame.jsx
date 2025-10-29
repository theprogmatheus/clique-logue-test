import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Shuffle, CheckCircle, XCircle, Clock, Award, RotateCw, Home, Zap, 
  Brain, Heart, Wind, Bone, Activity, Droplet, Microscope, Anchor, Beef, Feather 
} from 'lucide-react';

// Dados das peças de anatomia - AGORA COM REPRESENTAÇÕES VISUAIS (ÍCONES SVG MOCADOS)
const ANATOMY_PAIRS = [
  // Ícones do Lucide-React são usados para simular os assets de imagem.
  // Substitua o 'imageContent' pelos seus próprios assets de imagem (<img>) quando for usar o jogo final.
  { key: 'A', name: 'Cérebro', imageContent: <Brain className="w-16 h-16 text-indigo-700" /> },
  { key: 'B', name: 'Coração', imageContent: <Heart className="w-16 h-16 text-red-600" fill="red" /> },
  { key: 'C', name: 'Pulmão', imageContent: <Wind className="w-16 h-16 text-blue-600" /> }, 
  { key: 'D', name: 'Fígado', imageContent: <Anchor className="w-16 h-16 text-green-700" /> }, 
  { key: 'E', name: 'Rim', imageContent: <Droplet className="w-16 h-16 text-indigo-700" /> }, 
  { key: 'F', name: 'Estômago', imageContent: <Microscope className="w-16 h-16 text-yellow-700" /> }, 
  { key: 'G', name: 'Osso', imageContent: <Bone className="w-16 h-16 text-gray-700" /> },
  { key: 'H', name: 'Músculo', imageContent: <Beef className="w-16 h-16 text-red-700" /> }, 
  { key: 'I', name: 'Nervo', imageContent: <Zap className="w-16 h-16 text-yellow-500" /> },
  { key: 'J', name: 'Veia', imageContent: <Droplet className="w-16 h-16 text-blue-500" /> }, 
  { key: 'K', name: 'Artéria', imageContent: <Activity className="w-16 h-16 text-red-500" /> }, 
  { key: 'L', name: 'Pele', imageContent: <Feather className="w-16 h-16 text-yellow-900" /> }, 
];

// Configurações dos níveis
const LEVEL_CONFIGS = [
  { level: 1, pairs: 2, limit: 30, cardsPerLevel: 4 }, // 4 cartas (2 pares)
  { level: 2, pairs: 4, limit: 60, cardsPerLevel: 8 }, // 8 cartas (4 pares)
  { level: 3, pairs: 6, limit: 90, cardsPerLevel: 12 }, // 12 cartas (6 pares)
  { level: 4, pairs: 8, limit: 120, cardsPerLevel: 16 }, // 16 cartas (8 pares)
  { level: 5, pairs: 12, limit: 180, cardsPerLevel: 24 }, // 24 cartas (12 pares)
];

const GameStatus = {
  Start: 'start',
  Playing: 'playing',
  Win: 'win',
  Loss: 'loss',
  FinalWin: 'finalWin',
};

// --- Funções Auxiliares ---

/**
 * Embaralha um array.
 * @param {Array} array
 * @returns {Array} Array embaralhado
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Cria o array de cartas para o nível atual.
 * @param {number} levelIndex
 * @returns {Array} Array de cartas
 */
const createCards = (levelIndex) => {
  const config = LEVEL_CONFIGS[levelIndex];
  if (!config) return [];

  const selectedPairs = ANATOMY_PAIRS.slice(0, config.pairs);
  let cards = [];
  let idCounter = 1;

  selectedPairs.forEach(pair => {
    // Cartão 1: Imagem (simulada por ícone SVG)
    cards.push({
      id: idCounter++,
      pieceKey: pair.key,
      content: pair.imageContent, // Agora é um componente JSX/SVG
      type: 'image',
      isFlipped: false,
      isMatched: false,
    });
    // Cartão 2: Nome (Texto)
    cards.push({
      id: idCounter++,
      pieceKey: pair.key,
      content: pair.name,
      type: 'name',
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleArray(cards);
};

// --- Componente Card (Cartão) ---

const Card = ({ card, onClick, isFlippingDisabled }) => {
  const isFlipped = card.isFlipped || card.isMatched;

  // 1. Define o conteúdo baseado no tipo e estado
  let content;
  let backFaceClass = '';

  if (card.isMatched) {
    backFaceClass = 'bg-green-500 text-white shadow-green-700/50';
    content = (
      <div className="flex flex-col items-center">
        <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white mb-1" />
        <span className="text-xs md:text-sm">Encontrado!</span>
      </div>
    );
  } else {
    backFaceClass = 'bg-yellow-400 text-gray-800 shadow-yellow-600/50';
    if (card.type === 'image') {
      content = <div className="flex items-center justify-center w-full h-full text-gray-800">{card.content}</div>;
    } else {
      content = <span className="text-lg md:text-2xl font-extrabold p-1 text-gray-800">{card.content}</span>;
    }
  }

  // 2. Componente de Carta
  return (
    <div
      className="perspective-1000 min-h-[120px] md:min-h-[140px] h-full"
      onClick={() => !isFlippingDisabled && !isFlipped && onClick(card.id)}
      style={{
        pointerEvents: isFlippingDisabled || isFlipped ? 'none' : 'auto',
      }}
    >
      {/* card-inner: Rotação principal para o efeito 3D */}
      <div
        className={`relative transition-transform duration-500 ease-in-out transform w-full h-full preserve-3d ${isFlipped ? 'rotate-y-180' : 'hover:scale-[1.02] cursor-pointer'}`}
      >
        {/* Face Front (Carta Virada - Estado Oculto) */}
        <div className="absolute w-full h-full backface-hidden rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-800/50 flex items-center justify-center p-2">
           <div className="flex flex-col items-center">
             <Zap className="w-8 h-8 md:w-10 md:h-10" />
             <span className="text-sm font-semibold">Anatomia</span>
           </div>
        </div>

        {/* Face Back (Conteúdo da Carta - Estado Revelado) */}
        <div className={`absolute w-full h-full backface-hidden rounded-xl shadow-lg ${backFaceClass} flex items-center justify-center p-2 rotate-y-180`}>
          {content}
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal da Aplicação ---

const App = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.Start);
  const [playerName, setPlayerName] = useState('');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Tempo restante em segundos
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // Ids das cartas viradas (max 2)
  const [isFlippingDisabled, setIsFlippingDisabled] = useState(false); // Desabilita cliques durante o timeout

  const currentLevelConfig = useMemo(() => LEVEL_CONFIGS[currentLevelIndex], [currentLevelIndex]);
  const maxLevel = LEVEL_CONFIGS.length;
  // Define o número de colunas da grade com base no nível
  const gameGridCols = useMemo(() => {
    if (!currentLevelConfig) return 'grid-cols-2';
    const totalCards = currentLevelConfig.cardsPerLevel;
    // Lógica para grid: Nível 1 (2x2), Nível 2 (4x2), Nível 3 (4x3), Nível 4 (4x4), Nível 5 (6x4)
    if (totalCards === 4) return 'grid-cols-2'; 
    if (totalCards === 8) return 'grid-cols-4'; 
    if (totalCards === 12) return 'grid-cols-4'; 
    if (totalCards === 16) return 'grid-cols-4'; 
    if (totalCards === 24) return 'grid-cols-6'; 
    return 'grid-cols-4';
  }, [currentLevelConfig]);


  // --- Lógica de Inicialização e Reinício ---

  const initGame = useCallback((levelIndex = 0) => {
    const config = LEVEL_CONFIGS[levelIndex];
    setCards(createCards(levelIndex));
    setFlippedCards([]);
    setTimeLeft(config.limit);
    setCurrentLevelIndex(levelIndex);
    // Preserva a pontuação ao iniciar o jogo no nível 1 (deixei 0, mas se fosse para ser persistente, seria alterado)
    setScore(0); 
    setGameStatus(GameStatus.Playing);
    setIsFlippingDisabled(false);
  }, []);

  const startGame = () => {
    if (playerName.trim()) {
      initGame(0);
    }
  };

  const tryAgain = () => {
    // Mantém o nível, mas reinicia a pontuação e tempo
    initGame(currentLevelIndex);
  };

  const nextLevel = () => {
    if (currentLevelIndex + 1 < maxLevel) {
      // Inicia o próximo nível
      const newLevelIndex = currentLevelIndex + 1;
      const config = LEVEL_CONFIGS[newLevelIndex];
      setCards(createCards(newLevelIndex));
      setFlippedCards([]);
      setTimeLeft(config.limit);
      setCurrentLevelIndex(newLevelIndex);
      // setScore(score); // Descomentar para manter a pontuação total
      setGameStatus(GameStatus.Playing);
      setIsFlippingDisabled(false);
    } else {
      setGameStatus(GameStatus.FinalWin);
    }
  };

  const goToStart = () => {
    setGameStatus(GameStatus.Start);
    setPlayerName('');
    setScore(0);
  };


  // --- Lógica do Jogo da Memória ---

  const handleCardClick = (id) => {
    if (isFlippingDisabled || flippedCards.length === 2) return;

    // Garante que a carta clicada não está virada nem combinada
    const cardToFlip = cards.find(c => c.id === id);
    if (!cardToFlip || cardToFlip.isFlipped || cardToFlip.isMatched) return;

    // 1. Virar a carta
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    // Usa um callback para obter o estado mais recente de flippedCards
    setFlippedCards(prevFlipped => {
      const newFlipped = [...prevFlipped, id];
      
      // Se duas cartas foram viradas, inicia a verificação
      if (newFlipped.length === 2) {
        setIsFlippingDisabled(true); // Desabilita cliques enquanto verifica

        const [id1, id2] = newFlipped;
        // Usa o estado 'cards' atualizado (precisa garantir que este array seja estável ou usar referências corretas)
        // Usaremos o array 'cards' do estado mais recente disponível para a verificação.
        // Já que a lógica de match é assíncrona, capturamos os objetos card.
        const card1 = cards.find(c => c.id === id1);
        const card2 = cards.find(c => c.id === id2);

        // Verifica a Correspondência (certificando-se de que não são a mesma carta)
        if (card1?.pieceKey === card2?.pieceKey && id1 !== id2) {
          // Correspondência encontrada (+10 Pontos)
          setTimeout(() => {
            setScore(s => s + 10);
            setCards(prev =>
              prev.map(card =>
                card.id === id1 || card.id === id2
                  ? { ...card, isMatched: true, isFlipped: true } 
                  : card
              )
            );
            setFlippedCards([]);
            setIsFlippingDisabled(false);
          }, 1000); // 1.0s: Tempo em que as cartas ficam abertas em caso de acerto
        } else {
          // Correspondência não encontrada (-2 Pontos)
          setTimeout(() => {
            setScore(s => Math.max(0, s - 2));
            setCards(prev =>
              prev.map(card =>
                card.id === id1 || card.id === id2
                  ? { ...card, isFlipped: false } // Vira as cartas de volta
                  : card
              )
            );
            setFlippedCards([]);
            setIsFlippingDisabled(false);
          }, 1500); // 1.5s: Tempo em que as cartas ficam abertas em caso de erro
        }
      }
      return newFlipped;
    });
  };

  // --- Efeitos Colaterais (Timers e Checagem de Vitória) ---

  // Timer para o Fim do Jogo
  useEffect(() => {
    let timer;
    if (gameStatus === GameStatus.Playing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStatus === GameStatus.Playing) {
      // Tempo esgotado
      setGameStatus(GameStatus.Loss);
    }

    return () => clearInterval(timer);
  }, [gameStatus, timeLeft]);

  // Checar Vitória
  useEffect(() => {
    if (gameStatus === GameStatus.Playing && cards.length > 0) {
      const allMatched = cards.every(card => card.isMatched);
      if (allMatched) {
        setGameStatus(GameStatus.Win);
      }
    }
  }, [cards, gameStatus]);


  // --- Componentes de Tela ---

  const StartScreen = () => (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-xl rounded-2xl w-full max-w-sm">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-2">AnatoMatch</h1>
      <p className="text-gray-600 mb-6 text-center">Jogo da Memória de Anatomia para Estudantes</p>

      <label htmlFor="playerName" className="self-start text-lg font-semibold text-gray-700 mb-2">
        Seu Nome:
      </label>
      <input
        id="playerName"
        type="text"
        placeholder="Insira seu nome aqui"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="w-full p-3 mb-6 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 transition duration-150"
        maxLength={20}
      />

      <button
        onClick={startGame}
        disabled={!playerName.trim()}
        className={`w-full py-3 px-6 text-xl font-bold rounded-lg transition-all duration-200 shadow-md ${
          playerName.trim()
            ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-700/50'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
      >
        <div className="flex items-center justify-center">
          <Zap className="mr-2 h-6 w-6" />
          {`Jogar (Nível 1 - ${LEVEL_CONFIGS[0].cardsPerLevel} Cartas)`}
        </div>
      </button>
      <p className="mt-4 text-sm text-gray-500">Regras: +10 Acerto | -2 Erro</p>
    </div>
  );

  const GameScreen = () => (
    <div className="flex flex-col w-full h-full max-w-6xl p-4 md:p-8 bg-white shadow-2xl rounded-2xl">
      <header className="flex flex-wrap justify-between items-center mb-6 p-4 bg-blue-100 rounded-xl shadow-inner">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 w-full md:w-auto mb-2 md:mb-0">
          Nível {currentLevelConfig.level} - {playerName}
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center p-2 rounded-full bg-blue-600 text-white font-mono text-xl shadow-md">
            <Clock className="w-5 h-5 mr-2" />
            <span className="min-w-[40px] text-center">{timeLeft}s</span>
          </div>
          <div className="flex items-center p-2 rounded-full bg-yellow-600 text-white font-mono text-xl shadow-md">
            <Award className="w-5 h-5 mr-2" />
            <span className="min-w-[40px] text-center">{score}</span>
          </div>
        </div>
      </header>

      <div className={`grid ${gameGridCols} gap-3 md:gap-4 flex-grow p-2`}>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            isFlippingDisabled={isFlippingDisabled}
          />
        ))}
      </div>
    </div>
  );

  const WinScreen = ({ isFinal = false }) => (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-2xl rounded-2xl w-full max-w-md text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-4xl font-extrabold text-green-700 mb-2">Parabéns, {playerName}!</h1>
      <p className="text-xl text-gray-700 mb-6">
        Você completou o Nível {currentLevelConfig.level} com {score} pontos!
      </p>

      {isFinal ? (
        <>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">
            Você é um MESTRE da Anatomia!
          </h2>
          <button
            onClick={goToStart}
            className="w-full py-3 px-6 text-lg font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg mb-4"
          >
            <Home className="inline-block mr-2" /> Ir para a Tela Inicial
          </button>
        </>
      ) : (
        <>
          <button
            onClick={nextLevel}
            className="w-full py-3 px-6 text-xl font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 shadow-lg mb-4"
          >
            <Award className="inline-block mr-2" /> Próximo Nível (Nível {currentLevelConfig.level + 1})
          </button>
          <button
            onClick={goToStart}
            className="w-full py-2 px-6 text-md font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200"
          >
            <Home className="inline-block mr-2 h-5 w-5" /> Voltar ao Início
          </button>
        </>
      )}
    </div>
  );

  const GameOverScreen = () => (
    <div className="flex flex-col items-center justify-center p-10 bg-white shadow-2xl rounded-2xl w-full max-w-md text-center">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-extrabold text-red-700 mb-2">Game Over!</h1>
      <p className="text-xl text-gray-700 mb-6">
        O tempo acabou no Nível {currentLevelConfig.level}. Sua pontuação final: {score}.
      </p>
      <button
        onClick={tryAgain}
        className="w-full py-3 px-6 text-xl font-bold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-gray-800 transition-all duration-200 shadow-lg mb-4"
      >
        <RotateCw className="inline-block mr-2" /> Tentar Novamente (Nível {currentLevelConfig.level})
      </button>
      <button
        onClick={goToStart}
        className="w-full py-2 px-6 text-md font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200"
      >
        <Home className="inline-block mr-2 h-5 w-5" /> Ir para a Tela Inicial
      </button>
    </div>
  );

  // --- Renderização Principal ---

  let screenComponent;
  switch (gameStatus) {
    case GameStatus.Playing:
      screenComponent = <GameScreen />;
      break;
    case GameStatus.Win:
      screenComponent = <WinScreen isFinal={currentLevelIndex + 1 === maxLevel} />;
      break;
    case GameStatus.Loss:
      screenComponent = <GameOverScreen />;
      break;
    case GameStatus.FinalWin:
      screenComponent = <WinScreen isFinal={true} />;
      break;
    case GameStatus.Start:
    default:
      screenComponent = <StartScreen />;
      break;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4 font-inter">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>{`
        .font-inter { font-family: 'Inter', sans-serif; }
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        /* Garante que as cartas ocupem o espaço corretamente no grid */
        .grid-cols-6 > * { aspect-ratio: 1 / 1; }
        .grid-cols-4 > * { aspect-ratio: 1 / 1; }
        .grid-cols-2 > * { aspect-ratio: 1 / 1; }
      `}</style>
      {screenComponent}
    </div>
  );
};

export default App;
