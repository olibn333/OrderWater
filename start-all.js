const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);

const args2 = [ 'start-server.js' ];
const opts2 = { stdio: 'inherit', cwd: 'server', shell: true };
require('child_process').spawn('node', args2, opts2);