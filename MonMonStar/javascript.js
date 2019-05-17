//---------------- RESET 重置 ------------------------
function resetLocalStorage(){
	localStorage.exp = 0;
	localStorage.level = 0;
	localStorage.hungry = 80;
	localStorage.water = 80;
	localStorage.happy = 80;
	localStorage.demand = false;
	localStorage.wanted = "";
}

//-------------- main 選單 ---------------------------
function disArror() {
    arrorLImg.style.visibility = "hidden";
}

function visArror() {
    arrorLImg.style.visibility = "visible";
}

function disSetting() {
    settingList.style.visibility = "hidden";
    settingBackDiv.style.visibility = "hidden";
}

function visSetting() {
    settingList.style.visibility = "visible";
    settingBackDiv.style.visibility = "visible";
}

function OpenDeveloper() {
    window.location.href = "option.html#developerPage";
}

function OpenLocation() {
    window.location.href = "option.html#locationPage";
}

function backToIndex(){
		window.location.href = "index.html";
}
//------------------------ 主畫面 ----------------------
var petName = ["矇矇蛋","糰糰獸","牙骨獸","爆牙獸","戰鬥螺旋獸"]
var petImg = ["img/egg.png","img/baby.png","img/child.png","img/dragon.png","img/bear.png"]

$(function () {
	setPetName();
	setPetImg();
});

function setPetName(){
	$("#petName").html(petName[localStorage.level]);
}

function setPetImg(){
	$("#petImg").attr("src",petImg[localStorage.level]);
}

//------------------------ 背景 ------------------------
function chageBackImg(){
	var url = "url(img/" + $("#backgroundSelect").val() + ".png)";
	$("#mainPage").css("background-image",url);
}

//------------------------- 狀態條 -----------------------
if (!localStorage.hungry) localStorage.hungry = 80;
if (!localStorage.water) localStorage.water = 80;
if (!localStorage.happy) localStorage.happy = 80;
if (!localStorage.demand) localStorage.demand = false;

var progress = $("#container").Progress({
    barColor: '#F89E3A',
    percent: localStorage.hungry
});

var progress1 = $("#container1").Progress({
    barColor: '#5E9DE6',
    percent: localStorage.water
});

var progress2 = $("#container2").Progress({
    barColor: '#FF5255',
    percent: localStorage.happy
});

function setStatement(state){
	if(state >= 100)
	{
		state = 100;
	}
	if(state <= 0)
	{
		state = 0;
	}
		return state;
}

setInterval(function() {
    localStorage.hungry = parseInt(localStorage.hungry) - Math.floor((Math.random() * 5) + 2);
	if(localStorage.VIP == 1) { localStorage.hungry = parseInt(localStorage.hungry) - Math.floor((Math.random() * 5) + 2); }
	localStorage.hungry = setStatement(localStorage.hungry);
    progress.percent(localStorage.hungry);
	if(localStorage.hungry == 0) deadEvent();
}, 10000);

setInterval(function() {
    localStorage.water = parseInt(localStorage.water) - Math.floor((Math.random() * 3) + 2);
	if(localStorage.VIP == 1) { localStorage.water = parseInt(localStorage.water) - Math.floor((Math.random() * 3) + 2); }
	localStorage.water = setStatement(localStorage.water);
    progress1.percent(localStorage.water);
	if(localStorage.water == 0) deadEvent();
}, 15000);

setInterval(function() {
    localStorage.happy = parseInt(localStorage.happy) - Math.floor((Math.random() * 3) + 1);
	if(localStorage.VIP == 1) { localStorage.happy = parseInt(localStorage.happy) - Math.floor((Math.random() * 3) + 1); }
	localStorage.happy = setStatement(localStorage.happy);
    progress2.percent(localStorage.happy);
	if(localStorage.happy == 0) deadEvent();
}, 20000);

function deadEvent()
{
	alert("你這個沒有愛心的人！！！！！！");
	alert("寵物已死亡．．．．．．");
	
	resetLocalStorage();
	backToIndex();
}

//------------------------ 需求事件 --------------------------
localStorage.demand = false;
localStorage.wanted = "";
	
