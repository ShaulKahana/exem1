import { createTables, getConnection } from "./createTables";


async function main() {
    const connection = getConnection();
    const DB = await createTables();
    const client1 = await DB.Client.insert({
        First_name: "Yaki",
        Last_name: "lala",
        Address: "ertrtr",
        Phone_Number: "0506421356"
    });
    console.log(client1);

    const product1 = await DB.Product.insert({
        Product_Name: "TypeScript1",
        Product_description: "TypeScript1",
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


    // const s = await DB.Student.getStudent(student.id)
    // console.log("Student: %j", s);

    // const s2 = await DB.studentCourse.getStudentWithCurses(student.id)
    // console.log("Student with courses: %j", s2);

    // const s3 = await DB.studentCourse.getStudentWithCursesLazy(student.id)
    // console.log("Student with courses lazy: %j", s3);
}

main().then(() => {
    console.log("Exiting")
})

