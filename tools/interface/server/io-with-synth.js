define ("io-with-synth", ["nanomsg"], function (nano)
{
  var pub = nano.socket ('pub');
  var sub = nano.socket ('sub');
  
  var addr = 'tcp://' + process.env.IP + ':' + 20123
  pub.bind (addr);
  sub.connect (addr);
  
  sub.on ('message', function (buf) {
      console.log (buf.toString ());
      pub.close ();
      sub.close ();
  });
  
  setTimeout (function () {
      pub.send ("Hello from nanomsg!");
  }, 100);

  return {
    IO: function stub () {}
  };
});