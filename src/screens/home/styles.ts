import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {THEME} from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.PRIMARY,
  },
  innerContainer: {
    paddingHorizontal: wp(3),
  },
  imageContainer: {
    width: '100%',
    height: hp(10),
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: hp(15),
    borderRadius: 35,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: hp(3),
    bottom: 0,
    marginBottom: hp(15),
    position: 'absolute',
  },
});
