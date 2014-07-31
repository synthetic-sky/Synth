#!/bin/sh
cd client/ext;
curl -o jquery.js http://code.jquery.com/jquery-1.11.1.js
curl -L -o pouchdb.js https://github.com/pouchdb/pouchdb/releases/download/2.2.3/pouchdb-2.2.3.js
curl -O http://requirejs.org/docs/release/2.1.14/comments/require.js
curl -O http://requirejs.org/docs/release/2.1.14/r.js
curl -O https://raw.github.com/requirejs/text/latest/text.js
curl -o JSXTransformer-mod.js https://raw.githubusercontent.com/philix/jsx-requirejs-plugin/master/js/JSXTransformer-0.11.0.js
curl -O https://raw.githubusercontent.com/philix/jsx-requirejs-plugin/master/js/jsx.js
curl -o ace-editor.js https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/ace.js
curl -O https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/mode-javascript.js
curl -O https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/worker-javascript.js
curl -O https://raw.githubusercontent.com/ajaxorg/ace-builds/master/src-noconflict/theme-monokai.js
curl -O https://raw.githubusercontent.com/alexwolfe/Buttons/master/css/buttons.css