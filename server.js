const http = require('http');
const querystring = require('querystring');

function onRequest(req, res) {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            const password = parsedBody.password;

            if (password === 'KONGU') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('Logged in successfully');
                console.log('Logged in successfully');
            } else {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.write('Password incorrect');
                console.log('Password incorrect');
            }

            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.write('Method Not Allowed');
        res.end();
    }
}

http.createServer(onRequest).listen(8080, () => {
    console.log('Server is started...');
});
