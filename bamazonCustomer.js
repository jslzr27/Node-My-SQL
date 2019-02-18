var mySql = require("my-sql");
var inquirer = require("inquirer");
var chalk = require("chalk");

//Establish the connection to the database
var connection = mySql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "bamazon_db"
})

connection.connect(function(err){
    if(err) throw(err);
    console.log("Connected as id " + connection.threadId + "\n");
    start();
})

function start() {

var linebreaks = "\n\n\n\n\n\n\n\n\n\n";
connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;
    console.log("Welcome to the site. Please select an Item from the list below:\n");
    console.log (chalk.yellow("Item id || Product || Department || Price || Stock"));
    var divider = (chalk.magenta("--------------------------------------------------------------------------------------------------------------------"));
    console.log(divider);
    for(var i = 0; i < res.length; i++){
        console.log(chalk.green(res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity));
    }
    console.log(divider);

    inquirer
        .prompt([{
        name: "product",
        type: "input",
        message: "What is the id of the product you would like to buy?",
        validate: function(value){
            if(isNaN(value) === false) {
                return true
            } return false
        }
    },{
        name: "quantity",
        type: "input",
        message: "How many would you like?",
        validate: function(value){
            if(isNaN(value) === false) {
                return true
            } return false
        }
    }])
       .then(function (productSelect){
           connection.query("SELECT * FROM products WHERE ?", {item_id: productSelect.product}, function(err, res){
                if(err) throw err;
                if(res[0].stock_quantity > productSelect.quantity) {
                    var totalCost = res[0].price * productSelect.quantity;
                    console.log(divider);
                    console.log("Your order has been placed\nYour total is $" + (chalk.green(totalCost.toFixed(2))) + " \nThank you for your order" + linebreaks);

                    var updatedQuantity = res[0].stock_quantity - productSelect.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: updatedQuantity
                    },
                    {
                        product_name: productSelect.product
                    }], function(err, res){

                    });
                    start();
                } else{
                    console.log(divider);
                    console.log("Sorry, we do not have enough in stock.\nPlease try your order again" + linebreaks);
                    console.log(divider);
                    start();
                }
           })
});

});

}
