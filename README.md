# ez-vcard

It is a vCard generator written in TypeScript for NodeJS that uses amazing [ez-vcard library written in Java][ez-vcard].
It can read and write vCards in many different formats. The "ez" stands for "easy" because the goal is to create a library that's easy to use.

## Features

- Status: Work in Progress
- [tsJavaModule.ts](src/tsJavaModule.ts) file contains [ez-vcard][ez-vcar] TypeScript type definitions for [node-java][node-java]
- [index.ts](src/index.ts) uses [node-java] to generate sample [vCard.vcf](src/vCard.vcf)

[node-java]: https://github.com/joeferner/node-java
[ez-vcard]: https://github.com/mangstadt/ez-vcard
