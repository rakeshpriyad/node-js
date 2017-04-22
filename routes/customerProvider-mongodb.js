var customersTable = 'customers';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

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
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.findOne({
					_id:customers.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};
	
	this.insertCustomer = function(user, cb) {
		console.log('inserting user: ' + user);
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.insert([user], function() {
					cb(null, user);
				});
			}
		});
	};
	
	this.updateCustomer = function(user, cb) {
		console.log('updateCustomer');
		this.db.collection(customersTable, function(error, customers) {
			if (error) {
				cb(error, null);
			} else {
				customers.update({_id:customers.db.bson_serializer.ObjectID.createFromHexString(user._id)}, 
					{name:user.name, state:user.state, city:user.city}, 
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
				customers.remove({_id:customers.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.CustomerProvider = CustomerProvider;
