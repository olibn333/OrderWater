const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client2', shell: true };
require('child_process').spawn('npm', args, opts);