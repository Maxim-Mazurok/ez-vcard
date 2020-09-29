import path from 'path';
import ezVcard, {Config, VcardData} from '../src/index';

(async () => {
  const data: VcardData = {
    name: {
      first: 'Maxim',
      last: 'Mazurok',
      full: 'Maxim Mazurok',
    },
    job: {
      title: 'Software Engineer',
      org: 'WiseTech Global',
    },
    online: {
      links: [
        'https://maxim.mazurok.com',
        'https://www.linkedin.com/in/maximmazurok',
      ],
      email: 'maxim@mazurok.com',
    },
    geo: {
      timezone: 'Australia/NSW',
      coordinates: {
        lat: -33.9242491,
        lon: 151.1918779,
      },
      addresses: [
        {
          street: '28 Ebsworth Street',
          city: 'Sydney',
          region: 'NSW',
          postCode: '2017',
          country: 'Australia',
          types: ['HOME'],
        },
      ],
    },
    phoneNumbers: [
      {
        number: '+61402282326',
        type: 'CELL',
      },
      {
        number: '+380984877707',
        type: 'CELL',
      },
    ],
    misc: {
      note: 'Professional web developer',
      birthday: {
        year: 1997,
        month: 'FEBRUARY',
        day: 14,
      },
      uid: '9aff8498-14c4-43ab-9ac6-40c2953c33ff',
      photo: {
        path: path.join(__dirname, 'contact_picture.jpg'),
        type: 'JPEG',
      },
      vcardUrl: 'https://maxim.mazurok.com/vcard.vcf',
      setRevision: true,
    },
  };

  const config: Config = {
    version: 'V2_1', // "V2_1" | "V3_0" | "V4_0"
    prodId: false, // remove `X-PRODID:ez-vcard 0.10.6`
  };

  const vcard = await ezVcard(data, config);

  console.log(vcard);
})();
