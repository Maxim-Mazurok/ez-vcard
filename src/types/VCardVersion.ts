import {Java} from '../tsJavaModule';

export type VCardVersion = Exclude<
  keyof Java.ezvcard.VCardVersion.Static,
  | 'class'
  | 'valueOfA'
  | 'valueOf'
  | 'valueOfP'
  | 'valueOfA'
  | 'valueOf'
  | 'valueOfP'
  | 'valueOfByStrA'
  | 'valueOfByStr'
  | 'valueOfByStrP'
  | 'valueOfByXmlNamespaceA'
  | 'valueOfByXmlNamespace'
  | 'valueOfByXmlNamespaceP'
  | 'valuesA'
  | 'values'
  | 'valuesP'
>;
