import { Model, Sequelize, DataTypes } from "sequelize";
import { createTable as createClientTable } from "./table/createClientTable";
import { createTable as createProdutTable } from "./table/createProdutTable";
import { createTable as createPurchaseTable } from "./table/createPurchaseTable";
import { createTable as createSellerTable } from "./table/createSellerTable";




export function getConnection() {
    const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        database: "store_managment",
        username: 'postgres',
        password: 'atukfvbt10',
    })
    return sequelize;
} 

export async function createTables() {

    const connection = getConnection()

    const seller = createSellerTable(connection);

    const Client = await createClientTable(connection);
    const Product = await createProdutTable(connection,(await seller).Schema);
    const Purchase_details = await createPurchaseTable(connection, Product.Schema, Client.Schema);
    return {
        Client,
        Product,
        Purchase_details
    }
}