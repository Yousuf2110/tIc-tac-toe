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
import {SCREEN} from '../../constants/screen';
import Header from '../../components/header';
import {initialBoard} from '../../constants';
import AdSection from '../../components/adSection';
import SettingModal from '../../components/settingModal';
import LevelInfo from '../../components/levelInfo';
import PlayerSection from '../../components/playerSection';
import CrossSvg from '../../assets/svg/crossSvg';
import CircleSvg from '../../assets/svg/circleSvg';

const turnSound = new Sound('click.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('Failed to load sound', error);
  }
});

const Game = () => {
  const navigation: any = useNavigation();

  const [board, setBoard] = useState<string[][]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [levelInfoModal, setLevelInfoModal] = useState<boolean>(false);

  useBackHandler();

  const handlePress = (row: number, col: number) => {
    if (board[row][col] !== '' || winner) {
      return;
    }

    const newBoard = board.map((rowArr, rowIndex) => {
      if (rowIndex === row) {
        return rowArr.map((colVal, colIndex) => {
          if (colIndex === col) {
            return currentPlayer;
          }
          return colVal;
        });
      }
      return rowArr;
    });

    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    turnSound.play(success => {
      if (!success) {
        console.log('Sound did not play');
      }
    });
  };

  const checkWinner = (board: string[][]) => {
    const lines = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];

    for (const line of lines) {
      if (line.every(cell => cell === 'X')) {
        setWinner('X');
        setLevelInfoModal(true);
        setTimeout(() => {
          setLevelInfoModal(false);
          navigation.navigate(SCREEN.HOME);
        }, 2000);
        return;
      } else if (line.every(cell => cell === 'O')) {
        setWinner('O');
        setLevelInfoModal(true);
        setTimeout(() => {
          setLevelInfoModal(false);
          navigation.navigate(SCREEN.HOME);
        }, 2000);
        return;
      }
    }

    if (board.every(row => row.every(cell => cell !== ''))) {
      setWinner('Draw');
      setLevelInfoModal(true);
      setTimeout(() => {
        setLevelInfoModal(false);
        navigation.navigate(SCREEN.HOME);
      }, 2000);
    }
  };

  const onPressResetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.BLACK} />
      <Header
        title={'Tic-Tac-Toe'}
        hideIcons={false}
        setModalVisible={setModalVisible}
        onPressResetGame={onPressResetGame}
      />
      <PlayerSection currentPlayer={currentPlayer} />
      <View style={styles.container}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={colIndex}
                style={[
                  styles.cell,
                  {justifyContent: 'center', alignItems: 'center'},
                ]}
                onPress={() => handlePress(rowIndex, colIndex)}>
                {cell === 'X' && <CrossSvg width={80} height={80} />}
                {cell === 'O' && <CircleSvg width={60} height={60} />}
              </TouchableOpacity>
            ))}
          </View>
        ))}
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

export default Game;
