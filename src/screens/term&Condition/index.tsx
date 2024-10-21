import React from 'react';
import {View, Text, ScrollView, SafeAreaView, StatusBar} from 'react-native';
import {styles} from './styles';
import {THEME} from '../../constants/theme';
import Header from '../../components/header';
import {termsSections} from '../../constants';

const TermsConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={THEME.BLACK} />
      <Header
        title={'Terms & Conditions'}
        hideIcons={true}
        screenName={'TermsConditions'}
      />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {termsSections.map((section, index) => (
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

export default TermsConditions;
