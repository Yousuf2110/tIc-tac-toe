import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from './styles';
import {SCREEN} from '../../constants/screen';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation: any = useNavigation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      navigation.navigate(SCREEN.HOME);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!visible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.column}>
          <Text style={styles.title}>T</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}> I C</Text>
          <Text style={styles.text}>AC</Text>
          <Text style={styles.text}>OE</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
