//Total number of synopsis is 322
//Total number of companies is 178

var _ = require('underscore');
var allot = require('../app/data/allot');
var synopsis = require('./synopsisData');
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
}).value();

var companyWithIds = _(allot).chain().flatten().map(function(val,key) {
	var company = {};
	company.name = val.StationName;
	company.idno = val.IDNumber;
	return company;
}).value();


var synopsisWithCompany = _(synopsis).chain().flatten().map(function(synopsis) {
	var id = synopsis.idno;
	for(i=0; i< companyWithIds.length; i++) {
		var idFromAllot = companyWithIds[i].idno;
		if(idFromAllot.indexOf(synopsis.idno) != -1) {
			synopsis.company = companyWithIds[i].name;
		}
	}
	return synopsis;
}).value();

fs.writeFile("synopsisWithCompany.json", JSON.stringify( synopsisWithCompany ), "utf8");

//console.log(synopsisWithCompany);