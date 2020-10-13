import http from 'http';
import querystring from 'querystring';

/* HEADERS EXAMPLE

{"date":"Tue, 13 Oct 2020 15:26:02 GMT","server":"GlassFish Server Open Source Edition 3.1.2.2","x-powered-by":"JSP/2.2","content-type":"text/html;charset=ISO-8859-1","content-length":"3882","set-cookie":["JSESSIONID=291815dca2bdc28cbde458e16b1d; Path=/; HttpOnly"],"keep-alive":"timeout=5, max=100","connection":"Keep-Alive"}
*/
let COOKIE;

function getCookie() {
    return new Promise((resolve, reject) => {
        if (COOKIE) {
            resolve(COOKIE);
            return;
        }

        const COOKIE_REGEX = /JSESSIONID\=([a-f0-9]+);/i

        const req = http.request('http://www.oregonliquorsearch.com', {
            method: 'GET',
            port: 80,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Host': 'www.oregonliquorsearch.com',
                'Pragma': 'no-cache',
                'Upgrade-Insecure-Requests': 1,
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
            }
        }, (res) => {
            res.setEncoding('utf8');
    
            res.on('data', () => {
                const setCookieHeader = res.headers['set-cookie'][0];
                COOKIE = setCookieHeader.match(COOKIE_REGEX)[1];

                resolve(COOKIE);
            });
    
            res.on('end', () => {
                console.log(`Got cookie at: ${new Date()}`);
            });
        });
    
        req.on('error', (err) => {
            reject(err);
            console.log('problem');
        })
    
        req.end();
    });
}

export default getCookie;