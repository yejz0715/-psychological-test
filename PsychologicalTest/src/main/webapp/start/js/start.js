//상수선언
const main=document.querySelector("#main");
const qna=document.querySelector("#qna");
const result=document.querySelector("#result");
const endPoint=12;


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
}

function addAnswer(answerText,qIdx){
	var a= document.querySelector('.answerBox');
	var answer=document.createElement('button'); //answer변수에 버튼생성-answerList라는 클래스
	answer.classList.add('answerList'); 
	answer.classList.add('my-3'); 
	answer.classList.add('py-3');
	answer.classList.add('mx-auto');
	answer.classList.add('fadeIn');
	
	a.appendChild(answer);//answer버튼이 a에게 소속될수있게 해줌
	answer.innerHTML=answerText;
	
	answer.addEventListener("click",function(){
		var children =document.querySelectorAll('.answerList');
		for(let i =0; i<children.length; i++){
			children[i].disabled=true; //비활성화
			children[i].style.WebkitAnimation = "fadeOut 0.5s";
			children[i].style.animation = "fadeOut 0.5s";
		}
		setTimeout(()=>{
			for(let i =0; i<children.length; i++){
			children[i].style.display='none'; //사라짐
		}
		goNext(++qIdx);
		},450)	
	}, false);
}
function goNext(qIdx){
	if(qIdx+1 == endPoint){ //질문이 끝나면 goResult()함수로..
		goResult();
		return; 
	}
	var q=document.querySelector('.qBox');
	q.innerHTML=qnaList[qIdx].q;  //질문리스트[몇번째의] 
	for(let i in qnaList[qIdx].a){
		addAnswer(qnaList[qIdx].a[i].answer,qIdx);
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