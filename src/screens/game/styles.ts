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
    backgroundColor: THEME.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    paddingHorizontal: wp(3),
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.WHITE,
    borderRadius: 20,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1.3),
  },
  cellText: {
    fontSize: RFPercentage(5),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },
  winnerText: {
    fontSize: RFPercentage(5),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },
});
