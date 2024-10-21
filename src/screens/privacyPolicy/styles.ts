import {StyleSheet} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';
import {RFPercentage} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.WHITE,
  },
  mainContainer: {
    flex: 1,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: THEME.WHITE,
  },
  title: {
    color: THEME.BLACK,
    fontSize: RFPercentage(3),
    marginVertical: hp(1),
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-SemiBold',
  },
  text: {
    color: THEME.BLACK,
    fontSize: RFPercentage(2.1),
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Regular',
  },
  bottomSpace: {
    marginBottom: hp(5),
  },
});
