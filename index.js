const fetch = require('node-fetch')
const fs = require('fs')


// Motivation 
// insted of implementing XMLHttpRequest in node.js to run browser specific Fetch apis
// why not go with http to fetch API directly?

// node-fetch has minimal code for window.fetch compatible API on Node.js runtime

// Features
// Stay consistent with window.fetch API.
// Make conscious trade-off when following WHATWG fetch spec and stream spec implementation details, document known differences.
// Use native promise but allow substituting it with [insert your favorite promise library].
// Use native Node streams for body on both request and response.
// Decode content encoding (gzip/deflate) properly and convert string output (such as res.text() and res.json()) to UTF-8 automatically.
// Useful extensions such as timeout, redirect limit, response size limit, explicit errors for troubleshooting.


// installation
// npm install node-fetch


// common usage 

// PLAIN text or HTML
fetch('https://github.com/')
    .then(res => res.text())
    .then(body => console.log(body));

// JSON
fetch('https://api.github.com/users/github')
    .then(res => res.json())
    .then(json => console.log(json));

fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(json => console.log(json))

// simple POST
fetch('https://httpbin.org/post', { method: 'POST', body: 'a=1' })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json));

// POST with data

const body = {
    a:1
}
fetch('https://httpbin.org/post', {
    method : 'post',
    body : JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
})
.catch(err => console.log(`This is from catch ${err}`) )
.then(res => res.json())
.then(json => console.log(json))

// to manipulate stream data (images)
fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
.catch(err => console.log(err))
.then(res => {
    const dest = fs.createWriteStream('./octocat.png')
    res.body.pipe(dest)
})



//Options
// The default values are shown after each option key.


// {
 // These properties are part of the Fetch Standard
//     method: 'GET',
//     headers: {},        // request headers. format is the identical to that accepted by the Headers constructor (see below)
//     body: null,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
//     redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
//     signal: null,       // pass an instance of AbortSignal to optionally abort requests
 
//      The following properties are node-fetch extensions
//     follow: 20,         // maximum redirect count. 0 to not follow redirect
//     timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
//     compress: true,     // support gzip/deflate content encoding. false to disable
//     size: 0,            // maximum response body size in bytes. 0 to disable
//     agent: null         // http(s).Agent instance or function that returns an instance (see below)
// }