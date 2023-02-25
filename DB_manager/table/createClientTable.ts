import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import { clientModel } from "../model/client"

type ClinentSchemaModel = Model<clientModel>

export interface clientInterface {
    Schema: ModelStatic<ClinentSchemaModel>
    insert: (client: Omit<clientModel, "ID">) => Promise<clientModel>
}


export async function createTable(sequelize: Sequelize): Promise<clientInterface> {
    const clientSchema = sequelize.define<ClinentSchemaModel>("Client", {
        ID: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        First_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Last_name: {
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
    
    await clientSchema.sync({ })
    return {
        Schema: clientSchema,
        async insert(Client) {
            const result = await clientSchema.create(Client as clientModel)
            return result.toJSON();
        },
    };
}
