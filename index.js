const http = require("http");
const PORT = 4001;
const hostname = '127.0.0.1';

const server = http.createServer((req, res) => {
    res.end("Welcome to the e-commerce server");
});

server.listen(PORT, hostname, () => {
    console.log(`Server is running at http://${hostname}:${PORT}`)
})