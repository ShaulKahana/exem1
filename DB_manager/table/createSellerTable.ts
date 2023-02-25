import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { Sellermodel } from "../model/seller"

type SellerSchemaModel = Model<Sellermodel>

export interface SellerInterface {
    Schema: ModelStatic<SellerSchemaModel>
    insert: (Seller: Omit<Sellermodel, "ID">) => Promise<Sellermodel>
    searchById: (id: string) => Promise<Sellermodel|undefined>
    deleteSeller: (company_Number: string) => Promise<boolean>
}


export async function createTable(sequelize: Sequelize): Promise<SellerInterface> {
    const SellerSchema = sequelize.define<SellerSchemaModel>("Seller", {
        Company_Number: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        Name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Phone_Number: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        schema: "store_managment",
        createdAt: false,
    })
    
    await SellerSchema.sync({ })
    return {
        Schema: SellerSchema,
        async insert(Seller) {
            const result = await SellerSchema.create(Seller as Sellermodel)
            return result.toJSON();
        },
        async searchById(id: string) {
            const result = await SellerSchema.findByPk(id)
            return result?.toJSON();
        },
        
        async deleteSeller(company_Number: string) {
            const result = await SellerSchema.destroy({
                where: { Company_Number: company_Number }
            });
            return result === 1;
        }
    };
}
