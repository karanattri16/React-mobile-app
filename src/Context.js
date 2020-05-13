import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import { ButtonContainer } from "./components/Button";
import { ThemeProvider } from "styled-components";
const ProductContext = React.createContext();
const ProductConsumer = ProductContext.Consumer;

class ProductProvider extends Component {
  //1.here we have set the products to empty and we have run a function to fill the products property
  // reason being that if we donot folllow this we will end up changing the data in the original data file.
  //2.we are not storing the ref here in products property in state object but actually we are filling
  //it up with a copy of data using the original data file. This will solve the issue that would otherwise occur.
  //3. the testRun method below will show the issue here if we set the products:storeProducts

  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.map(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState({ products: tempProducts });
  };
  // testRun = () => {
  //   console.log(this.state.products[0].inCart);
  //   console.log(storeProducts[0].inCart);
  //   const tempProduct = this.state.products[0];
  //   tempProduct.inCart = true;
  //   this.setState = { products: tempProduct };
  //   console.log(this.state.products[0].inCart);
  //   console.log(storeProducts[0].inCart);
  // };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      {
        products: tempProducts,
        cart: [...this.state.cart, product]
      },
      () => {
        this.addTotals();
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = id => {
    this.setState({ modalOpen: false });
  };

  increment = id => {
    let tempCart = [...this.state.cart];
    let selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState({ cart: [...tempCart] }, () => {
      this.addTotals();
    });
  };

  decrement = id => {
    const tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);

    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        {
          cart: [...tempCart]
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedItem = tempProducts[index];
    removedItem.inCart = false;
    removedItem.count = 0;
    removedItem.total = 0;
    this.setState({ cart: [...tempCart], products: [...tempProducts] }, () => {
      this.addTotals();
    });
  };

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.addTotals();
      this.setProducts();
    });
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    });
  };
  //Hi
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export { ProductProvider, ProductConsumer };
