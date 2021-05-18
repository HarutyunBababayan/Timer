var res = [];
var started = false;
var xx;
var chkBtn;
var t, txt;

function checkBtn(){
    chkBtn = document.getElementById("btn");
	
    if (!started) {
        started = true;
		t = new Date();
        txt = "<tr><th>Հ/Հ</th><th>Արդյունք</th><th>Հապաղում</th></tr>"; 
        i = 0;
        res = [];
        document.getElementById("listOfRes").innerHTML = "";
        x = setInterval(showTime, 100);
        chkBtn.innerHTML = "Գրանցել";
        if(!document.getElementsByTagName("button")[1]){crtBtn()};
    }
    else{
        result();
    }
}

function keyPressFunction(event){	
	var key = event.which || event.keyCode;
	if(key == 13){
	   checkBtn();
	}
	else if(key == 27){
	   stopFnk();
	}
}


function convertTime(convTm, accur) { // function converts miliseconds to mm:ss.milisecond format, and when accur=1 miliseconds is one digit, when accur=2, miliseconds are two digits. 
	min = parseInt(convTm/60000);
	sec = parseInt((convTm - (min*60000))/1000);	
	milSec = convTm%1000;
	min = add0First(min);
	sec = add0First(sec);
	if(accur == 1){
	   milSec = parseInt(milSec/100);
	}
	else{
	   milSec = parseInt(milSec/10);
	   milSec = add0First(milSec);
	}
	
	return min + ":" + sec + "." + milSec;
}

function showTime() {
    xx = new Date();
    tt = xx.getTime() - t.getTime();
	document.getElementById("demo").innerHTML = convertTime(tt,1);//.toFixed(1);
}


function add0First(nmbr, qntty){
    var nL = nmbr.toString().length; //nL is length of inputed number 


    if( isNaN(parseFloat(nmbr)) && !isFinite(nmbr)){
        console.log("add0First function's arguments should be only numbers!");
    }
    else{
        for(nL; nL<(qntty||2); nL++){
            nmbr = "0" + nmbr;  
        }
        return nmbr;
    }
}



function result(){
    xx = new Date();
    diff = xx.getTime() - t.getTime(); 
	res[i] = diff;
	latency = res[i] - res[0];
	latency = (latency == 0) ? '-': "+ " + convertTime(latency, 2);
	if(i<3){
	   txt += '<tr><td class="num position' + i + '"> ' + (i+1) + ' </td><td class="res position' + i + '"> ' + 
	   convertTime(res[i], 2) + ' </td><td class="latency position' + i +  '"> ' + latency + "</td>"; 
	}
	else{txt += '<tr><td class="num" > ' + (i+1) + ' </td><td class="res"> ' + 
        convertTime(res[i], 2) + ' </td><td class="latency"> ' + latency + "</td>"; 
        }
document.getElementById("listOfRes").innerHTML = txt;
    i++;  
}
    
function crtBtn() {
    var child = document.getElementById("btn");
    child.insertAdjacentHTML('afterend', '<button id="finishBtn" onmousedown="stopFnk()";>Ավարտ</button>');
}

function stopFnk() {
		clearInterval(x); 
		chkBtn.innerHTML = "Վերսկսել";
		started = false;
	}

function scrollFnk() {
    //scrollPos = document.body.scrollTop;
    if((document.body.scrollTop || document.documentElement.scrollTop) > 61) {
        document.getElementById("timer").className = "timer-block timer-block-fixed";
    }
    else{
        document.getElementById("timer").className = "timer-block";
    }
}
