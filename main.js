import dotenv from 'dotenv';
import ageVerification from './ageVerification.js';
import lookup from './lookup.js';
import { __dirname } from './globals.js';

dotenv.config({ path: `${__dirname}/.env`});

const ONE_MINUTE = 60000;

const jitter = Math.floor(Math.random() * ONE_MINUTE * 10);
console.log(`Jittering for ${jitter / ONE_MINUTE} minutes`);
setTimeout(() => {
    ageVerification().then(() => {
        lookup();
    });
}, process.env.DEVELOPMENT ? 0 : jitter);