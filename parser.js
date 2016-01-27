var pdfText = require('pdf-text');

var pathToPdf = __dirname + "/test.pdf";

var fs = require('fs');
var buffer = fs.readFileSync(pathToPdf);
var student = {};
var questions = [];

pdfText(buffer, function(err, chunks) {
	/*
	student.name = chunks[3];
	student.id = chunks[5];
	student.email = chunks[7];
	student.domain = chunks[9];
	student.broadArea = chunks[11];
	*/
	console.log(chunks);
});

var details = [];

var stringStartsWith = function(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}