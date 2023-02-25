import express from 'express';
import { main as initDB } from '../DB_manager/index';
import { ProductRouter } from './routers/product_router';
import { SellerRouter } from './routers/seller_router';
import { ClientRouter } from './routers/client_router';
import { PurchaseRouter } from './routers/purchase_router';

export async function main() {
    const app = express()
  
    const db = await initDB()
    app.use(express.json({ limit: "10kb" }))
    app.use("/product", ProductRouter(db))
    app.use("/seller", SellerRouter(db))
    app.use("/client", ClientRouter(db))
    app.use("/purchase", PurchaseRouter(db))
    
    app.listen(8080, () => {
      console.log(`listening on port 8088`)
    })
  }
  