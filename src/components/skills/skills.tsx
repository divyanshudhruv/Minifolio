import { HTML5, Unity, NodeJS, Swift } from '@/components/ui/icons';

import "./skills.css";

export default function Skills() {
    return (
        <>
            <div id="skills"       style={{ marginBottom: "60px" }}
            />
            <div className="skillsC">
                <div className="title">     SKILLS 😎</div>
                <div className="titleGap" />
                <div className="titleGap" />
                <div className="titleSmall">What I Know</div>
                <div className="containerGap" />
                <div className="titleGap" />
                <div className="titleGap" />
                <div className="container">
                    <div className="boxes">
                        <div className="left">
                            <HTML5 />
                        </div>
                        <div className="right">FRONTEND DEVELOPMENT</div>
                    </div>
                    <div className="boxes">
                        <div className="left">
                            <NodeJS />
                        </div>
                        <div className="right">BACKEND DEVELOPMENT</div>
                    </div>
                    <div className="boxes">
                        <div className="left">
                            <Unity />
                        </div>
                        <div className="right">GAME DEVELOPMENT</div>
                    </div>
                    <div className="boxes">
                        <div className="left">
                            <Swift />
                        </div>
                        <div className="right">APP DEVELOPMENT</div>
                    </div>
                    <div className="buttonCont">
                        <a
                            className="btn btn-custom btn-lg btn-skills"
                            href="https://github.com"
                            target="_blank"
                        >
                            {' '}
                            View more{' '}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
