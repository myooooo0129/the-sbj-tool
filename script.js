function add(id){

let x=document.getElementById(id);

x.value=Number(x.value)+1;

update();
updateZoneProb();
saveData();
bump(id);

}




function update(){

let game=Number(document.getElementById("game").value);
let suika=Number(document.getElementById("suika").value);

if(suika>0){

document.getElementById("suikaProb").innerText="1/"+(game/suika).toFixed(2);

}

let normal=Number(document.getElementById("suikaNormal").value);
let direct=Number(document.getElementById("suikaDirect").value);

if(direct>0){

document.getElementById("suikaDirectProb").innerText="1/"+(normal/direct).toFixed(2);

}

updateMoveProb();
updateTriggerProb();

saveData();

}



let totalStay=0;
let history=[];



function calcStay(){

let start=Number(document.getElementById("startG").value);
let end=Number(document.getElementById("endG").value);

let stay=end-start;

history.push(stay);

totalStay+=stay;

document.getElementById("totalStay").innerText=totalStay;

document.getElementById("startG").value="";
document.getElementById("endG").value="";

updateTriggerProb();

saveData();

}



function undoStay(){

if(history.length>0){

let last=history.pop();

totalStay-=last;

document.getElementById("totalStay").innerText=totalStay;

updateTriggerProb();

saveData();

}

}



function updateMoveProb(){

let noReact=Number(document.getElementById("noReact").value);
let high=Number(document.getElementById("high").value);
let direct=Number(document.getElementById("direct").value);

let total=noReact+high+direct;

if(total>0){

document.getElementById("moveProb").innerText=
"無反応 "+(noReact/total*100).toFixed(1)+"% / "+
"高確 "+(high/total*100).toFixed(1)+"% / "+
"直撃 "+(direct/total*100).toFixed(1)+"%";

}

}



function updateTriggerProb(){

let stay=totalStay;

if(stay<=0)return;

setProb("chanceProb","chance",stay);
setProb("cherryProb","cherry",stay);
setProb("suikaProb2","suikaTrig",stay);
setProb("chainProb","chain",stay);
setProb("bellProb","bell",stay);
setProb("missProb","miss",stay);

}



function setProb(textId,inputId,stay){

let count=Number(document.getElementById(inputId).value);

if(count>0){

document.getElementById(textId).innerText="1/"+(stay/count).toFixed(2);

}

}



function openModal(id){

document.getElementById(id).style.display="flex";

}



function closeModal(id){

document.getElementById(id).style.display="none";

}



function outsideClose(e,id){

if(e.target.classList.contains("modal")){

closeModal(id);

}

}



/* データ保存 */

function saveData(){

let inputs=document.querySelectorAll("input,textarea");

let data={};

inputs.forEach(i=>{

data[i.id]=i.value;

});

data.totalStay=totalStay;
data.history=history;

localStorage.setItem("sbjData",JSON.stringify(data));

}



/* データ読み込み */

function loadData(){

let data=localStorage.getItem("sbjData");

if(!data)return;

data=JSON.parse(data);

for(let key in data){

let el=document.getElementById(key);

if(el)el.value=data[key];

}

if(data.totalStay!==undefined){

totalStay=data.totalStay;

document.getElementById("totalStay").innerText=totalStay;

}

if(data.history){

history=data.history;

}

update();

}

function updateZoneProb(){

calcZone100();
calcZone200();
calcZone300();

}



function calcZone100(){

let china=Number(document.getElementById("z100china").value);
let high=Number(document.getElementById("z100high").value);

let total=china+high;

if(total>0){

let c=(china/total*100).toFixed(1);
let h=(high/total*100).toFixed(1);

document.getElementById("z100prob").innerText=
"China "+c+"% / 高確 "+h+"%";

}

}



function calcZone200(){

let none=Number(document.getElementById("z200none").value);
let china=Number(document.getElementById("z200china").value);
let high=Number(document.getElementById("z200high").value);

let total=none+china+high;

if(total>0){

let n=(none/total*100).toFixed(1);
let c=(china/total*100).toFixed(1);
let h=(high/total*100).toFixed(1);

document.getElementById("z200prob").innerText=
"無反応 "+n+"% / China "+c+"% / 高確 "+h+"%";

}

}



function calcZone300(){

let none=Number(document.getElementById("z300none").value);
let china=Number(document.getElementById("z300china").value);
let high=Number(document.getElementById("z300high").value);

let total=none+china+high;

if(total>0){

let n=(none/total*100).toFixed(1);
let c=(china/total*100).toFixed(1);
let h=(high/total*100).toFixed(1);

document.getElementById("z300prob").innerText=
"無反応 "+n+"% / China "+c+"% / 高確 "+h+"%";

}

}

function resetAll(){

if(confirm("本当にすべてのデータをリセットしますか？")){

localStorage.clear();

location.reload();

}

}

function bump(id){

let el=document.getElementById(id);

el.classList.add("bump");

setTimeout(()=>{

el.classList.remove("bump");

},150);

}


window.onload=loadData;