setInterval(function() {
	var sick = Math.floor((Math.random() * 5 + 1));
	
	if(sick == 1 && !JSON.parse(localStorage.demand)){
		localStorage.demand = true;
		localStorage.wanted = "cureImg" + Math.floor((Math.random() * 3) + 1);
		$("#talkImg").css("visibility","visible");
		$("#face").css("visibility","visible");
		$("#face").attr("src","img/" + localStorage.wanted + ".png");
	}
	
    if(localStorage.hungry <= 90 && !JSON.parse(localStorage.demand)){
		localStorage.demand = true;
		localStorage.wanted = "foodImg" + Math.floor((Math.random() * 4) + 1);
		$("#talkImg").css("visibility","visible");
		$("#face").css("visibility","visible");
		$("#face").attr("src","img/" + localStorage.wanted + ".png");
	}
	
	if(localStorage.water <= 90 && !JSON.parse(localStorage.demand)){
		localStorage.demand = true;
		localStorage.wanted = "drinkImg";
		$("#talkImg").css("visibility","visible");
		$("#face").css("visibility","visible");
		$("#face").attr("src","img/" + localStorage.wanted + ".png");
	}
	
	if(localStorage.happy <=90 && !JSON.parse(localStorage.demand)){
		localStorage.demand = true;
		localStorage.wanted = "sportImg" + Math.floor((Math.random() * 3) + 1);
		$("#talkImg").css("visibility","visible");
		$("#face").css("visibility","visible");
		$("#face").attr("src","img/" + localStorage.wanted + ".png");
	}
}, 2000);

function happy()
{
	$("#talkImg").css("visibility","visible");
	$("#face").css("visibility","visible");
	$("#face").attr("src","img/happy.png");
	
	setTimeout(function() {
		$("#talkImg").css("visibility","hidden");
		$("#face").css("visibility","hidden");
		localStorage.demand = false;
		localStorage.wanted = "";
	}, 1000);
}

function unhappy()
{
	$("#talkImg").css("visibility","visible");
	$("#face").css("visibility","visible");
	$("#face").attr("src","img/nothing.png");
	
	localStorage.happy = parseInt(localStorage.happy) - Math.floor((Math.random() * 8) + 4);
	setStatement(localStorage.happy);
	progress2.percent(localStorage.happy);
	
	setTimeout(function() {
		$("#talkImg").css("visibility","hidden");
		$("#face").css("visibility","hidden");
		localStorage.demand = false;
		localStorage.wanted = "";
	}, 1000);
}
//------------------------ 經驗 -------------------------------
if(!localStorage.exp) localStorage.exp = 0;
if(!localStorage.level) localStorage.level = 0;

function setExp(exp) {
    localStorage.exp = parseInt(localStorage.exp) + exp;
	if(localStorage.VIP == 1) { localStorage.exp = parseInt(localStorage.exp) + exp; }
}

setInterval(function(){
	if (parseInt(localStorage.exp) >= 100) {
        localStorage.exp = 100;
        $("span#exp").html(100);
		if(localStorage.level <= 3)
		{
			localStorage.level = parseInt(localStorage.level) + 1;
			localStorage.exp = 0;
			$("span#exp").html(0);
			setPetName();
			setPetImg();
		}
    } 
	else if (parseInt(localStorage.exp) <= 0) {
        localStorage.exp = 0;
        $("span#exp").html(0);
    };
    $("span#exp").html(localStorage.exp);
}, 100);

//---------------------- 拖拉 ----------------------------------
$(function(){
		$( "#petImg" ).droppable({
			drop: function( event, ui ) {
				var dragItemID = $(ui.draggable).attr("id");
				
				if(dragItemID == "foodImg1" || dragItemID == "foodImg2" || dragItemID == "foodImg3" || dragItemID == "foodImg4"){
					if(dragItemID == localStorage.wanted)
					{
						localStorage.hungry = parseInt(localStorage.hungry) + 10;
						localStorage.hungry = setStatement(localStorage.hungry);
						progress.percent(localStorage.hungry);
						setExp(Math.floor((Math.random() * 9) + 2));
						happy();
					}
					else
					{
						unhappy();
					}
				}
				else if(dragItemID == "drinkImg"){
					if(dragItemID == localStorage.wanted)
					{
						localStorage.water = parseInt(localStorage.water) + 10;
						setStatement(localStorage.water);
						progress1.percent(localStorage.water);
						setExp(1);
						happy();
					}
					else
					{
						unhappy();
					}
				}
				else
				{
					if(dragItemID == localStorage.wanted)
					{
						localStorage.happy = parseInt(localStorage.happy) + 10;
						setStatement(localStorage.happy);
						progress2.percent(localStorage.happy);
						setExp(5);
						happy();
					}
					else
					{
						unhappy();
					}
				}
			 }
		});
});