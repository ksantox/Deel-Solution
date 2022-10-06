import { Op } from "sequelize";

import { Contract, Profile } from "../model";
import { CONTRACT_STATUSES, PROFILE_TYPES } from "../utils/enums";

class ContractController {
    //#region Singleton

    static instance: ContractController;

    static get Instance(): ContractController {
        if(!ContractController.instance) {
            ContractController.instance = new ContractController();
        }

        return ContractController.instance;
    }

    //#endregion

    async fetchContractById(id: number): Promise<Contract> {
        return await Contract.findOne({ where: { id } }) as Contract;
    }

    async fetchAllProfileContracts(profile: Profile): Promise<Array<Contract>> {
        const profileField: string = profile.type === PROFILE_TYPES.CLIENT ? "ClientId" : "ContractorId";

        const activeContracts: Array<Contract> = await Contract.findAll({
            where: {
                [profileField]: profile.id,
                status: { [Op.ne]: CONTRACT_STATUSES.TERMINATED }
            }
        });

        return activeContracts;
    }
}

export default ContractController;