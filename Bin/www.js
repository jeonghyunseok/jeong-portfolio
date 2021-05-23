var server = require('../src/Server/Server');
var port =process.env.HOMEDRIVE=='C:'? 80 : 3000
console.log(process.env.HOMEDRIVE)
server.listen(port, function() 
{
    console.log('running at localhost: ' + port);
});
