import React from "react";
import './about.css';

const About = () => {
  return (
    <div>
      <div className="banner">
        <h1>ABOUT US</h1>
      </div>

      <section className="about-section">
        <p>
          Welcome to Book Swift! We are a team of passionate book lovers
          dedicated to delivering books faster from local stores in your city.
        </p>

        <div className="team-container">
                  {/* Member 1 */}
          <div className="team-ani primary">
             <div className="team-member">
            <img src="/assets/suhaniImg.jpeg" alt="Member 1" />
            <h3>Suhani Gupta</h3>
             </div>

          {/* Member 2 */}
          <div className="team-member">
            <img src="/assets/siwangImg.jpeg" alt="Member 2" />
            <h3>Shivank Rai</h3>
          </div>

          {/* Member 3 */}
          <div className="team-member">
            <img src="/assets/tanuImg.jpeg" alt="Member 3" />
            <h3>Tanu Sharma</h3>
          </div>

          {/* Member 4 */}
          <div className="team-member">
            <img src="/assets/sumitImg.jpeg" alt="Member 4" />
            <h3>Sumit Mahajan</h3>
          </div>

          {/* Member 5 */}
          <div className="team-member">
            <img src="/assets/satyamImg.jpeg" alt="Member 5" />
            <h3>Satyam Kumar</h3>
                  </div>
                  </div> 
                  <div className="team-ani secondary">
             <div className="team-member">
            <img src="/assets/suhaniImg.jpeg" alt="Member 1" />
            <h3>Suhani Gupta</h3>
             </div>

          {/* Member 2 */}
          <div className="team-member">
            <img src="/assets/siwangImg.jpeg" alt="Member 2" />
            <h3>Shivank Rai</h3>
          </div>

          {/* Member 3 */}
          <div className="team-member">
            <img src="/assets/tanuImg.jpeg" alt="Member 3" />
            <h3>Tanu Sharma</h3>
          </div>

          {/* Member 4 */}
          <div className="team-member">
            <img src="/assets/sumitImg.jpeg" alt="Member 4" />
            <h3>Sumit Mahajan</h3>
          </div>

          {/* Member 5 */}
          <div className="team-member">
            <img src="/assets/satyamImg.jpeg" alt="Member 5" />
            <h3>Satyam Kumar</h3>
                  </div>
                  </div> 
        </div>
      </section>

      {/* Footer Section */}
      <footer class="footer">
    <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
    <ul class="social-icon">
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-facebook"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-twitter"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-linkedin"></ion-icon>
        </a></li>
      <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-instagram"></ion-icon>
          </a></li>
       <li class="social-icon__item"><a class="social-icon__link" href="#">
          <ion-icon name="logo-gmail"></ion-icon>
        </a></li>
    </ul>
    <ul class="menu">
      <li class="menu__item"><a class="menu__link" href="#">Home</a></li>
      <li class="menu__item"><a class="menu__link" href="#">About</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Services</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Team</a></li>
      <li class="menu__item"><a class="menu__link" href="#">Contact</a></li>

    </ul>
    <p style={{ display: 'flex', alignItems: 'center' }}>
   
  <img 
    src="/assets/logo.png" 
    style={{ height: '4em', width: '12em', marginRight: '5px' }} 
    alt="BookSwift Logo" 
  />&copy;
  2024 BookSwift | All Rights Reserved
</p>



  </footer>
    </div>
  );
};

export default About;



