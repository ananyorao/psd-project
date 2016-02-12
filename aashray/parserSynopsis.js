var pdfText = require('pdf-text');

var pathToPdf = __dirname + "/test.pdf";

var fs = require('fs');
var buffer = fs.readFileSync(pathToPdf);
var answer = "";
var answers = [];
var student = {};
var isans = false;
var _ = require('underscore');

pdfText(buffer, function(err, chunks) {
	student.name = chunks[3];
	student.idno = chunks[5];
	student.email = chunks[7];
	student.domain = chunks[9];
	student.broadArea = chunks[11];
	for(i=0;i<chunks.length;i++) {
		if(chunks[i].indexOf('Ans') != -1) {
			isans = true;
			chunks.splice(i,1);
		} 
		if(chunks[i].indexOf('Que') != -1 || i == chunks.length - 1) {
			isans = false;
			if(i==chunks.length - 1) {
				answer = answer + " "+chunks[chunks.length -1];
			}
			answers.push(answer);
			answer = "";
		}
		if(isans) {
			answer = answer + " "+chunks[i];
		}
	}
	answers.splice(0,1);
	student.projectTitle = answers[0];
	student.subArea = answers[1];
	student.objective = answers[2];
	student.natureOfWork = answers[3];
	student.summary = answers[4];
	student.projectContribution = answers[5];
	student.futureScope = answers[6];

	
	console.log(student);
});

