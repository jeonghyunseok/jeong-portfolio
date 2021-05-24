var server = require('../src/Server/Server');
var port = 80
console.log(process.env.HOMEDRIVE)
server.listen(port, function() 
{
    console.log('running at localhost: ' + port);
});
