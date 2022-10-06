import { Request, Response, Router } from "express";

import getProfile from "../middleware/getProfile";
import { ContractController } from "../controllers";
import { Contract, Profile } from "../model";

const ContractRouter: Router = Router();

ContractRouter.get("/contracts", getProfile, async (req: Request, res: Response): Promise<void> => {
    const activeContracts: Array<Contract> = await ContractController.Instance.fetchAllProfileContracts(req.profile);

    if(!activeContracts) {
        res.status(404).end();
        return;
    }

    res.json(activeContracts);
});

ContractRouter.get("/contracts/:id", getProfile, async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id);
        const profile: Profile = req.profile;

        const contract: Contract = await ContractController.Instance.fetchContractById(id);

        if(!contract) {
            res.status(404).end();
            return;
        }

        if(contract.ClientId !== profile.id && contract.ContractorId !== profile.id) {
            res.status(401).end();
            return;
        }

        res.json(contract);
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }
});

export default ContractRouter;