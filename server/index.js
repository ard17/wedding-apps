import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import middleware from './helpers/middleware';

// for access models to db
import models, { sequelize } from './model/indexModel';
import routes from './routes/IndexRoute';
import e from 'express';

// declare port
const port = process.env.PORT || 3000;

const app = express();
// parse body params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// helmet for SEO
app.use(helmet());
// secure apps by setting various HTTP Headers
app.use(compress());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// load model dan simpan di req.context
app.use(async (req, res, next) => {
	req.context = { models };
	next();
});

// app.use(process.env.URL_DOMAIN, (req, res) => {
// 	res.send('Hello');
// });

app.use(process.env.URL_API + '/bank', routes.BankRoute);
app.use(process.env.URL_API + '/bank_account', routes.BankAccRoute);
app.use(process.env.URL_API + '/account_payment', routes.AccPaytRoute);
app.use(process.env.URL_API + '/payment_transaction', routes.PaytTransRoute);
app.use(process.env.URL_API + '/payment', routes.PaymentRoute);

// use middleware to handle error from others modules
app.use(middleware.handleError);
app.use(middleware.notFound);

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
	if (dropDatabaseSync) {
		console.log('Database do not drop');
	}
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`);
	});
});

export default app;
