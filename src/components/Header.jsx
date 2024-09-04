import CartIcon from "../icons/CartIcon";
import LanguageIcon from "../icons/LanguageIcon";

const Header = () => {

    return (
        <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="container mx-auto flex justify-between items-center p-4">
                <button className="text-2xl font-bold text-blue-600"
                    onClick={() => { window.location.href = '/menu' }}>
                    menu
                </button>
                <nav className="ml-auto flex space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center justify-center">
                        <LanguageIcon />
                    </a>
                    <a href="/cart" className="text-gray-700 hover:text-blue-600 flex items-center justify-center">
                        <CartIcon />
                    </a>
                </nav>
            </div>
        </div>

    );
};
export default Header;