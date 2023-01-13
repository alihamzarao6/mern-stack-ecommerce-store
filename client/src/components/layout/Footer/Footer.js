import React from 'react';

import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";


const Footer = () => {
  return (
    <footer id='footer'>
          <div className="leftFooter">
              <h4>DOWNLOAD OUR APP</h4>
              <p>Download App for Android and IOS mobile phone</p>
              <img src={playStore} alt="playstore" />
              <img src={appStore} alt="Appstore" />
          </div>

          <div className="midFooter">
              <h1>CodesWare.</h1>
              <p>High Quality is our first priority</p>

              <p>Copyrights 2021 &copy; MeAbhiSingh</p>
          </div>

          <div className="rightFooter">
              <h4>Follow Us</h4>
              <a href="http://instagram.com/alihamzarao3">Instagram</a>
              <a href="http://twitter.com/ahraog909">Twitter</a>
              <a href="https://www.facebook.com/alihamza.rao.909">Facebook</a>
          </div>
    </footer>
  )
}

export default Footer