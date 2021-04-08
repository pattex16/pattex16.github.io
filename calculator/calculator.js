var state = false;
var op = '+';
var temp1 = 0;
var temp2 = 0;
for (let i = 0 ; i < 10 ; i++)
  document.body.innerHTML+='<button onclick="addNumber(' + i + ')">' + i + '</button>';
function addNumber(n){
  in1 = document.getElementById("in1");
  in1.value += String(n);
  if (!state)
    temp1 = parseFloat(in1.value);
  else
    temp2 = parseFloat(in1.value);
}
function add(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = '+';
}
function sub(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = '-';
}
function mul(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = '*';
}
function div(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = '/';
}
function pow(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = '^';
}
function log(){
  state = true;
  in1 = document.getElementById("in1");
  in1.value = "";
  op = 'l';
}
function eql(){
  in1 = document.getElementById("in1");
  in1.value = "";
  switch (op){
    case '+':
      in1.value = String(temp1+temp2);
      break;
    case '-':
      in1.value = String(temp1-temp2);
      break;
    case '*':
      in1.value = String(temp1*temp2);
      break;
    case '/':
      in1.value = String(temp1/temp2);
      break;
    case '^':
      in1.value = String(Math.pow(temp1,temp2));
      break;
    case 'l':
      in1.value = String(Math.log(temp1)/Math.log(temp2));
      break;
  }
  temp1 = parseFloat(in1.value);
}
function cls(){
  in1 = document.getElementById("in1");
  in1.value = "";
  temp1 = 0;
  temp2 = 0;
}
