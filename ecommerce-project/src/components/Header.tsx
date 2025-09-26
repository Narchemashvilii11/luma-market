import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useState } from 'react'
import './Header.css'
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import SearchIcon from  '../assets/images/icons/search-icon.png'
import CartIcon from '../assets/images/icons/cart-icon.png'

type HeaderProps = {
   cart: {
      productId: string;
      quantity: number;
      deliveryOptionId: string;
   }[]
}

export function Header({ cart }: HeaderProps) {
   const navigate = useNavigate()
   const [searchParams] = useSearchParams()
   const searchText = searchParams.get('search')
   const [search, setSearch] = useState(searchText ||'')

   let totalQuantity = 0;

   cart.forEach((cartItem) => {
      totalQuantity += cartItem.quantity
   })

   const updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
   }

   const searchProduct = () => {
      navigate(`/?search=${search}`)
   }

   const handleSearchBarKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyPressed = event.key

      if (keyPressed === 'Enter') {
         searchProduct() 
      }
   }

   return (
      <div className="header">
      <div className="left-section">
      <NavLink to="/" className="header-link">
         <img className="logo" src={LogoWhite} />
         <img className="mobile-logo" src={MobileLogoWhite} />
      </NavLink>
      </div>

      <div className="middle-section">
      <input 
         className="search-bar" 
         type="text" 
         placeholder="Search" 
         onChange={updateSearch}
         value={search}
         onKeyDown={handleSearchBarKeyDown}
      />

      <button className="search-button"
         onClick={searchProduct}>
         <img className="search-icon" src={SearchIcon} />
      </button>
      </div>

      <div className="right-section">
      <NavLink className="orders-link header-link" to="/orders">
         <span className="orders-text">Orders</span>
      </NavLink>

      <NavLink className="cart-link header-link" to="/checkout">
         <img className="cart-icon" src={CartIcon} />
         <div className="cart-quantity">{totalQuantity}</div>
         <div className="cart-text">Cart</div>
      </NavLink>
      </div>
      </div>
   )
}
