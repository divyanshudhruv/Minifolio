import { poppins } from '@/utils/fonts';
import "./about.css";

export default function About() {
    return (
        <>
            <div className="aboutC">
                <div className="title">     ABOUT 🫥</div>
                <div className="titleGap" />
                <div className="titleSmall">This and that</div>
                <div className="containerGap" />
                <div className={`container ${poppins.className}`}>
                    <div className="leftC">
                        <div className="text">Hi, I'm a developer</div>
                        <br />
                        <div className="textMain">
                            I design websites. That's the long and short of it.
                            UI and UX, Sketch, Design, and pretty decent HTML
                            and CSS — with Javascript and that nice dabble with
                            Java.
                        </div>
                    </div>
                    <div className="rightC">
                        <div className="text">TL;DR</div>
                        <br />
                        <div className="textMain">
                            Web UI &amp; UX <br />
                            Figma
                            <br />
                            HTML &amp; CSS
                        </div>
                        <div className="btnC">
                            <a
                                className="btn btn-custom btn-lg btn-about a"
                                href="#"
                            >
                                {' '}
                                Click Me{' '}
                            </a>
                            &nbsp;
                            <a
                                className="btn btn-custom-nopadding btn-about btn-resume b"
                                style={{ height: 60, width: '0px !important' }}
                                href="#"
                            >
                                {/*replace # in href tag to the url of your resume*/}
                                <i
                                    className="ri-file-download-line"
                                    style={{ fontSize: 24 }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="bottomC" />
            </div>
        </>
    );
}
