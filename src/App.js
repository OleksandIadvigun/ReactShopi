import logo from './logo.svg';
import './App.css';
import React from 'react'
import BaseLayout from "./layouts/BaseLayout";
import {Home} from "./pages";
import {HomeShopi} from "./pages/HomeShopi";
import MainFormReg from "./components/formRegistration/MainFormReg";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from 'react-router-dom';
import Products from "./components/products/Products";
import Shops from "./components/shops/Shops";

;



function App() {
  return (
      <Router>
      <div className="App">
      <BaseLayout>
       {/*<Home/>*/}
       <Switch>
           <Route path={'/'} exact={true} render={() => <HomeShopi/>}/>
           <Route path={'/registration'} exact={true} render={() => <MainFormReg/>}/>
           <Route path={'/products'} render={() => <Products/>}/>
           <Route path={'/shops'} render={() => <Shops/>}/>
       </Switch>
      </BaseLayout>
      </div>
      </Router>
  );
}

export default App;
