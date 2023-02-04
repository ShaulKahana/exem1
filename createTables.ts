import { Model, Sequelize, DataTypes } from "sequelize";
import { createTable as createClientTable } from "./createClientTable";
import { createTable as createProdutTable } from "./createProdutTable";
import { createTable as createPurchaseTable } from "./createPurchaseTable";




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

    const Client = await createClientTable(connection);
    const Product = await createProdutTable(connection);
    const Purchase_details = await createPurchaseTable(connection, Product.Schema, Client.Schema);
    return {
        Client,
        Product,
        Purchase_details
    }
}