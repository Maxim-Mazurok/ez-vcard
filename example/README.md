### Usage example:

1. `git clone https://github.com/Maxim-Mazurok/ez-vcard` - clone this repo
1. `cd ez-vcard` - go to the root repo folder
1. `npm ci` - install dependencies
1. `npx ts-node -P example/tsconfig.json example/index.ts` - run [`index.ts`](index.ts) file
1. You should see something like this in terminal:
    ```
    BEGIN:VCARD
    VERSION:2.1
    N:Mazurok;Maxim
    FN:Maxim Mazurok
    TITLE:Software Engineer
    ORG:WiseTech Global
    ADR;TYPE=home:;;28 Ebsworth Street;Sydney;NSW;2017;Australia
    GEO:-33.924249;151.191878
    TZ:+1000
    TEL;TYPE=cell:+61402282326
    TEL;TYPE=cell:+380984877707
    EMAIL:maxim@mazurok.com
    URL:https://maxim.mazurok.com
    URL:https://www.linkedin.com/in/maximmazurok
    SOURCE:https://maxim.mazurok.com/vcard.vcf
    NOTE:Professional web developer
    UID:9aff8498-14c4-43ab-9ac6-40c2953c33ff
    REV:20200926T090045Z
    BDAY:19970214
    PHOTO;ENCODING=BASE64;TYPE=jpeg:/9j/4AAQSkZJRgABAQAAAQABAAD/4QBmRXhpZgAATU0
    ...
    P8AkEClY57BM6v+4ALG+wVIERg2eWsv82qlB//Z
    END:VCARD
    ```
