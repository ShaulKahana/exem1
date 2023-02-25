import express, { Request, Response } from "express"
import { DB }  from "../../DB_manager/index"


export function PurchaseRouter(db: DB) {
    const purchaseRouter = express.Router();
    
    purchaseRouter.post("/:product_ID/:Customer_ID", async (req: Request, res: Response) => {
        const { product_ID, Customer_ID} = req.params;

        const product = await db.Product.searchById(product_ID)
        const customer = await db.Client.searchById(Customer_ID)

        if (!product || !customer) {
            res.status(404).json({ status: 'not found' });
        }
        else {
            const client = await db.Purchase_details.insert(req.body, req.params.product_ID, req.params.Customer_ID);
            res.status(200).json(client);
        }
    })
    
   return purchaseRouter;
}
