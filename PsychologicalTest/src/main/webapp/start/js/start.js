//상수선언
const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");
const endPoint=12; //마지막 질문
const select=[0,0,0,0,0,0,0,0,0,0,0,0]; 
//원소를 12개 갖고있는 배열 선언 /사용자가 선택한 버튼이 어떠한 선택지였는지 알수있는 배열

//function calResult(){ //select배열로 결과를 연산해주는 함수
	/*var pointArray=[
		{name:'mouse', value:0, key:0}, //결과에 대한 12개의 배열
		{name:'cow', value:0, key:1},
		{name:'tiger', value:0, key:2},
		{name:'rabbit', value:0, key:3},
		{name:'dragon', value:0, key:4},
		{name:'snake', value:0, key:5},
		{name:'hourse', value:0, key:6},
		{name:'sheep', value:0, key:7},
		{name:'monkey', value:0, key:8},
		{name:'chick', value:0, key:9},
		{name:'dog', value:0, key:10},
		{name:'pig', value:0, key:11},
	]
	for(let i=0; i<endPoint; i++ ){
		var target=qnaList[i].a[select[i]]; //qnaList의 i번째의 답변a의 i번째가 select배열에 담김
		for(let j=0; j<target.type.length; j++){
			for(let k=0; k<pointArray.length; k++){
				if(target.type[j] === pointArray[k].name){ //target의 type j번째가 pointArray k번째의 이름이 같다면
				pointArray[k].value +=1; //k의 value값 1씩 증가
			}
		}
	}
}
var resultArray=pointArray.sort(function(a,b){ //pointArray 정렬(value(기준)가 젤 높은것이 첫번째인덱스에 나올수있게)
	if(a.value>b.value){
		return -1; //a,b정렬
	}
	if(a.value<b.value){
		return 1; //b,a정렬
	}
	return 0;	//a,b 순서변경x
	});
	console.log(resultArray);
	let resultword=resultArray[0].key; //value기준으로 정렬된 1번째의 키값
	return resultword;
}
*/
function calResult(){ 
console.log(select);
var result=select.indexOf(Math.max(...select)) //select의 배열에 index반환(최대값)
return result;
}
function setResult(){
  let point = calResult();//point변수에 calResult의 결과값을 담아준다
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;//data.js에 inforlist변수[선택한]의 name

  var resultImg = document.createElement('img');//createElement로 이미지태그 생성
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'start/img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;//point값을 찾아서 result.html에 연결해주기위해서  
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);//resultImg를 연결시켜줌
  const resultDesc = document.querySelector('.resultDesc'); //설명
  resultDesc.innerHTML = infoList[point].desc; 
}

function goResult(){ //함수가 시작할때는 qna세션을 끝내고 result세션을 열어줘야함
	qna.style.WebkitAnimation = "fadeOut 1s";
	qna.style.animation = "fadeOut 1s";
	setTimeout(() =>{ 
		result.style.WebkitAnimation = "fadeIn 1s";
	    result.style.animation = "fadeIn 1s";
	setTimeout(() =>{
		qna.style.display="none";	
		result.style.display="block";	
	}, 450)} ) 
	setResult();
}

function addAnswer(answerText,qIdx, idx){
	var a= document.querySelector('.answerBox');
	var answer=document.createElement('button'); //answer변수에 버튼생성-answerList라는 클래스
	answer.classList.add('answerList');  //classList:지정한 클래스 값을 추가
	answer.classList.add('my-3'); 
	answer.classList.add('py-3');
	answer.classList.add('mx-auto');
	answer.classList.add('fadeIn');
	
	a.appendChild(answer);//answer버튼이 a에게 소속될수있게 해줌
	answer.innerHTML=answerText;
	
	answer.addEventListener("click",function(){ //사용자가 버튼을 선택하는 부분
		var children =document.querySelectorAll('.answerList');
		for(let i =0; i<children.length; i++){
			children[i].disabled=true; //비활성화
			children[i].style.WebkitAnimation = "fadeOut 0.5s";
			children[i].style.animation = "fadeOut 0.5s";
		}
		setTimeout(()=>{
			var target=qnaList[qIdx].a[idx].type; //qmaList에서 몇번째질문/a배열에서 선택한 질문
			for(let i=0; i<target.length; i++){
				select[target[i]]+=1;//버튼선택할때마다 1씩 증가
			}
			for(let i =0; i<children.length; i++){
			children[i].style.display='none'; //사라짐
		}
		goNext(++qIdx);
		},450)	
	}, false);
}
function goNext(qIdx){
	if(qIdx === endPoint){ //질문이 끝나면 goResult()함수로..
		goResult();
		return; 
	}
	var q=document.querySelector('.qBox');
	q.innerHTML=qnaList[qIdx].q;  //질문리스트[몇번째의] 
	for(let i in qnaList[qIdx].a){
		addAnswer(qnaList[qIdx].a[i].answer,qIdx, i); //i 몇번째 버튼인지
	}
	var status=document.querySelector('.statusBar');
	status.style.width=(100/endPoint) * (qIdx+1) + '%';
}
function begin(){
	main.style.WebkitAnimation = "fadeOut 1s"; //main사라지고
	main.style.animation = "fadeOut 1s";
	setTimeout(() =>{ //시간지연함수 
		qna.style.WebkitAnimation = "fadeIn 1s"; //qna나옴
	    qna.style.animation = "fadeIn 1s";
	setTimeout(() =>{
		main.style.display="none";	
		qna.style.display="block";	
	}, 450)
	let qIdx=0;
	goNext(qIdx);
  }, 450);
	
}