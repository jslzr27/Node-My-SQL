var mySql = require("my-sql");
var inquirer = require("inquirer");
var chalk = require("chalk");
var Table = require("cli-table3");

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

//Function that displays all the options to choose from

function start(){
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Hello, these are your options, please pick one",
            choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add a new product', 'Exit'],
        })
        .then(function(answer){
            switch(answer.action){

                case 'View products for sale':
                    forSale();
                    break;

                case 'View low inventory':
                    lowInventory();
                    break;

                case 'Add to inventory':
                    addToInventory();
                    break;

                case 'Add a new product':
                    addNew();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        })
}

function forSale () {
    connection.query('SELECT * FROM products', function(err, res) {
        if(err) throw err;
        var table = new Table ({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
        });
        var divider = (chalk.magenta("--------------------------------------------------------------------------------------------------------------------"));
        console.log(divider)
        console.log("\n\nHere is a list of all the products on inventory\n");
        console.log(divider);
        for(var i = 0; i < res.length; i++){
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        console.log(divider + '\n');
        start();
    });
}

function lowInventory () {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5',
        function(err, res){
            if(err) throw err;
            if(res.length === 0){
                var divider = (chalk.magenta("--------------------------------------------------------------------------------------------------------------------"));
                console.log(divider)
                console.log("\nThere are currently 0 items with low inventory");
                console.log(divider + '\n');
                start();
            } else {
                var table = new Table ({
                    head: ['Item ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
                });
                var divider = (chalk.magenta("--------------------------------------------------------------------------------------------------------------------"));
                console.log(divider)
                console.log("\n\nHere is a list of all the products with low inventory\n");
                console.log(divider);
                for(var i = 0; i < res.length; i++){
                    table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
                }
                console.log(table.toString());
                console.log(divider + '\n');
                start();
            }
        });
}

function addToInventory() {
    var items = [];
    connection.query('SELECT product_name FROM products', function(err, res){
        if(err) throw err;
        for(var i = 0; i <res.length; i++){
            items.push(res[i].product_name)
        }

        inquirer
            .prompt({
                name: "choices",
                type: "checkbox",
                message: "Please select the product that you would like to add inventory for",
                choices: items
            })
            .then({
                function (user) {
                    if(user.choices.length === 0) {
                        console.log("\n\nYou didn't select anything")
                        start();
                    } else{
                        addInv(user.choices);
                        console.log(user.choices);
                    }
                }
            })

    })
}

function addInv(names) {
    var item = names.shift();
    var items;
    connection.query('SELECT stock_quantity FROM products WHERE ?', {product_name: item}, function(err, res){
        if(err) throw err;
        items = res[0].stock_quantity;
        items = parseInt(items);
    });

    inquirer
        .prompt({
            name: "quantity",
            type: "text",
            message: "How many " + item + " would you like to add",
            validate: function(value){
                if(isNaN(value) === false) {
                    return true
                } console.log(" Sorry that's not a valid number"); return false;
            },
        })
        .then(function(user){
            var amount = user.quantity;
            amount = parseInt(amount);

            connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: items.amount}, {product_name: item}], 
                function(err){
                if(err) throw err;
            });
            if(names.length != 0){ addInv(names);}
            else{console.log("Your inventory has been updated."); start();}
        })
}

function addNew(){
    var departments = new Array();
    connection.query('SELECT department_name from departments', function(err, res) {
        
        if(err) throw err; 
        for(var i = 0; i < res.length; i++){
            departments.push(res[i].department_name);
        }
        console.log(departments);
    });


    

    inquirer
        .prompt(
        {
            name: "product",
            type: "text",
            message:"Please enter the name of the product you would like to add",
        },
        {
            name: "department",
            type: "list",
            message: "Please select which department you would like to put the product in",
            choices: departments,
        }, {
            name: "price",
            type: "text",
            message: "Please enter the price for the product",
            validate: function(value){
                if(isNaN(value) === false) {
                    return true
                } console.log(" Sorry that's not a valid number"); return false;
            },
        },
        {
            name: "stock",
            type: "text",
            message: "Please enter the quantity to be stocked into inventory",
            validate: function(value){
                if(isNaN(value) === false) {
                    return true
                } console.log(" Sorry that's not a valid number"); return false;
            },
        }
        )
        .then(function(user){
            var item = {
                product_name: user.product,
                department_name: user.department,
                price: user.price,
                stock_quantity: user.stock,
            }
            connection.query("INSERT INTO products SET ?", item, function(err){
                if(err) throw err;
                console.log(item.product_name + "has been added to your inventory");
                start();
            })
        })
}