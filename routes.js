const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === "/") {
        res.write('<html><body><h1>Hello, welcome to the assignment of the section 3.</h1><h2>Now, enter your username:</h2><form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Send</button></form></body></html>')
        return res.end()
    }

    if (url === "/users") {
        res.write('<html><body><h1>Users:</h1><ul><li>dummyGuy03</li></ul></body></html>')
        return res.end()
    }

    if (url === "/create-user" && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log("chunk", chunk)
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1]
            res.write(`<html><body><h5>${username}</h5></body></html>`)
            return res.end()
        })
    }
}

exports.handler = requestHandler;