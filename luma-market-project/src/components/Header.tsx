import { NavLink, useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";

type CartItem = {
  productId: string;
  quantity: number;
  deliveryOptionId?: string;
  product?: {
    id: string;
    name: string;
    image: string;
    priceCents: number;
  };
};

type HeaderProps = {
  cart: CartItem[];
};

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchText);

  useEffect(() => {
    setSearch(searchText);
  }, [searchText]);

  const totalQuantity = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProduct = () => {
    const query = search.trim();

    if (query) {
      navigate(`/?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
    }
  };

  const handleSearchBarKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      searchProduct();
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <span className="store-logo">
            Luma<span>Market</span>
          </span>
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search products..."
          onChange={updateSearch}
          value={search}
          onKeyDown={handleSearchBarKeyDown}
          aria-label="Search products"
        />

        <button
          className="search-button"
          onClick={searchProduct}
          aria-label="Search"
        >
          <img className="search-icon" src={SearchIcon} alt="" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={CartIcon} alt="" />

          <div className="cart-quantity">{totalQuantity}</div>

          <span className="cart-text">Cart</span>
        </NavLink>
      </div>
    </div>
  );
}
