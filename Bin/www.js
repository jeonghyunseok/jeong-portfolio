var server = require('../src/Server/Server');
var port = 3000


server.listen(port, function() 
{
    console.log('running at localhost: ' + port);
});
