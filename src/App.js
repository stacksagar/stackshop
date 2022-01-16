import React, {useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Header from "./components/header";
import Categories from "./components/categories";
import PublicRoute from "./components/HOC/PublicRoute";
import {useDispatch, useSelector} from "react-redux";
import {is_loggedin} from "./redux/actions/auth.action";
import ProductByRange from "./components/productsByRange";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/cart";
import {update_cart} from "./redux/actions/cart.actions";
import Checkout from "./components/checkout";
import Orders from "./components/orders";
import TrackOrder from "./components/orders/TrackOrder";
import Products from "./components/products";

const App = () => {
  const {authenticated} = useSelector((state) => state.auth);
  const {fetched: updated_cart} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authenticated && localStorage.getItem("token")) {
      is_loggedin(dispatch);
    }

    update_cart(dispatch);
  }, [authenticated, updated_cart, dispatch]);

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="sticky top-0 left-0 z-50">
          <Header />
          <Categories />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/signin" component={Signin} />
          <PublicRoute exact path="/signup" component={Signup} />
          <Route exact path="/products/:category" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/orders/track-order/:id" component={TrackOrder} />
          <Route
            exact
            path="/:productSlug/:productId"
            component={SingleProduct}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
