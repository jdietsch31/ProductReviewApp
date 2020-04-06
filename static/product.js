function Product(data) {
    this.id = ko.observable(data.id);
    this.username = ko.observable(data.createdby);
    this.body = ko.observable(data.body);
    this.timestamp = ko.observable(data.timestamp);
}

function ProductListViewModel() {
    var self = this;
    self.products_list = ko.observableArray([]);
    self.username= ko.observable();
    self.body= ko.observable();

    self.addProduct = function() {
	self.save();
	self.username("");
	self.body("");
    };

    $.getJSON('/api/v2/products', function(productModels) {
	var t = $.map(productModels.products_list, function(item) {
	    return new Product(item);
	});
	self.products_list(t);
    });

    self.save = function() {
	return $.ajax({
	    url: '/api/v2/products',
	    contentType: 'application/json',
	    type: 'POST',
	    data: JSON.stringify({
		'username': self.username(),
   		 'body': self.body(),
	    }),
	    success: function(data) {
          alert("success")
		      console.log("Pushing to users array");
		      self.push(new Prouct({ username: data.username,body: data.body}));
		      return;
	    },
	    error: function() {
		return console.log("Failed");
	    }
	});
    };
}

ko.applyBindings(new ProductListViewModel());
