import { Link } from "react-router-dom";
const Header = () => {
    return (
        <header className="site-header">
            <div className="site-identity">
                <h1 className="text-3xl font-bold">
                    <Link to="/">Crypto Tracker</Link>
                </h1>
            </div>
        </header>

    );
}

export default Header;