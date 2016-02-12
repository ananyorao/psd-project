var _ = require('underscore');
var allot = require('../app/data/allot');
var fs = require('fs');


var companyList = _(allot).chain().flatten().pluck('StationName').unique().value();
var domainList = _(allot).chain().flatten().pluck('StationDomain').unique().value();
var companyWithDomain = _(allot).chain().flatten().indexBy('StationName').map(function(val,key) {
	var company = {};
	company.name = key;
	company.domain = val.StationDomain;
	company.stipend = val.Stipend;
	company.editable = "";
	return company;
});

fs.writeFile("companies.json", JSON.stringify( companyWithDomain ), "utf8");
