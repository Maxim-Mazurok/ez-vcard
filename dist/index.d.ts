import { VCardVersion } from './types/VCardVersion';
import { AddressType } from './types/AddressType';
import { TelephoneType } from './types/TelephoneType';
import { ImageType } from './types/ImageType';
import { CalendarMonthType } from './types/CalendarMonthType';
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
export declare type Config = Partial<{
    version: VCardVersion;
    prodId: boolean;
}>;
declare const _default: (data: VcardData, config?: Partial<{
    version: "V2_1" | "V3_0" | "V4_0";
    prodId: boolean;
}> | undefined) => Promise<string>;
export default _default;
