import ageVerification from './ageVerification.js';
import lookup from './lookup.js';

const ONE_MINUTE = 60000;

// const jitter = Math.floor(Math.random() * ONE_MINUTE * 10);
const jitter = 1;
console.log(`Jittering for ${jitter / ONE_MINUTE} minutes`);
setTimeout(() => {
    ageVerification().then(() => {
        lookup();
    });
}, jitter);