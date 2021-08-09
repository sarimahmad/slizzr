// @flow

import {Dimensions} from 'react-native';

export const BASE_URL = '';

export const IMAGE_BASE_URL = '';

export const USERDETAIL = 'userdetail';
export const TOKEN = 'token';
export const SCREEN = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const API_KEY = 'AIzaSyCoM2N8BXBveNHlX96-EjCkpaQDd7mVrLI';
export const ASPECTRATIO = SCREEN.height / SCREEN.width;

export const DOB = {
  month: [
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
  ],
  days: [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
  ],
  year: [
    {label: '1990', value: '1990'},
    {label: '1991', value: '1991'},
    {label: '1992', value: '1992'},
    {label: '1993', value: '1993'},
    {label: '1994', value: '1994'},
    {label: '1995', value: '1995'},
    {label: '1996', value: '1996'},
    {label: '1997', value: '1997'},
    {label: '1998', value: '1998'},
    {label: '1999', value: '1999'},
    {label: '2000', value: '2000'},
    {label: '2001', value: '2001'},
    {label: '2002', value: '2002'},
    {label: '2003', value: '2003'},
    {label: '2004', value: '2004'},
    {label: '2005', value: '2005'},
    {label: '2006', value: '2006'},
    {label: '2007', value: '2007'},
    {label: '2008', value: '2008'},
    {label: '2009', value: '2009'},
    {label: '2010', value: '2010'},
    {label: '2011', value: '2011'},
    {label: '2012', value: '2012'},
    {label: '2013', value: '2013'},
    {label: '2014', value: '2014'},
    {label: '2015', value: '2015'},
    {label: '2016', value: '2016'},
    {label: '2017', value: '2017'},
    {label: '2018', value: '2018'},
    {label: '2019', value: '2019'},
    {label: '2020', value: '2020'},
  ],
};

export const FONT = {
  Nunito: {
    bold: 'Nunito-Bold',
    boldItalic: 'Nunito-BoldItalic',
    semiBoldItalic: 'Nunito-SemiBoldItalic',
    black: 'Nunito-Black',
    blackItalic: 'Nunito-BlackItalic',
    extraBold: 'Nunito-ExtraBold',
    extraBoldItalic: 'Nunito-ExtraBoldItalic',
    extraLight: 'Nunito-ExtraLight',
    extraLightItalic: 'Nunito-ExtraLightItalic',
    italic: 'Nunito-Italic',
    light: 'Nunito-Light',
    lightItalic: 'Nunito-LightItalic',
    regular: 'Nunito-Regular',
    semiBold: 'Nunito-SemiBold',
  },
};

export const isIphoneXorAbove =
  SCREEN.height === 812 ||
  SCREEN.height > 812 ||
  SCREEN.height === 896 ||
  SCREEN.height > 896
    ? true
    : false;
