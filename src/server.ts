'use strict';

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () =>
    console.log('Express server listening on port ' + app.get('port'))
)
;
