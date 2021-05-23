var server = require('../src/Server/Server');
var port = process.env.Port || 80

server.listen(port, function() 
{
    console.log('running at localhost: ' + port);
});
