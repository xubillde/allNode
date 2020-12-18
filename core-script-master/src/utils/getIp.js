export default function getIp () {
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var IPv4 = '127.0.0.1';
  for (var key in interfaces) {
    var alias = 0;
    interfaces[key].forEach(function(details){
      if (details.family == 'IPv4' && key == 'en0'  ) {
          IPv4 = details.address;
      }
    });
  }
  return IPv4;
}