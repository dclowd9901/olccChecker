import fs from 'fs';
import config from './config.js';

function update(resultsByBottle) {
    const newStores = {};

    resultsByBottle.forEach(resultByBottle => {
        const { bottle, availableStores } = resultByBottle;

        availableStores.forEach(availableStore => {
            const { storeNumber, city, address, telephone, quantity } = availableStore;

            if (!newStores[storeNumber]) {
                newStores[storeNumber] = {
                    city,
                    address,
                    telephone,
                    bottles: {
                        [bottle]: parseInt(quantity, 10),
                    }
                }
            } else {
                newStores[storeNumber].bottles[bottle] = quantity;
            }
        });
    });

    const updatedConfig = {
        ...config,
        stores: newStores,
    };

    fs.writeFileSync('./config.js', `export default ${JSON.stringify(updatedConfig)}`);
}

export default update;