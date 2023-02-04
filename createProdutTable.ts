import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { product } from "./model/product";

type productSchemaModel = Model<product>

export interface productInterface {
    Schema: ModelStatic<productSchemaModel>
    insert: (course: Omit<product, "SKU">) => Promise<product>
}


export async function createTable(sequelize: Sequelize): Promise<productInterface> {
    const productSchema = sequelize.define<productSchemaModel>("Product", {
        SKU: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        Product_Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Product_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price_for_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Satisfying_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        schema: "store_managment",
        createdAt: false
    });
    
    await productSchema.sync();
    return {
        Schema: productSchema,
        async insert(Product) {
            const result = await productSchema.create(Product as product)
            return result.toJSON();
        },
    };
}



export type productTable = Awaited<ReturnType<typeof createTable>>;
