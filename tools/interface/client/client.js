console.log ("client.js was loaded")

define ("client", ["interface", "frame", "jsx!views/main"], function (client, main_test) {
  console.log ("client was loaded by requirejs, via init")
})