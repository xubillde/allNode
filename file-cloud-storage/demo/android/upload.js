var needle = require('needle');

// { file: './flutter.png', content_type: 'png' }
function postFile(file,callBack){
    needle.post('http://localhost:4000/upload', {
        path:'test',
        version:'1.0.0',
        version_code:20,
        file: file
    }, { multipart: true }, function(err, resp, body) {
        console.log(err, resp, body)
        callBack(resp)
    });
    
}

module.exports = {
    postFile:postFile
}