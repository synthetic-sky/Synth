#!/bin/sh
cd ext
npm install docco || exit
cd ..
patch -p0 < ext/patches/docco.patch
cp ext/patches/languages.json ext/node_modules/docco/resources/languages.json
