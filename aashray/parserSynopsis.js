//Total 1073 synopsis pdf files
var pdfText = require('pdf-text');
var path = require('path');

var pathToPdf = __dirname + "/test.pdf";

var fs = require('fs');
var students = [];
var _ = require('underscore');

var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk('synopsis', function(err, results) {
  if (err) throw err;
  for(j=0;j<1073;j++) {
  	var buffer = fs.readFileSync(results[j]);
  pdfText(buffer, function(err, chunks) {
  	var answer = "";
	var answers = [];
	var student = {};
	var isans = false;
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
	students.push(student);
	console.log(students.length);
	if(students.length == 1072) {
		fs.writeFile("synopsisData.json", JSON.stringify( students ), "utf8");
	}
	});
  }
});



