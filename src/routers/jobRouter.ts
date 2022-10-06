import { Request, Response, Router } from "express";

import { Job, Profile } from "../model";
import { PROFILE_TYPES } from "../utils/enums";
import { JobController } from "../controllers";
import getProfile from "../middleware/getProfile";

const JobRouter: Router = Router();

JobRouter.get("/jobs/unpaid", getProfile, async (req: Request, res: Response): Promise<void> => {
    const unpaidJobs: Array<Job> = await JobController.Instance.fetchAllUnpaidProfileJobs(req.profile);

    if(!unpaidJobs) {
        res.status(404).end();
        return;
    }

    res.json(unpaidJobs);
});

JobRouter.post("/jobs/:job_id/pay", getProfile, async (req: Request, res: Response): Promise<void> => {
    try {
        const profile: Profile = req.profile;
        const id: number = parseInt(req.params.job_id);

        if(profile.type !== PROFILE_TYPES.CLIENT) {
            res.status(400).end();
            return;
        }

        await JobController.Instance.payJob(id, req.profile);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

export default JobRouter;