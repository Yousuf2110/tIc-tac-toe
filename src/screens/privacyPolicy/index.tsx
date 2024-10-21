import React from 'react';
import {View, Text, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import {styles} from './styles';
import {THEME} from '../../constants/theme';
import Header from '../../components/header';
import {policySections} from '../../constants';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.BLACK} />
      <Header
        title={'Privacy Policy'}
        hideIcons={true}
        screenName={'PrivacyPolicy'}
      />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {policySections.map((section, index) => (
            <View key={index}>
              <Text style={styles.title}>{section.title}</Text>
              <Text style={styles.text}>{section.content}</Text>
            </View>
          ))}
          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
