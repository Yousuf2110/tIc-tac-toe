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
  board: {
    width: wp(90),
    height: wp(90),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    width: wp(25),
    height: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.WHITE,
    borderRadius: 10,
    marginVertical: hp(0.5),
    marginHorizontal: wp(1.3),
  },
  cellText: {
    fontSize: RFPercentage(5),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
  },
  winnerText: {
    marginTop: hp(3),
    fontSize: RFPercentage(5),
    color: THEME.WHITE,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
});
