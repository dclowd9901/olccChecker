import ageVerification from './ageVerification.js';
import lookup from './lookup.js';

ageVerification().then(() => {
    lookup();
})