import React,{useState} from 'react'
// import './slide.scss'
function Slide(props) {
  const [btn, setbtn] = useState('SignUp')
  const [class1, setclass1] = useState('front w-50 p-4 color1')
  const [content, setcontent] = useState('New to our Website? ')
  function move()
  {
    if (btn==='SignUp')
    {
      setbtn('SignIn')
      setclass1('front w-50 p-4 move color2')
      setcontent('One of us? ')
      
    }
    else{
      setbtn('SignUp')
      setclass1('front w-50 p-4 color1')
      setcontent('New to our Website? ')
    }
  }
  return (
    <div className={class1} id='main'> 
      <h1 className='head'>Welcome</h1>
        <div className='content'>
          {content}
          <button className='link px-2 btn' onClick={move}>{btn}</button>
        </div>
        
    </div>
  )
}

export default Slide
