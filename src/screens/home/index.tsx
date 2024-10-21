import React from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {THEME} from '../../constants/theme';
import Button from '../../components/button';
import {SCREEN} from '../../constants/screen';

const Home = () => {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.PRIMARY} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          aiIcon
          title={'Play with Computer'}
          onPress={() => navigation.navigate(SCREEN.COMP_GAME)}
        />
        <Button
          title={'# 2 Players'}
          onPress={() => navigation.navigate(SCREEN.GAME)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
