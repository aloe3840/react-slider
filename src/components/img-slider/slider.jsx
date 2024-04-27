import { useEffect, useState } from 'react'
import './slider.css'
import { BsArrowLeftCircle, BsArrowRightCircleFill } from 'react-icons/bs'

//컴포넌트 첫글자는 대문자, 다른 곳에서 사용하게 export defalut
export default function ImagesSlider(props){
  //useState를 2개 만들 거임 (이미지들, 현재 슬라이드 번호)
  let [images, setImages] = useState([])
  let [curSlide, setCurSlide] = useState(0)
  let [loading, setLoading] = useState(false)
  let [errMsg, setErrMsg] = useState(null)



  //picsum 서버에서 get요청을 통해 이미지를 받아오기
  useEffect(()=>{
    //mount생성시, update갱신시, unmount제거시
    //3개의 이벤트에 대해서 실행할 코드를 넣는 공간
    //평소에 mount와 update는 같이 동작 unmount는 return에서 동작
    //update의 동작을 특정 대상에 대해서만 실행하려면
    //두 번째 인자에 []로 넣어줌
    if(props. url !== ''){
      //fetch를 통해서 이미지를 get요청하자
      fetchImages(props.url)
    }

    return(()=>{
      //unmout 공간
    })
  }, [props.url]) //[]에 state를 넣으면 update가 해당 state갱신시에만 발동하게 변경

  async function fetchImages(getUrl){
    setLoading(true)
    //get요청으로 이미지 경로를 받아온다 (async비동기: 동작에 영향을 끼치지 않기위해)
    let response = await fetch(`${getUrl}?page=${props.page}&limit=${props.limit}`)
    const data = await response.json()

    if(data){
      setImages(data)
      setLoading(false)
    }
  }

  console.log(images)

  function goPrev(){
    if(curSlide === 0){
      setCurSlide(images.length)
    }else{
      setCurSlide(curSlide -1)
    }
  }

  function goNext(){
    if(curSlide === images.length -1){
      setCurSlide(0)
    }else{
      setCurSlide(curSlide + 1)
    }
  }

  return(
    <>
      <div className="slider-container">
        <BsArrowLeftCircle className='arrow arrow-left' onClick={goPrev}/>
        {
          images && images.length? (
            images.map((img, idx)=>{
              return(
                <img key={idx} src={img.download_url}
                className={curSlide===idx? "current-img": "hide-current-image"}/>
              )
            })
              
          ) : <div>이미지 로딩중...</div>
        }
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={goNext}/>
      </div>
    </>
  )
}

//export defalut : 파일의 대표
//export : 추가로 내보낼 것