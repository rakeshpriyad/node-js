var customersTable = 'customers';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON =  require('mongodb').BSON
var ObjectID =  require('mongodb').ObjectID;

CustomerProvider = function(host, port) {
	
	this.db = new Db('customers', new Server(host, port));
	this.db.open(function(){});

	this.fetchAllCustomers = function(cb) {
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};
	
	this.fetchCustomerById = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.find({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};
	
	this.fetchCustomerByName = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};
	
	this.insertCustomer = function(customer, cb) {
		console.log('inserting customer: ' + customer);
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.insert([customer], function() {
					cb(null, customer);
				});
			}
		});
	};
	
	this.updateCustomer = function(customer, cb) {
		console.log('updateCustomer');
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.update({_id: collection.db.bson_serializer.ObjectID.createFromHexString(customer._id)}, 
					{name:customer.name, address:customer.address, email:customer.email}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
	
	this.deleteCustomer = function(id, cb) {
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.remove({"_id":id}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.CustomerProvider = CustomerProvider;
