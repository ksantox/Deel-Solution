import { Profile } from "../model";

class AdminController {
    //#region Singleton

    static instance: AdminController;

    static get Instance(): AdminController {
        if(!AdminController.instance) {
            AdminController.instance = new AdminController();
        }

        return AdminController.instance;
    }

    //#endregion

    async getBestProfession(start: string, end: string): Promise<string> {
        throw new Error("Not Implemented!");
    }

    async getBestClients(start: string, end: string, limit: number = 2): Promise<Array<Profile>> {
        throw new Error("Not Implemented!");
    }
}

export default AdminController;