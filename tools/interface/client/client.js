console.log ("client.js was loaded")

define ("client", ["interface", "frame", "jsx!apps/main"], function (client, main_test) {
  console.log ("client was loaded by requirejs, via init")
})