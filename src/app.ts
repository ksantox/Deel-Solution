import bodyParser from "body-parser";
import express, { Application } from "express";

import { sequelize } from "./model";
import getProfile from "./middleware/getProfile";

const app: Application = express();

app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get("/contracts/:id",getProfile ,async (req, res) =>{
    const { id } = req.params;
    const { Contract } = req.app.get("models");
    const contract = await Contract.findOne({ where: { id } });

    if(!contract) {
        return res.status(404).end();
    }

    res.json(contract);
})

export default app;
