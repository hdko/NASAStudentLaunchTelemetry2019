od_alt = new Odometer({
  el:$('#altitude_od')[0],
  value:600,
  format:'(,ddd).dd'
});
setInterval(function() {
  od_alt.update(Math.random()*5000 + 'm');
}, 100);
