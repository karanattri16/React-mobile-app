import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import {ProductComsumer} from '../Context'
class Navbar extends Component {
  render() {
    return (
      <div>
        <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
          <Link to="/">
            <img src={logo} alt="store" className="navbar-brand" />
          </Link>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item ml-5">
              <Link to="/" className="nav-link">
                products
              </Link>
            </li>
          </ul>
          <ProductComsumer>
            {value=>{
              const cart = value.cart;
              return(
                <Link to="/cart" className="ml-auto">
                  <ButtonContainer>
                    <span className="mr-2">
                      <i className="fas fa-cart-plus">my cart 
                      <span className="badge badge-light">{cart.length}</span>
                      </i>
                    </span>
                  </ButtonContainer>
                </Link>
              )
            }}
          </ProductComsumer>          
        </NavWrapper>
      </div>
    );
  }
}
export default Navbar;

const NavWrapper = styled.nav`
  background: var(--mainBlue) !important;
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;
