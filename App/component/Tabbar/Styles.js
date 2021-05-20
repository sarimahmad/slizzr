import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../Common/Colors';
import Constants from '../../Common/Constants';

export default {
  bottomWrapper: {
  
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    // width:wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('10%'),
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:0,height:12},
    shadowRadius:6,
    shadowOpacity:0.10, 
    elevation:20,
    borderRadius:10,
  },
  flexRow: {
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  hrLine: {
    backgroundColor: '#C4C4C4',
    height: 1,
  },
};
