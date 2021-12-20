require('ts-node/register');

require('./umzug').migrator.runAsCLI().catch(e => console.log(e));
