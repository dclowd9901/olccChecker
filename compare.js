import config from './config.js';
import sendMail from './sendMail.js';

function compare(resultsByBottle) {
    const { stores, directory } = config;
    const notifications = [];

    resultsByBottle.forEach(resultForBottle => {
        const { bottle, availableStores } = resultForBottle;

        availableStores.forEach(availableStore => {
            const { storeNumber, quantity, city, address, telephone } = availableStore;
            
            if (!stores[storeNumber] || !stores[storeNumber].bottles[bottle]) {
                notifications.push(`The store at ${address} in ${city} has ${quantity} bottle${quantity > 1 ? 's' : ''} of ${directory[bottle]} from having none before. Call them at ${telephone}.`);
            } else if (quantity > stores[storeNumber].bottles[bottle]) {
                notifications.push(`The store at ${address} in ${city} has ${quantity} bottle${quantity > 1 ? 's' : ''} of ${directory[bottle]}, ${quantity - stores[storeNumber][bottle]} more than when last checked. Call them at ${telephone}.`);
            }
        });
    });

    if (notifications.length) {
        console.log('Found some; sending an email to notify...');
        sendMail(notifications.join('\r\n'));
    } else {
        console.log('No new bottles came in, no mail sent.');
    }
}

export default compare;