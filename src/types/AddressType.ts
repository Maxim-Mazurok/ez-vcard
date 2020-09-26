import {Java} from '../tsJavaModule';

export type AddressType = Exclude<
  keyof Java.ezvcard.parameter.AddressType.Static,
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
