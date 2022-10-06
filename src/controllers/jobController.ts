import { Job } from "../model";

class JobController {
    //#region Singleton

    static instance: JobController;

    static get Instance(): JobController {
        if(!JobController.instance) {
            JobController.instance = new JobController();
        }

        return JobController.instance;
    }

    //#endregion

    async fetchAllUnpaidProfileJobs(profileId: number): Promise<Array<Job>> {
        throw new Error("Not Implemented!");
    }

    async payJob(id: number): Promise<void> {
        throw new Error("Not Implemented!");
    }
}

export default JobController;