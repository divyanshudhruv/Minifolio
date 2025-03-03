import './footer.css';

export default function Footer() {
    return (
        <div className="footer">
            <div className="topHeader">
                <div className="left">2024</div>
                <div className="right">Github</div>
            </div>
            <div className="linksSection">
                <div className="left">
                    <div className="container">
                        <div className="topText">Get in touch</div>
                        <div className="bottomText">youremail@proton.me</div>
                    </div>
                    <div className="container">
                        <div className="topText">Connect</div>
                        {/* NOTE: onClick is currently removed */}
                        <div className="bottomText">Github</div>
                        <div className="bottomText">Instagram</div>
                        <div className="bottomText">Twitter (X)</div>
                        <div className="bottomText">Linkedin</div>
                    </div>
                </div>
                <div className="right">
                    <div className="navBar">
                        <a href="#hero" className="item">
                            Home{' '}
                        </a>
                        <a href="#about" className="item">
                            About
                        </a>
                        <a href="#education" className="item">
                            Education
                        </a>
                        <a href="#skills" className="item">
                            Skills
                        </a>
                        <a href="#services" className="item">
                            Services
                        </a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="top">
                    © &nbsp;
                    <span id="copyright-year" /> &nbsp;All Rights Reserved
                </div>
                <div className="bottom">
                    Template Developed With
                    <span>
                        {/* TODO: Add heart icon */}
                        {/* <ion-icon
          name="heart"
          style={{ position: "relative", top: 5 }}
          className="icon-heart"
        /> */}
                    </span>
                    {/* &nbsp;By&nbsp; */}
                    <a href="https://github.com/valdemirum">
                        valdemirum
                    </a>
                </div>
            </div>
        </div>
    );
}
