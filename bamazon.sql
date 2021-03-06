DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (200) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(6) NOT NULL,
    stock_quantity INTEGER NOT NULL,
	PRIMARY KEY(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose QuietComfort 35 (Series II) Wireless Headphones", "Electronics", 349.00, 87);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick 4K", "Electronics", 49.99, 350);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Peak Design Everyday Backpack", "Electronics", 289.95, 54);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Optimum Nutrition Gold Standard 100% Whey Protein Powder", "Health & Household", 42.74, 156);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ninja Professional 72oz Countertop Blender", "Kitchen & Dining", 86.99, 201);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Figth Club", "Movies", 8.99, 454);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fossil Mens The Minimalist Watch", "Watches", 71.44, 67);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Steve Madden Men's Batali Sneaker", "Shoes", 53.03, 34);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("All-new Kindle Paperwhite", "Electronics", 99.99, 326);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NOW Vitamin D-3 ", "Health & Household", 8.59, 149);

SELECT * FROM products;


USE bamazon_db;

CREATE TABLE departments (
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO departments (department_name)
VALUES ("Movies");
INSERT INTO departments (department_name)
VALUES ("Music");
INSERT INTO departments (department_name)
VALUES ("Video Games");
INSERT INTO departments (department_name)
VALUES ("Toys & Games");
INSERT INTO departments (department_name)
VALUES ("Beauty & Personal Care");
INSERT INTO departments (department_name)
VALUES ("Health, Household & Baby Care");
INSERT INTO departments (department_name)
VALUES ("Automotive Parts & Accessories");
INSERT INTO departments (department_name)
VALUES ("Garden & Outdoor");
INSERT INTO departments (department_name)
VALUES ("Tools & Home Improvement");
INSERT INTO departments (department_name)
VALUES ("Arts, Crafts & Sewing");
INSERT INTO departments (department_name)
VALUES ("Home & Kitchen");
INSERT INTO departments (department_name)
VALUES ("Office Products");
INSERT INTO departments (department_name)
VALUES ("Grocery & Gourmet Food");
INSERT INTO departments (department_name)
VALUES ("Sports & Outdoors");
INSERT INTO departments (department_name)
VALUES ("Books");
INSERT INTO departments (department_name)
VALUES ("Cell Phones & Accessories");
INSERT INTO departments (department_name)
VALUES ("Clothing, Shoes & Jewelry");
INSERT INTO departments (department_name)
VALUES ("Electronics");
INSERT INTO departments (department_name)
VALUES ("Musical Instruments");
INSERT INTO departments (department_name)
VALUES ("Everything Else"); 

SELECT * FROM departments;