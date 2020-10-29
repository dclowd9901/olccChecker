import { parse } from 'node-html-parser';

const NOT_FOUND = /Sorry, we were unable to find any/i;

function parser(result) {
    if (NOT_FOUND.test(result)) return [];

    const parsedHtml = parse(result);
    const resultRows = parsedHtml.querySelectorAll('.alt-row').concat(parsedHtml.querySelectorAll('.row'));
    const [oneResult] = parsedHtml.querySelectorAll('#location-display');

    if (oneResult) {
        const inStock = parsedHtml.querySelectorAll('#in-stock')[0].innerText;
        const quantity = parseInt(inStock.match(/\d+/)[0], 10);
        const storeInfo = oneResult.querySelector('h2').innerText;
        const [storeInfoMatch, storeNumber, city] = storeInfo.match(/Store\s*(\d+)\:\s*([a-zA-Z]+)/i);
        const [rawAddress, rawTelephone] = oneResult.querySelectorAll('p');
        const telephone = rawTelephone.innerText;
        const address = rawAddress.innerText.replace(/[\n\r\t]/gi, ' ');

        return [{
            storeNumber,
            city,
            address,
            telephone,
            quantity,
        }]
    }
    
    return resultRows.map(row => {
        const allCells = row.querySelectorAll('td');
        const storeNumber = allCells[0].querySelector('span').innerText;
        const city = allCells[1].innerText;
        const address = allCells[2].innerText;
        const telephone = allCells[4].innerText;
        const quantity = parseInt(allCells[6].innerText, 10);

        return {
            storeNumber,
            city,
            address,
            telephone,
            quantity,
        }
    });
}

export default parser;