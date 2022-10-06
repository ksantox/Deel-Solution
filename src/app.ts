import bodyParser from "body-parser";
import express, { Application } from "express";

import { sequelize } from "./model";
import JobRouter from "./routers/jobRouter";
import AdminRouter from "./routers/adminRouter";
import ContractRouter from "./routers/contractRouter";
import TransactionRouter from "./routers/transactionRouter";

const app: Application = express();
app.use(bodyParser.json());

app.use(JobRouter);
app.use(AdminRouter);
app.use(ContractRouter);
app.use(TransactionRouter);

app.set("sequelize", sequelize);
app.set("models", sequelize.models);

export default app;