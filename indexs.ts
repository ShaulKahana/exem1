import { createTables, getConnection } from "./createTables";


async function main() {
    const DB = await createTables();
    const client1 = await DB.Client.insert({
        First_name: "shaol",
        Last_name: "kahana",
        Address: "yeruslem",
        Phone_Number: "0503056114"
    });
    console.log(client1);

    const product1 = await DB.Product.insert({
        Product_Name: "tabel",
        Product_description: "a good tabal",
        price_for_customer: 14.5,
        Satisfying_price: 12.5,
        Stock: 8
    })

    await DB.Purchase_details.insert({
        Customer_ID: client1.ID,
        Product_ID: product1.SKU,
        purchase_price: 15,
        discount_percentage: 11,
        Date_of_purchase:  new Date()
    })

}

main().then(() => {
    console.log("Exiting")
})

