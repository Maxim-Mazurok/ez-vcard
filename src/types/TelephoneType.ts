import {Java} from '../tsJavaModule';

export type TelephoneType = Exclude<
  keyof Java.ezvcard.parameter.TelephoneType.Static,
  | 'class'
  | 'allA'
  | 'all'
  | 'allP'
  | 'findA'
  | 'find'
  | 'findP'
  | 'getA'
  | 'get'
  | 'getP'
>;
