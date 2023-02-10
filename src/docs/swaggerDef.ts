import fs from 'fs';
import config from '../config/config';

let packageJson: any;

fs.readFile('./package.json', 'utf8', (err, data) => {
  if (err) throw err;

  packageJson = JSON.parse(data);
});

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'node-express-boilerplate API documentation',
    version: packageJson?.version || '0.0.0',
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;
