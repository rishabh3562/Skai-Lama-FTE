import React from 'react'
import '../styles/global.css'
const HeadingText = ({text,type}) => {
  switch (type) {
    case 1:
        return(<>
          <h2 className="home-heading">{text} </h2>
        </>)
        break;
  
    case 2:
        return(<>
          <h2 className="heading-t2">{text} </h2>
        </>)
       
    default:
        return(<>
            <h2 className="home-heading-left">{text} </h2>
          </>)
        break;
  }
}

export default HeadingText