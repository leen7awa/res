import CartIcon from "../icons/CartIcon";
import LanguageIcon from "../icons/LanguageIcon";

const Header = ({cartItemsCount}) => {
    const commonButtonStyles = "text-gray-700 hover:text-blue-600 flex items-center justify-center";

    return (
        <div className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <button className="text-2xl font-bold text-blue-600"
                    onClick={() => { window.location.href = '/menu' }}>
                    menu
                </button>
                <nav className="ml-auto flex space-x-4">
                    <a href="#" className={commonButtonStyles}>
                        <LanguageIcon />
                    </a>
                    <a href="/cart" className={commonButtonStyles}>
                        <CartIcon cartItemCount={cartItemsCount}/>
                    </a>
                </nav>
            </div>
        </div>
    );
};
export default Header;
