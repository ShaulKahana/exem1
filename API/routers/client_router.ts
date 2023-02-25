import express, { Request, Response } from "express"
import { DB }  from "../../DB_manager/index"


export function ClientRouter(db: DB) {
    const clientRouter = express.Router();



    clientRouter.post('/', async (req: Request, res: Response) => {
        const client = await db.Client.insert(req.body);
        res.status(200).json(client);
    })
    
   return clientRouter;
}
