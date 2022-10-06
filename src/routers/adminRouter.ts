import { Request, Response, Router } from "express";

import { AdminController } from "../controllers";
import getProfile from "../middleware/getProfile";
import { Profile } from "../model";

const AdminRouter: Router = Router();

AdminRouter.get("/admin/best-profession", getProfile, async (req: Request, res: Response): Promise<void> => {
    const endDate: any = req.query?.end;
    const startDate: any = req.query?.start;

    const bestProfession: string = await AdminController.Instance.getBestProfession(startDate, endDate);

    if(!bestProfession) {
        res.status(404).end();
        return;
    }

    res.json(bestProfession);
});

AdminRouter.post("/admin/best-clients", getProfile, async (req: Request, res: Response): Promise<void> => {
    try {
        const limit: any = req.query?.limit;
        const endDate: any = req.query?.end;
        const startDate: any = req.query?.start;

        const bestClients: Array<Profile> = await AdminController.Instance.getBestClients(startDate, endDate, limit);

        if(!bestClients) {
            res.status(404).end();
            return;
        }

        res.json(bestClients);
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

export default AdminRouter;