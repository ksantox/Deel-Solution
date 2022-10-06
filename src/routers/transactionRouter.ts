import { Request, Response, Router } from "express";

import getProfile from "../middleware/getProfile";
import { TransactionController } from "../controllers";

const TransactionRouter: Router = Router();

TransactionRouter.post("/balances/deposit/:userId", getProfile, async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.userId);
        const depositAmount: number = req.body.amount || 100;

        if(depositAmount <= 0) {
            res.status(400).end();
            return;
        }

        await TransactionController.Instance.depositToClient(id, depositAmount);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

export default TransactionRouter;