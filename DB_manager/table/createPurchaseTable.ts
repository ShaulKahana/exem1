import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { purchase_details } from "../model/purchase_details";
import {clientInterface  } from "./createClientTable";
import { productInterface } from "./createProdutTable";


type purchase_details_Schema_Model = Model<purchase_details>

export interface purchase_details_Interface {
  Schema: ModelStatic<purchase_details_Schema_Model>
  insert: (purchase_details: Omit<purchase_details, "Purchase_number">, product_ID:string, Customer_ID:string ) => Promise<purchase_details>
}

export async function createTable(sequelize: Sequelize, Product: productInterface["Schema"], Client: clientInterface["Schema"]): Promise<purchase_details_Interface> {

  const purchase_details_Schema = sequelize.define<purchase_details_Schema_Model>('Purchase_details', {
    Purchase_number: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    purchase_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
} as any, {
  schema: "store_managment",
  createdAt: false,
});


  Product.belongsToMany(Client, { through: purchase_details_Schema })
  Client.belongsToMany(Product, { through: purchase_details_Schema })
  await purchase_details_Schema.sync({})

  return {
    Schema: purchase_details_Schema,
    async insert(Purchase_details, product_ID, Customer_ID) {
      Purchase_details.Product_ID = product_ID
      Purchase_details.Customer_ID = Customer_ID
      const result = await purchase_details_Schema.create(Purchase_details as purchase_details)
      return result.toJSON();
    }
  }
}

