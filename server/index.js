'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let express     = require('express');
let path        = require('path');
let logger      = require('morgan');
let bodyParser  = require('body-parser');
let http        = require('http');
let mongoose    = require('mongoose');
let helmet      = require('helmet');
let cors        = require('cors') //:: TODO


let responseHandler = require('./utils/responseHandler');
let appRoutes       = require('./routes/v1/app.routes')();
let CONFIG          = require('./app.config');


/*TODO


*/

mongoose.connect(CONFIG.db['development']);
mongoose.connection.on('error', function(err){
  console.error("Connection Error on "+'development'+ " mode ",err);
  process.exit(-1);
});
mongoose.connection.on('connected', function() {
  console.log('MongoDB connected on '+'development'+ " mode");
});




let app = express();

app.use(logger('dev'));
//TODO Should not be comment out
// app.use(helmet()); 
// ::TODO Enable CORS (Should be remove)
// app.use(cors()); // :: 
/*app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});*/


app.use(bodyParser.json(), function(err, req, res, next){
    if(err){
        return res.status(500).json({error : err});
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/', responseHandler);
app.use('/api/v1', appRoutes);

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || '5000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(){
    if (error.syscall !== 'listen') {
        throw error;
      }
    
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
}

function onListening(){
    let addr = server.address();
    console.log("Address : ",addr);
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
      console.log("listening on port %o in %s settings env", addr, app.settings.env);
}