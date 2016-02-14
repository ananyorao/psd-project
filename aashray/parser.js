var pdfText = require('pdf-text');

var pathToPdf = __dirname + "/feedback.pdf";

var fs = require('fs');
var buffer = fs.readFileSync(pathToPdf);
var student = [];
var questions = {};
var _ = require('underscore');

pdfText(buffer, function(err, chunks) {
	console.log(chunks);
	/*
	student.name = chunks[3];
	student.id = chunks[5];
	student.email = chunks[7];*/
	//student.domain = chunks[9];
	//student.broadArea = chunks[11];
	
	//console.log(chunks);
	student=chunks;
	//console.log(student);
	var i=0;
	var temp=0;
	var questions=[];

	for( i=0;i<student.length;i++){
		
	questions[0]+=student[i];
	
}

	for( i=0;i<student.length;i++){
		
	if(student[i].indexOf("Thailand")>-1){
		if(temp==1){
		break;
		}
		temp++;
	}
}
	flag=0;
	while(i<student.length){
	i=extraction(i,student,flag);
	
	if(i==-1){
		break;
	}
	flag++;
	
	}
	var newsletter = _.map(details, function(val, key){ return val; });
	fs.writeFile("newsletter.json", JSON.stringify( newsletter ), "utf8");
});

var details={}

var extraction=function(index, student,flag){
		details[flag] = {'domain':"",'company':'','name':"",'id':"",'feedback':""};
		while(student[index].indexOf("Company:")==-1 && index<student.length-2 && details[flag]['domain'].length<44){
			if(student[index].indexOf("Mentor Experience")>-1){
				return -1;
			}
			details[flag]['domain']+=student[index];

			index++;
		}
		details[flag]['domain']=details[flag]['domain'].substring(8,this.length);
		while(student[index].indexOf("Name of")==-1 && index<student.length-2 && student[index].indexOf("student:")==-1){
			if(student[index].indexOf("Mentor Experience")>-1){
				return -1;
			}
			details[flag]['company']+=student[index];
			index++;
		}

		details[flag]['company']=details[flag]['company'].substring(9,this.length);

		while(student[index].indexOf("Id:")==-1 && index<student.length-2 && student[index].indexOf("20")==-1){
			if(student[index].indexOf("Mentor Experience")>-1){
				return -1;
			}
			details[flag]['name']+=student[index];
			index++;
		}

		details[flag]['name']=details[flag]['name'].substring(17,this.length);

		while((student[index].indexOf("Discipline")==-1 && index<student.length-2) && details[flag]['id'].length<18 ){
			if(student[index].indexOf("Mentor Experience")>-1){
				return -1;
			}
			details[flag]['id']+=student[index];
			index++;
		}

		details[flag]['id']=details[flag]['id'].substring(3,17);
		/*if(details[flag]['id'].substring(0,1)=='(' && details[flag]['id'].substring(13,14)==')'){
			details[flag]['id']=details[flag]['id'].substring(1,14);
			details[flag]['id']=details[flag]['id'].substring(0,12);

		}

		else if(details[flag]['id'].substring(0,1)=='('){
			details[flag]['id']=details[flag]['id'].substring(1,14);

		}
		else if(details[flag]['id'].substring(12,13)==')'){
			details[flag]['id']=details[flag]['id'].substring(0,12);
		}*/
		if(details[flag]['id'].indexOf("(") !=-1){
			var paran=details[flag]['id'].indexOf("(");
			details[flag]['id']=details[flag]['id'].substring(paran+1,14);
		}
		if(details[flag]['id'].indexOf(")") !=-1){
			var paran=details[flag]['id'].indexOf(")");
			details[flag]['id']=details[flag]['id'].substring(0,paran);
		}

		index ++;
		while((student[index].indexOf("Domain ")==-1 && index<student.length-2) ){
			if(student[index].indexOf("Mentor Experience")>-1){
				return -1;
			}
			details[flag]['feedback']+=student[index];
			index++;
		}
		
		
		return index;
}


var stringStartsWith = function(string, prefix) {
    return string.slice(0, prefix.length) == prefix;
}
