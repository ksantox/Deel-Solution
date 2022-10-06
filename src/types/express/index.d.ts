declare global {
    namespace Express {
        export interface Request {
            profile?: any
        }
    }
}

export {};