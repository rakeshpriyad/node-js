


function getCustomerProvider(){
	var mongoServer = 'localhost';
	var mongoPort = 27017;
	var CustomerProvider = require('./customerProvider-mongodb').CustomerProvider;
	var customerProvider = new CustomerProvider(mongoServer, mongoPort);
	return customerProvider;
}

var customerProvider =  getCustomerProvider();
/*
 * GET customers listing.
 */
exports.list = function(req, res){
	customerProvider.fetchAllCustomers(function(error, customers) {
			//res.send(customers);
			res.render('customers',{page_title:"Customers ",data:customers});
	});
  
};


exports.get = function(req, res){
		customerProvider.fetchCustomerById(req.params.id, function(error, customer) {
			if (customer == null) {
				res.send(error, 404);
			} else {
				res.send(customer);
			}
		});
	};
	
exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers "});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    //var id= "ObjectId(\"" + req.params.id +"\")";
	customerProvider.fetchCustomerById(req.params.id, function(error, customer) {
			
				//res.send(customer);
				res.render('edit_customer',{page_title:"Edit Customers ",customer});
			
		});
};

/*Save the customer*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
		console.log('posting customer');
		console.log(req.body);
		customerProvider.insertCustomer(req.body, function(error, customer) {
			if (error) {
				res.send(error, 500);
			} else {
				res.send(customer);
			}
		});
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    customerProvider.fetchCustomerById(req.params.id, function(error, customers) {
			if (error)
				console.log("Error Updating : %s ",err );
			
			res.redirect('/customers');
			
		});
};


exports.delete_customer = function(req,res){
          
     var id = req.params.id;
    
	customerProvider.deleteCustomer(req.params.id, function(error, customers) {
			if (error) {
				res.send(error, 404);
			} else {
				res.redirect('/customers');
			}
		});
     
};
