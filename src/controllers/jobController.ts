import { Transaction } from "sequelize";
import { Contract, Job, Profile, sequelize } from "../model";
import { CONTRACT_STATUSES, PROFILE_TYPES } from "../utils/enums";

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

    async fetchAllUnpaidProfileJobs(profile: Profile): Promise<Array<Job>> {
        const profileField: string = profile.type === PROFILE_TYPES.CLIENT ? "ClientId" : "ContractorId";

        const unpaidJobs: Array<Job> = await Job.findAll({
            where: { paid: null },
            include: {
                attributes: [],
                model: Contract,
                where: { [profileField]: profile.id }
            }
        });

        return unpaidJobs;
    }

    async payJob(id: number, profile: Profile): Promise<void> {
        await sequelize.transaction(async (payTransaction: Transaction) => {
            const jobDetails: Job = await Job.findOne({
                where: { id },
                include: {
                    model: Contract,
                    attributes: ["id", "status"]
                },
                transaction: payTransaction
            }) as Job;

            if(jobDetails.Contract.status === CONTRACT_STATUSES.TERMINATED) {
                throw new Error("Contract is terminated!");
            }

            const price: number = jobDetails.price;
            const client: Profile = await Profile.findOne({ where: { id: profile.id }, transaction: payTransaction }) as Profile;

            if(client.balance < price) {
                throw new Error("Insufficient funds!");
            }

            const contractorId: number = jobDetails.Contract.id;
            const contractor: Profile = await Profile.findOne({ where: { id: contractorId }, transaction: payTransaction }) as Profile;

            await client.decrement("balance", { by: price, transaction: payTransaction });
            await contractor.increment("balance", { by: price, transaction: payTransaction });
            await Job.update({ paid: true, paymentDate: new Date() }, { where: { id }, transaction: payTransaction });
            await Contract.update(
                { status: CONTRACT_STATUSES.TERMINATED }, // missing status completed/finished ??
                { where: { id: jobDetails.Contract.id }, transaction: payTransaction }
            );
        });
    }
}

export default JobController;