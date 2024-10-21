import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Sound from 'react-native-sound';
import {styles} from './styles';
import {THEME} from '../../constants/theme';
import Header from '../../components/header';
import SettingModal from '../../components/settingModal';
import LevelInfo from '../../components/levelInfo';
import PlayerSection from '../../components/playerSection';
import CrossSvg from '../../assets/svg/crossSvg';
import CircleSvg from '../../assets/svg/circleSvg';
import {cell} from '../../constants';
import {SCREEN} from '../../constants/screen';

const turnSound = new Sound('click.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load sound', error);
  }
});

const CompGame = () => {
  const navigation: any = useNavigation();

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [levelInfoModal, setLevelInfoModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  useBackHandler();

  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      setTimeout(() => {
        setCurrentPlayer('X');
        computerMove();
      }, 500);
    }
  }, [isPlayerTurn, winner, isDraw]);

  const checkWinner = (board: any) => {
    for (let i = 0; i < cell.length; i++) {
      const [a, b, c] = cell[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const checkDraw = (board: any) => {
    return board.every((cell: any) => cell !== null);
  };

  useEffect(() => {
    const currentWinner = checkWinner(board);
    const draw = checkDraw(board);

    if (currentWinner) {
      setWinner(currentWinner);
      setLevelInfoModal(true);
      setTimeout(() => {
        setLevelInfoModal(false);
        navigation.navigate(SCREEN.HOME);
      }, 2000);
    } else if (draw && !currentWinner) {
      setIsDraw(true);
      setWinner('Draw');
      setLevelInfoModal(true);
      setTimeout(() => {
        setLevelInfoModal(false);
        navigation.navigate(SCREEN.HOME);
      }, 2000);
    } else {
      setWinner(null);
      setIsDraw(false);
    }
  }, [board]);

  useEffect(() => {
    if (!isPlayerTurn && !winner && !isDraw) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  }, [isPlayerTurn, winner, isDraw]);

  const makeMove = (index: any, player: any) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    turnSound.play(success => {
      if (!success) {
        console.log('Sound did not play');
      }
    });
  };

  const computerMove = () => {
    const emptyIndices = board
      .map((value, index) => (value === null ? index : null))
      .filter(index => index !== null);
    if (emptyIndices.length > 0) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      makeMove(randomIndex, 'O');
      setIsPlayerTurn(true);
    }
  };

  const minimax = (board: any, depth: any, isMaximizing: any) => {
    const currentWinner = checkWinner(board);
    if (currentWinner === 'O') return 10 - depth;
    if (currentWinner === 'X') return depth - 10;
    if (checkDraw(board)) return 0;

    if (isMaximizing) {
      let bestVal = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const moveVal = minimax(board, depth + 1, false);
          board[i] = null;
          bestVal = Math.max(bestVal, moveVal);
        }
      }
      return bestVal;
    } else {
      let bestVal = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const moveVal = minimax(board, depth + 1, true);
          board[i] = null;
          bestVal = Math.min(bestVal, moveVal);
        }
      }
      return bestVal;
    }
  };

  const handlePress = (index: any) => {
    if (isPlayerTurn && !board[index] && !winner && !isDraw) {
      makeMove(index, 'X');
      setCurrentPlayer('O');
      setIsPlayerTurn(false);
    }
  };

  const onPressResetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.BLACK} />
      <Header
        hideIcons={false}
        title={'Tic-Tac-Toe'}
        setModalVisible={setModalVisible}
        onPressResetGame={onPressResetGame}
      />
      <PlayerSection currentPlayer={currentPlayer} />
      <View style={styles.container}>
        <View style={styles.board}>
          {board.map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={index}
              style={[
                styles.cell,
                {justifyContent: 'center', alignItems: 'center'},
              ]}
              onPress={() => handlePress(index)}>
              {value === 'X' ? (
                <CrossSvg width={80} height={80} />
              ) : value === 'O' ? (
                <CircleSvg width={60} height={60} />
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <SettingModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      />
      {levelInfoModal && (
        <LevelInfo
          winner={winner}
          levelInfoModal={levelInfoModal}
          setLevelInfoModal={setLevelInfoModal}
          isDraw={isDraw}
        />
      )}
    </SafeAreaView>
  );
};

const useBackHandler = () => {
  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default CompGame;
