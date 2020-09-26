import {Java} from '../tsJavaModule';

export type ImageType = Exclude<
  keyof Java.ezvcard.parameter.ImageType.Static,
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
