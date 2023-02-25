import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { productModel } from "../model/product";
import{SellerInterface} from "../table/createSellerTable"

type productSchemaModel = Model<productModel>

export interface productInterface {
    Schema: ModelStatic<productSchemaModel>
    insert: (Product: Omit<productModel, "SKU">,seller:string) => Promise<productModel>
    searchById: (id: string) => Promise<productModel|undefined>
    getAllSellersProduct:(sellerId:string) => Promise<Array<productSchemaModel>|undefined>
}


export async function createTable(sequelize: Sequelize,Seller: SellerInterface["Schema"]): Promise<productInterface> {
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
        price_for_customer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }as any, {
        schema: "store_managment",
        createdAt: false
    });

    productSchema.belongsTo(Seller, { foreignKey: 'Product_seller' });

    
    await productSchema.sync({});
    return {
        Schema: productSchema,
        async insert(Product,seller) {
            Product.Product_seller = seller;
            const result = await productSchema.create(Product as productModel)
            return result.toJSON();
        },
        async searchById(id: string) {
            const result = await productSchema.findByPk(id)
            return result?.toJSON();
        },

        async getAllSellersProduct(sellerId) {
            const result = await productSchema.findAll({
                where: {
                    Product_seller: sellerId,
                },
                include: [
                    {
                        through: {
                            attributes: [],
                        }
                    }
                ]
            });

            return (result ? result : undefined);
        }
    };
}



export type productTable = Awaited<ReturnType<typeof createTable>>;
