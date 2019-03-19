function drawLineGraph(points) {
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title:{
			text: "Graph of Probability mass function"             
		}, 
		toolTip: {
			shared: true
		},
		legend:{
			cursor:"pointer",
			itemclick: toggleDataSeries
		},
		data: [{        
			type: "spline",  
			name: "P(x) at x",        
			showInLegend: true,
			dataPoints: points
		}]
	});
	
	chart.render();
	
	function toggleDataSeries(e) {
		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;            
		}
		chart.render();
	}
	
	}

function geometric() {
		
		var k1=parseInt(document.getElementById("k1").value);	
		var k2=document.getElementById("k2").value;
		var max=document.getElementById("max").checked;
		var p=parseFloat(document.getElementById("pg").value);
		var result=0;

		if ((k2.length==0) && (max==false)) {
			result=Math.pow((1-p),k1-1)*p;
		}else if(max){
			result=1-Math.pow((1-p),k1);
		}else if(k2.length!=0){
			var temp=parseInt(k2);
			
			for (var i = k1; i <= temp; i++) {
				result+=Math.pow((1-p),i-1)*p;
			}

		}
	
	document.getElementById("geo_result").innerHTML=result;
}	

function binomial() {
	
	var k1=parseInt(document.getElementById("k_1").value);	
	var k2=document.getElementById("k_2").value;
	var r=parseInt(document.getElementById("r").value);	
	var p=parseFloat(document.getElementById("p").value);
	var result=0;
	
	if (k2.length==0) {

		var c=factorial(k1-1)/(factorial(r-1)*(factorial(k1-r)));
		result=c*Math.pow(1-p,k1-r)*Math.pow(p,r);

	}else{
		document.getElementById("chart").innerHTML = '<div id="chartContainer" style="height: 300px; width: 100%;  border: 1px solid #dddddd;"></div>'
		var array=[];  //contains value for mass function
		let points ='[';
		var temp=parseInt(k2);
		var c;var count=0;
		for (var i = k1; i <= temp; i++) {
			c=factorial(i-1)/(factorial(r-1)*(factorial(i-r)));
			res=Math.pow(1-p,i-r)*Math.pow(p,r);
			array[count]=c*res;
			result+=c*res;
			count++;		
		}
		for (var i = 0; i<array.length; i++){
			if(i===array.length-1) 
			points+=`{ "x": `+k1+`,"y":`+Math.round(array[i]*10000)/10000+`}]`;
			else
			points+=`{ "x": `+k1+`,"y":`+Math.round(array[i]*10000)/10000+`},`;
			k1++;
		}
		drawLineGraph(JSON.parse(points))
	}
	document.getElementById("bin_result").innerHTML=result;
	// document.getElementById("dump").innerHTML=array;
}

function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

function fprint() {
	window.print();
  }