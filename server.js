
const fastify = require('fastify')();
const path = require('path');
const { exec } = require('child_process');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const startJsonServer = () => {
  return new Promise((resolve, reject) => {
    exec('json-server --watch db.json --port 3001', (error, stdout, stderr) => {
      if (error) {
        reject(`exec error: ${error}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const startApp = async () => {
  try {
    await startJsonServer();
    fastify.listen(3000, '0.0.0.0', (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
