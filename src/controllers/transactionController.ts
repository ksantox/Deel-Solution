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
        throw new Error("Not Implemented!");
    }
}

export default TransactionController;