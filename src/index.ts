import {Java as java} from './tsJavaModule';
import {writeFileSync} from 'fs';
import {join} from 'path';

(async () => {
  await java.ensureJvm();

  // init
  const vcard = java.newInstance('VCard');

  // name
  const name = java.newInstance('StructuredName');
  name.setFamily('Mazurok');
  name.setGiven('Maxim');

  vcard.setStructuredName(name);
  vcard.setFormattedName('Maxim Mazurok');

  // generate
  const ezvcard = java.importClass('Ezvcard');
  const version = java.importClass('VCardVersion').V2_1;
  const result = ezvcard.write(vcard).version(version).prodId(false).go();
  console.log(result);

  // write to file
  writeFileSync(join(__dirname, 'vCard.vcf'), result);
})();
