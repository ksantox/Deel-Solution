import { Transaction } from "sequelize";
import { PROFILE_TYPES } from "../utils/enums";
import { Contract, Job, Profile, sequelize } from "../model";

class TransactionController {
    //#region Singleton

    static instance: TransactionController;

    static get Instance(): TransactionController {
        if(!TransactionController.instance) {
            TransactionController.instance = new TransactionController();
        }

        return TransactionController.instance;
    }

    //#endregion

    async depositToClient(profileId: number, depositAmount: number): Promise<void> {
        await sequelize.transaction(async (depositTransaction: Transaction) => {
            const profile: Profile = await Profile.findOne({ where: { id: profileId } }) as Profile;

            if(profile.type !== PROFILE_TYPES.CLIENT) {
                throw new Error("Invalid profile target!");
            }

            const sumOfPendingJobs: Array<Job> = await Job.findAll({
                attributes: [[sequelize.fn("sum", sequelize.col("price")), "depositLimit"]],
                where: { paid: null },
                include: {
                    attributes: [],
                    model: Contract,
                    where: { ClientId: profileId }
                },
                transaction: depositTransaction
            });

            const depositLimit: number = sumOfPendingJobs[0].getDataValue("depositLimit");

            if(depositAmount > 0 && depositAmount > depositLimit * 0.25) {
                throw new Error("Deposit limit exceeded!");
            }

            await Profile.update({ balance: profile.balance + depositAmount }, { where: { id: profileId }, transaction: depositTransaction });
        });
    }
}

export default TransactionController;