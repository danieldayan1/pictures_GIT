import { getNumberEnvByName, getStringEnvByName } from '../utils/env.util.js';

export const config = {
   port: getNumberEnvByName('PORT', 3000),
   hostname: getStringEnvByName('HOSTNAME', '0.0.0.0')
};