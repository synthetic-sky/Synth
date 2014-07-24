console.log ("client.js loaded")

require.config ({
  baseUrl: "/client",
  waitSeconds: 10,
})

require (["spiffy", "frame"], function () {
  
})