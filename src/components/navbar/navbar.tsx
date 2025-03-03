import "./navbar.css";

interface Link {
    name: string;
    url: string;
}

export default function Navbar({ links }: { links: Link[] }) {
    return (
        <nav className="navbar">
            <div className="navbar-logo">MINIFOLIO</div>
            <div className="navbar-right">
                <ul>
                    <ul id="navbarNoDropdown" className="a">
                        {links.map((link) => (
                            <li key={`link-${link.name}`}>
                                <a href={link.url}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </ul>
            </div>
        </nav>
    );
}
