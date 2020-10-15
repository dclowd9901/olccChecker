import { parse } from 'node-html-parser';

const NOT_FOUND = /Sorry, we were unable to find any/i;

function parser(result) {
    if (NOT_FOUND.test(result)) return [];

    const parsedHtml = parse(result);
    const resultRows = parsedHtml.querySelectorAll('.alt-row').concat(parsedHtml.querySelectorAll('.row'));
    const [oneResult] = parsedHtml.querySelectorAll('#location-display');

    if (oneResult.length) {
        const [inStock] = parsedHtml.querySelectorAll('#in-stock').innerText;
        const [quantity] = parseInt(inStock.match('(\d)'), 10);
        const storeInfo = oneResult.querySelector('h2').innerText;
        const [storeInfoMatch, storeNumber, city] = storeInfo.match(/Store\s*(\d+)\:\s*([a-zA-Z]+)/i);
        const [rawAddress, telephone] = oneResult.querySelectorAll('p');
        const address = rawAddress.innerText;

        return {
            storeNumber,
            city,
            address,
            telephone,
            quantity,
        }
    }
    
    return resultRows.map(row => {
        const allCells = row.querySelectorAll('td');
        const storeNumber = allCells[0].querySelector('span').innerText;
        const city = allCells[1].innerText;
        const address = allCells[2].innerText;
        const telephone = allCells[4].innerText;
        const quantity = allCells[6].innerText;

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