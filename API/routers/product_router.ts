import express, { Request, Response } from "express"
import { DB }  from "../../DB_manager/index"


export function ProductRouter(db: DB) {
    const productRouter = express.Router();


    productRouter.post("/:sellerID", async (req: Request, res: Response) => {
        const { sellerID } = req.params;

        const seller = await db.seller.searchById(sellerID)

        if (!seller) {
            res.status(404).json({ status: 'not found' });
        }
        else {
            const Product = await db.Product.insert(req.body, sellerID);
            res.status(200).json(Product);
        }
    })
    
   return productRouter;
}
