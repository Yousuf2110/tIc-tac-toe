import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import VsSvg from '../../assets/svg/vsSvg';
import ManSvg from '../../assets/svg/manSvg';
import CompSvg from '../../assets/svg/aiSvg';

const Button = ({onPress, title, aiIcon}: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.button}>
      <View style={[styles.textColumn, {width: aiIcon ? '80%' : '60%'}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {aiIcon ? (
        <View style={styles.iconContainer}>
          <CompSvg width={20} height={20} />
        </View>
      ) : (
        <View style={styles.iconColumn}>
          <ManSvg width={15} height={15} />
          <VsSvg width={10} height={10} />
          <ManSvg width={15} height={15} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
