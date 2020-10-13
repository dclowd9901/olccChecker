import getCookie from './getCookie.js';
import config from './config.js';
import querystring from 'querystring';
import http from 'http';
import fs from 'fs';
import parse from './parseResults.js';
import compare from './compare.js';
import update from './update.js';

/*
    Lookup: Request URL: GET http://www.oregonliquorsearch.com/servlet/FrontController?radiusSearchParam=10&productSearchParam=8722B&locationSearchParam=97220&btnSearch=Search&view=global&action=search

*/

function getQueryString(radius, bottle, location) {
    return querystring.stringify({
        'radiusSearchParam': radius,
        'productSearchParam': bottle,
        'locationSearchParam': location,
        btnSearch: 'Search',
        view: 'global',
        action: 'search',
    });
}

async function run() {
    const { bottles, location, radius, directory } = config;
    const COOKIE = await getCookie();
    const resultsByBottle = [];
    let index = 0;

    function launchRequest(path) {
        const options = {
            hostname: 'www.oregonliquorsearch.com',
            method: 'GET',
            path,
            port: 80,
            headers: {
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Cookie': `JSESSIONID=${COOKIE};`,
            }
        };

        const req = http.request(options, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400) {
                launchRequest(res.headers.location);
            } else {
                res.setEncoding('utf8');
                let chunks = '';
                res.on('data', (chunk) => {
                    chunks += chunk;
                });

                res.on('end', () => {
                    console.log(`Searching for "${directory[bottles[index]]}"...`);

                    const result = parse(chunks);
                    resultsByBottle.push({
                        bottle: bottles[index],
                        availableStores: result,
                    });
                    index++;

                    if (index < bottles.length) {
                        launchRequest(`/servlet/FrontController?${getQueryString(radius, bottles[index], location)}`);
                    } else {
                        compare(resultsByBottle);
                        update(resultsByBottle);
                        // we'll do the wrapping up here
                    }
                });
            }
        });

        req.on('error', (err) => {
            console.log('problem in getting bottle page');
            console.log(err);
        })
        req.end();
    }

    launchRequest(`/servlet/FrontController?${getQueryString(radius, bottles[index], location)}`);
}

export default run;