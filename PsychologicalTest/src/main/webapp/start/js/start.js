//상수선언
const main=document.querySelector("#main");
const qna=document.querySelector("#qna");

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
	var q=document.querySelector('.qBox');
	q.innerHTML=qnaList[qIdx].q; 
	for(let i in qnaList[qIdx].a){
		addAnswer(qnaList[qIdx].a[i].answer,qIdx);
	}
}
function begin(){
	main.style.WebkitAnimation = "fadeOut 1s";
	main.style.animation = "fadeOut 1s";
	setTimeout(() =>{ //시간지연함수 
		qna.style.WebkitAnimation = "fadeIn 1s";
	    qna.style.animation = "fadeIn 1s";
	setTimeout(() =>{
		main.style.display="none";	
		qna.style.display="block";	
	}, 450)
	let qIdx=0;
	goNext(qIdx);
  }, 450);
	
}