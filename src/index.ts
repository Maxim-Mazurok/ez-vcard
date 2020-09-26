import {Java as java} from './tsJavaModule';
import {VCardVersion} from './types/VCardVersion';
import {AddressType} from './types/AddressType';
import {TelephoneType} from './types/TelephoneType';
import {ImageType} from './types/ImageType';
import {CalendarMonthType} from './types/CalendarMonthType';

export interface VcardData {
  name?: Partial<{
    first: string;
    last: string;
    full: string;
  }>;
  job?: Partial<{
    title: string;
    org: string;
  }>;
  online?: Partial<{
    links: string[];
    email: string;
  }>;
  geo?: Partial<{
    timezone: string;
    coordinates: {
      lat: number;
      lon: number;
    };
    addresses: Partial<{
      street: string;
      city: string;
      region: string;
      postCode: string;
      country: string;
      types: AddressType[];
    }>[];
  }>;
  phoneNumbers?: {
    number: string;
    type: TelephoneType;
  }[];
  misc?: Partial<{
    note: string;
    birthday: Partial<{
      year: number;
      month: CalendarMonthType;
      day: number;
    }>;
    uid: string;
    setRevision: boolean;
    photo: {
      path: string;
      type: ImageType;
    };
    vcardUrl: string;
  }>;
}

export type Config = Partial<{
  version: VCardVersion;
  prodId: boolean;
}>;

const getDefaultConfig = (): Required<Config> => ({
  version: 'V2_1',
  prodId: true,
});

export default async (data: VcardData, config?: Config) => {
  await java.ensureJvm();

  const useConfig = Object.assign({}, getDefaultConfig(), config);

  // init
  const vcard = java.newInstance('VCard');

  // name
  if (data.name?.last || data.name?.first) {
    const name = java.newInstance('StructuredName');
    data.name?.first && name.setGiven(data.name.first);
    data.name?.last && name.setFamily(data.name.last);
    vcard.setStructuredName(name);
  }

  data.name?.full && vcard.setFormattedName(data.name.full);

  // job
  data.job?.title && vcard.addTitle(data.job.title);
  data.job?.org && vcard.setOrganization(data.job.org);

  // geo - addresses
  if (data.geo?.addresses) {
    const AddressType = java.importClass('AddressType');
    data.geo.addresses.forEach(address => {
      const addressVcard = java.newInstance('Address');
      address.street && addressVcard.setStreetAddress(address.street);
      address.city && addressVcard.setLocality(address.city);
      address.region && addressVcard.setRegion(address.region);
      address.postCode && addressVcard.setPostalCode(address.postCode);
      address.country && addressVcard.setCountry(address.country);

      const types = addressVcard.getTypes();
      address.types &&
        address.types.forEach(type => types.add(AddressType[type]));

      vcard.addAddress(addressVcard);
    });
  }

  // geo - coordinates
  data.geo?.coordinates?.lat &&
    data.geo?.coordinates?.lon &&
    vcard.setGeo(data.geo.coordinates.lat, data.geo.coordinates.lon);

  // geo - timezone
  if (data.geo?.timezone) {
    const JavaTimeZone = java.importClass('java.util.TimeZone');
    const EzvcardTimeZone = java.importClass('Timezone');
    const timezones = JavaTimeZone.getAvailableIDs();
    if (timezones.includes(data.geo.timezone)) {
      const timezoneJava = JavaTimeZone.getTimeZone(data.geo.timezone);
      const timezoneEzvcard = new EzvcardTimeZone(timezoneJava);
      vcard.setTimezone(timezoneEzvcard);
    } else {
      throw `Unknown timezone: ${
        data.geo.timezone
      }; Supported timezones: ${timezones.join(', ')}`;
    }
  }

  // tel
  if (data.phoneNumbers) {
    const TelephoneType = java.importClass('TelephoneType');
    data.phoneNumbers.forEach(phone => {
      vcard.addTelephoneNumber(phone.number, TelephoneType[phone.type]);
    });
  }

  // online
  data.online?.email && vcard.addEmail(data.online.email);
  data.online?.links &&
    data.online.links.forEach(url => {
      vcard.addUrl(url);
    });

  // misc
  data.misc?.vcardUrl && vcard.addSource(data.misc.vcardUrl);
  data.misc?.note && vcard.addNote(data.misc.note);
  data.misc?.uid && vcard.setUid(new (java.importClass('Uid'))(data.misc.uid));
  data.misc?.setRevision &&
    vcard.setRevision(java.importClass('Revision').now());

  // birthday
  if (
    data.misc?.birthday?.year ||
    data.misc?.birthday?.month ||
    data.misc?.birthday?.day
  ) {
    const calendarBirthday = new (java.importClass('GregorianCalendar'))(
      data.misc?.birthday?.year || 1970,
      java.importClass('Calendar')[data.misc?.birthday?.month || 'JANUARY'],
      data.misc?.birthday?.day || 1
    );
    const ezvcardBirthday = new (java.importClass('Birthday'))(
      calendarBirthday.getTime()
    );
    vcard.setBirthday(ezvcardBirthday);
  }

  // photo
  if (data.misc?.photo) {
    const file = new (java.importClass('File'))(data.misc.photo.path);
    const photo = new (java.importClass('Photo'))(
      file,
      java.importClass('ImageType')[data.misc.photo.type]
    );
    vcard.addPhoto(photo);
  }

  // generate
  const ezvcard = java.importClass('Ezvcard');
  const version = java.importClass('VCardVersion')[useConfig.version];
  const result = ezvcard
    .write(vcard)
    .version(version)
    .prodId(useConfig.prodId)
    .go();

  return result;
};
