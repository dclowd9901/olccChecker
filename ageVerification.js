import http from 'http';
import querystring from 'querystring';
import getCookie from './getCookie.js';
import { getDateTimePST } from './date.js';

async function run() {
    const COOKIE = await getCookie();

    const postData = querystring.stringify({
        'btnSubmit': "I'm 21 or older"
    });

    const options = {
        followAllRedirects: true,
        hostname: 'www.oregonliquorsearch.com',
        method: 'POST',
        path: '/servlet/WelcomeController',
        port: 80,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': Buffer.byteLength(postData),
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': `JSESSIONID=${COOKIE};`,
            'Host': 'www.oregonliquorsearch.com',
            'Origin': 'http://www.oregonliquorsearch.com',
            'Pragma': 'no-cache',
            'Referer': 'http://www.oregonliquorsearch.com/',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
        }
    };

    const req = http.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log(`Verified age at: ${getDateTimePST()}`);
        });
    });

    req.on('error', (err) => {
        console.log('problem in age verification');
        console.log(err);
    })
    req.write(postData);
    req.end();
}

export default run;