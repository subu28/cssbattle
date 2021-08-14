import './style.css'
import {useRef, useState} from 'react';

const Nav = () => {
  const scrollRef = useRef();

  const scrollTo = pos => {
    if(scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollLeft + pos;
    }
  }

  const list = () => {
    const items = [];
    for (let i = 1; i < 81; i++) {
      items.push(<div className="navbar-btn" key={i}>{ i }</div>)
    }
    return items;
  }
  return (
    <div className="navbar">
      <div className="navbar-btn">home</div>
      <div className="navbar-btn navbar-help" onClick={() => scrollTo(-100)}><div className="navbar-prev"></div></div>
      <div ref={scrollRef} className="scrollable">
        {list()}
      </div>
      <div className="navbar-btn navbar-help" onClick={() => scrollTo(100)}><div className="navbar-next"></div></div>
    </div>
  )
};

export default Nav;