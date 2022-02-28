	const url='https://twelvelove-type.netlify.app/';
	
//메인에서 결과확인했을때 각각 결과에 맞는 result.html로 kakao link 생성 
function setShare(){ 
		var resultImg=document.querySelector('#resultImg');
		var resultAlt=resultImg.firstElementChild.alt;
		const shareTitle='십이간지 연애유형 결과';
		const shareDes=infoList[resultAlt].name;
		const shareImage= url + 'start/img/image- ' + resultAlt + '.png';
		const shareURL= url + 'start/page/result-' + resultAlt + '.html';
	
	Kakao.Link.sendDefault({
	  objectType: 'feed',
	  content: {
	    title: shareTitle,
	    description: shareDes,
	    imageUrl:shareImage,
	      link: {
	      mobileWebUrl: shareURL,
	       webUrl:shareURL,
	    },
	  },
	  
	  buttons: [
	    {
	      title: '결과확인하기',
	      link: {
	        mobileWebUrl:shareURL,
	        webUrl:shareURL,
	      },
	    },
	  ]
	});
}	