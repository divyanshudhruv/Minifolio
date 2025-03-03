import "./services.css";

export default function Services() {
    return (
        // TODO: Add services  icons
        <div className="servicesC" id="services">
            <div className="title">     SERVICES 🛠️</div>
            <div className="titleGap" />
            <div className="titleGap" />
            <div className="titleSmall">What I Offer</div>
            <div className="containerGap" />
            <div className="titleGap" />
            <div className="container">
                <div className="serviceItem">
                    <div className="serviceIcon">
                        {/* <ion-icon name="laptop-outline" /> */}
                    </div>
                    <div className="serviceText">
                        <div className="text">Web Dev</div>
                        <div className="textMain">
                            Building responsive and high-quality websites.
                        </div>
                    </div>
                </div>
                <div className="serviceItem">
                    <div className="serviceIcon">
                        {/* <ion-icon name="brush-outline" /> */}
                    </div>
                    <div className="serviceText">
                        <div className="text">UI/UX Design</div>
                        <div className="textMain">
                            Designing user-friendly interfaces and experiences.
                        </div>
                    </div>
                </div>
                <div className="serviceItem">
                    <div className="serviceIcon">
                        {/* <ion-icon name="stats-chart-outline" /> */}
                    </div>
                    <div className="serviceText">
                        <div className="text">SEO Expert</div>
                        <div className="textMain">
                            Optimizing websites for better search engine
                            ranking.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
