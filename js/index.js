var resultArray = [];

window.onload = function() {
		var fileInput1 = document.getElementById('fileInput1');
		var fileInput2 = document.getElementById('fileInput2');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput1.addEventListener('change', function(e) {
			var file = fileInput1.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					//fileDisplayArea.innerText = reader.result;

					var lines = this.result.split('\n');
				    for(var line = 0; line < lines.length; line++){
				    	var wordArray = lines[line].split('=')
				    	if(wordArray.length > 1) {
				    		wordArray[1] = wordArray[1].substring(0, wordArray[1].length-1);
				    		resultArray.push(wordArray);
				    	}
				    }
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});

		fileInput2.addEventListener('change', function(e) {
			var file = fileInput2.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					//fileDisplayArea.innerText = reader.result;

					var lines = this.result.split('\n');
					var i = 0;
				    for(var line = 0; line < lines.length; line++){
				    	var wordArray = lines[line].split('=');
				    	if(wordArray.length > 1) {
				    		wordArray[1] = wordArray[1].substring(0, wordArray[1].length-1);
				    		if (resultArray[i][0] == wordArray[0]) {
				    			resultArray[i].push(wordArray[1]);
				    			//console.log(resultArray[1] + " , " + (getTextWidth(resultArray[i][1], "10pt arial").width - getTextWidth(resultArray[i][2], "10pt arial").width));
				    			resultArray[i].push((getTextWidth(resultArray[i][1], "10pt arial").width - getTextWidth(resultArray[i][2], "10pt arial").width)+"px");
				    			i++;
				    		} else {
				    			var flag = false;
				    			for(var j = i; j < resultArray.length; j++) {
				    				if (resultArray[j][0] == wordArray[0]) {
				    					resultArray[j].push(wordArray[1]);
				    					//console.log(resultArray[1] + " , " + (getTextWidth(resultArray[j][1], "10pt arial").width - getTextWidth(resultArray[j][2], "10pt arial").width));
				    					resultArray[j].push((getTextWidth(resultArray[j][1], "10pt arial").width - getTextWidth(resultArray[j][2], "10pt arial").width)+"px");
				    					flag = true;
				    					break;
				    				}
				    			}
				    			if(!flag) {
				    				console.log("No match found for : " + wordArray[0]);
				    			}
				    		}
				    	}
				    }
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!"
			}
		});

	getTextWidth = function(text, font) {
	    // if given, use cached canvas for better performance
	    // else, create new canvas
	    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	    var context = canvas.getContext("2d");
	    context.font = font;
	    var metrics = context.measureText(text);
	    return metrics;
	};
}

function getResult() {
	
	console.log(JSON.stringify(resultArray));

	var csvContent = "data:text/csv;charset=utf-8,";
	resultArray.forEach(function(infoArray, index){
		dataString = infoArray.join(",");
		csvContent += dataString+ "\n";
	});

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "my_data.csv");

	link.click();
}