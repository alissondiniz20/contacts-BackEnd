import express from 'express';
import { router } from './routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/contato", router)

app.listen(3000);