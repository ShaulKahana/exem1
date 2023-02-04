import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { purchase_details } from "./model/purchase_details";
import {clientInterface  } from "./createClientTable";
import { productInterface } from "./createProdutTable";


type purchase_detailsSchemaModel = Model<purchase_details>

export interface purchase_detailsInterface {
  Schema: ModelStatic<purchase_detailsSchemaModel>
  insert: (purchase_details: Omit<purchase_details, "Purchase_number"> ) => Promise<purchase_details>
}

export async function createTable(sequelize: Sequelize, Product: productInterface["Schema"], Client: clientInterface["Schema"]): Promise<purchase_detailsInterface> {

  const purchase_detailsSchema = sequelize.define<purchase_detailsSchemaModel>('Purchase_details', {
    Purchase_number: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    purchase_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discount_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Date_of_purchase: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
} as any, {
  schema: "store_managment",
  createdAt: false,
})


  Product.belongsToMany(Product, { through: purchase_detailsSchema })
  Client.belongsToMany(Client, { through: purchase_detailsSchema })
  await purchase_detailsSchema.sync({ })

  return {
    Schema: purchase_detailsSchema,
    async insert(Purchase_details) {
      const result = await purchase_detailsSchema.create(Purchase_details as purchase_details)
      return result.toJSON();
    }
  }
}

