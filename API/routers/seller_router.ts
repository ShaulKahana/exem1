import express, { Request, Response } from "express"
import { DB }  from "../../DB_manager/index"


export function SellerRouter(db: DB) {
    const sellerRouter = express.Router();

    sellerRouter.post('/', async (req: Request, res: Response) => {
        const seller = await db.seller.insert(req.body);
        res.status(200).json(seller);
    })

    sellerRouter.get('/:sellerId/product/', async (req: Request, res: Response) => {
        const {seller_Id} = req.params;

        const sellerExit = await db.seller.searchById(seller_Id)
        const restult = await db.Product.getAllSellersProduct(seller_Id)

        if (!sellerExit || !restult) {
            res.status(404).json({ status: 'not found' });
        }
        else {
            res.status(200).json(restult);
        }
    })

    sellerRouter.get('/:sellerId/purchase/', async (req: Request, res: Response) => {
        const {seller_Id} = req.params;

        const sellerExit = await db.seller.searchById(seller_Id)
        const restult = await db.Purchase_details.getAllSellerspurchase(seller_Id)

        if (!sellerExit || !restult) {
            res.status(404).json({ status: 'not found' });
        }
        else {
            res.status(200).json(restult);
        }
    })

    sellerRouter.delete('/:sellerId', async (req: Request, res: Response) => {
        const sellerId = req.params.sellerId;

        const seller = await db.seller.deleteSeller(sellerId);
        if (seller) {
            return res.status(200).json({ status: 'deleted' });
        } else {
            return res.status(404).json({ status: 'not found' });
        }
    });
    
   return sellerRouter;
}
