const net = require('net');

module.exports = p => new Promise((resolve) => {
  const port = parseInt(p, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port) || port < 0 || port > 65536) {
    resolve(false);
  }

  const tester = net.createServer()
    // catch errors, and resolve false
    .once('error', () => {
      resolve(false);
    })
    // return true if success
    .once('listening', () => tester.once('close', () => resolve(true)).close())
    .listen(port, '127.0.0.1');
});
