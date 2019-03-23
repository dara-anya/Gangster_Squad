-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS libellum;
-- Creates the "blogger" database --
CREATE DATABASE libellum;

CREATE TABLE `tbl_stores` (
	`store_id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`store_name` VARCHAR( 255) NOT NULL,
	`phone` VARCHAR( 155 ) NOT NULL,
	`username` VARCHAR( 255 ) NOT NULL,
	`password` Int(11) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `store_id` )
);

CREATE TABLE `tbl_inventory` (
	`item_id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`item` VARCHAR( 255) NOT NULL,
	`price` int( 255 ) NOT NULL,
	`units_avai` VARCHAR( 255 ) NOT NULL,
	`category` varchar(11) NOT NULL,
	`description` varchar(255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `item_id` )
);

CREATE TABLE `tbl_customer` (
	`customer_id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`fName` VARCHAR( 255) NOT NULL,
	`lName` VARCHAR( 255 ) NOT NULL,
	`address` VARCHAR( 255 ) NOT NULL,
	`phone` varchar(11) NOT NULL,
	`email` varchar (255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `customer_id` )
);

CREATE TABLE `tbl_invoice` (
	`invoice_id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`invoice_Date` datetime  NOT NULL,
	`store_id` int( 11 ) NOT NULL, 
	`customer_id` int( 11 ) NOT NULL,
	`item_id` Int(11) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `invoice_id` ),
	CONSTRAINT `fk_store` FOREIGN KEY (`store_id`) REFERENCES `tbl_stores` (`store_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `tbl_customer` (`customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
	CONSTRAINT `fk_inventory` FOREIGN KEY (`item_id`) REFERENCES `tbl_inventory` (`item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
    
);