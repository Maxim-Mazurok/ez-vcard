"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsJavaModule_1 = require("./tsJavaModule");
const getDefaultConfig = () => ({
    version: 'V2_1',
    prodId: true,
});
exports.default = async (data, config) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    await tsJavaModule_1.Java.ensureJvm();
    const useConfig = Object.assign({}, getDefaultConfig(), config);
    // init
    const vcard = tsJavaModule_1.Java.newInstance('VCard');
    // name
    if (((_a = data.name) === null || _a === void 0 ? void 0 : _a.last) || ((_b = data.name) === null || _b === void 0 ? void 0 : _b.first)) {
        const name = tsJavaModule_1.Java.newInstance('StructuredName');
        ((_c = data.name) === null || _c === void 0 ? void 0 : _c.first) && name.setGiven(data.name.first);
        ((_d = data.name) === null || _d === void 0 ? void 0 : _d.last) && name.setFamily(data.name.last);
        vcard.setStructuredName(name);
    }
    ((_e = data.name) === null || _e === void 0 ? void 0 : _e.full) && vcard.setFormattedName(data.name.full);
    // job
    ((_f = data.job) === null || _f === void 0 ? void 0 : _f.title) && vcard.addTitle(data.job.title);
    ((_g = data.job) === null || _g === void 0 ? void 0 : _g.org) && vcard.setOrganization(data.job.org);
    // geo - addresses
    if ((_h = data.geo) === null || _h === void 0 ? void 0 : _h.addresses) {
        const AddressType = tsJavaModule_1.Java.importClass('AddressType');
        data.geo.addresses.forEach(address => {
            const addressVcard = tsJavaModule_1.Java.newInstance('Address');
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
    ((_k = (_j = data.geo) === null || _j === void 0 ? void 0 : _j.coordinates) === null || _k === void 0 ? void 0 : _k.lat) && ((_m = (_l = data.geo) === null || _l === void 0 ? void 0 : _l.coordinates) === null || _m === void 0 ? void 0 : _m.lon) &&
        vcard.setGeo(data.geo.coordinates.lat, data.geo.coordinates.lon);
    // geo - timezone
    if ((_o = data.geo) === null || _o === void 0 ? void 0 : _o.timezone) {
        const JavaTimeZone = tsJavaModule_1.Java.importClass('java.util.TimeZone');
        const EzvcardTimeZone = tsJavaModule_1.Java.importClass('Timezone');
        const timezones = JavaTimeZone.getAvailableIDs();
        if (timezones.includes(data.geo.timezone)) {
            const timezoneJava = JavaTimeZone.getTimeZone(data.geo.timezone);
            const timezoneEzvcard = new EzvcardTimeZone(timezoneJava);
            vcard.setTimezone(timezoneEzvcard);
        }
        else {
            throw `Unknown timezone: ${data.geo.timezone}; Supported timezones: ${timezones.join(', ')}`;
        }
    }
    // tel
    if (data.phoneNumbers) {
        const TelephoneType = tsJavaModule_1.Java.importClass('TelephoneType');
        data.phoneNumbers.forEach(phone => {
            vcard.addTelephoneNumber(phone.number, TelephoneType[phone.type]);
        });
    }
    // online
    ((_p = data.online) === null || _p === void 0 ? void 0 : _p.email) && vcard.addEmail(data.online.email);
    ((_q = data.online) === null || _q === void 0 ? void 0 : _q.links) &&
        data.online.links.forEach(url => {
            vcard.addUrl(url);
        });
    // misc
    ((_r = data.misc) === null || _r === void 0 ? void 0 : _r.vcardUrl) && vcard.addSource(data.misc.vcardUrl);
    ((_s = data.misc) === null || _s === void 0 ? void 0 : _s.note) && vcard.addNote(data.misc.note);
    ((_t = data.misc) === null || _t === void 0 ? void 0 : _t.uid) && vcard.setUid(new (tsJavaModule_1.Java.importClass('Uid'))(data.misc.uid));
    ((_u = data.misc) === null || _u === void 0 ? void 0 : _u.setRevision) &&
        vcard.setRevision(tsJavaModule_1.Java.importClass('Revision').now());
    // birthday
    if (((_w = (_v = data.misc) === null || _v === void 0 ? void 0 : _v.birthday) === null || _w === void 0 ? void 0 : _w.year) || ((_y = (_x = data.misc) === null || _x === void 0 ? void 0 : _x.birthday) === null || _y === void 0 ? void 0 : _y.month) || ((_0 = (_z = data.misc) === null || _z === void 0 ? void 0 : _z.birthday) === null || _0 === void 0 ? void 0 : _0.day)) {
        const calendarBirthday = new (tsJavaModule_1.Java.importClass('GregorianCalendar'))(((_2 = (_1 = data.misc) === null || _1 === void 0 ? void 0 : _1.birthday) === null || _2 === void 0 ? void 0 : _2.year) || 1970, tsJavaModule_1.Java.importClass('Calendar')[((_4 = (_3 = data.misc) === null || _3 === void 0 ? void 0 : _3.birthday) === null || _4 === void 0 ? void 0 : _4.month) || 'JANUARY'], ((_6 = (_5 = data.misc) === null || _5 === void 0 ? void 0 : _5.birthday) === null || _6 === void 0 ? void 0 : _6.day) || 1);
        const ezvcardBirthday = new (tsJavaModule_1.Java.importClass('Birthday'))(calendarBirthday.getTime());
        vcard.setBirthday(ezvcardBirthday);
    }
    // photo
    if ((_7 = data.misc) === null || _7 === void 0 ? void 0 : _7.photo) {
        const file = new (tsJavaModule_1.Java.importClass('File'))(data.misc.photo.path);
        const photo = new (tsJavaModule_1.Java.importClass('Photo'))(file, tsJavaModule_1.Java.importClass('ImageType')[data.misc.photo.type]);
        vcard.addPhoto(photo);
    }
    // generate
    const ezvcard = tsJavaModule_1.Java.importClass('Ezvcard');
    const version = tsJavaModule_1.Java.importClass('VCardVersion')[useConfig.version];
    const result = ezvcard
        .write(vcard)
        .version(version)
        .prodId(useConfig.prodId)
        .go();
    return result;
};
//# sourceMappingURL=index.js.map