import  React, {Component} from "react";
import  ReactDOM,{render} from "react-dom";
import  store from "./config/store";
import {Router,Route,hashHistory} from "react-router";
import {Provider} from "react-redux";
import IndexPage from "./routes/index/index";
import ListPage from "./routes/list/list";
import DetailPage from "./routes/detail/detail";
import AppraisePage from "./routes/appraise/appraise";
import ShopPage from "./routes/shopping/shopping";
import ListliePage from "./routes/listlie/listlie";
import HistoryPage from "./routes/history/history";
import ActivePage from "./routes/active/active";
import LoginPage from "./routes/login/login";
import MinePage from "./routes/mine/mine"
import AboutPage from "./routes/about/about"
import QuestionPage from "./routes/question/question"
import CheapPage from "./routes/cheap/cheap"
import ExpendsPage from "./routes/expense/expense"

import Cart from "./routes/Cart";
import Order from "./routes/Order";
import Generate from "./routes/Generate";
import Adress from "./routes/Adress";
import MyOrder from "./routes/myOrder";

var App=()=><Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={IndexPage}/>
                    <Route path="/list(/:name)" component={ListPage}/>
                    <Route path="/detail(/:goods_id)" component={DetailPage}/>
                    <Route path="/appraise(/:goods_id)" component={AppraisePage}/>
                    <Route path="/listlie(/:tag_id)" component={ListliePage}/>
                    <Route path="/shopping(/:tag_id)" component={ShopPage}/>
                    <Route path="/history" component={HistoryPage}/>
                    <Route path="/active(/:redirect_content)" component={ActivePage}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/mine" component={MinePage}/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/question" component={QuestionPage}/>
                    <Route path="/cheap" component={CheapPage}/>
                    <Route path="/expense" component={ExpendsPage}/>
                    <Route path="/cart" component={Cart}> </Route>
                    <Route path="/order" component={Order}> </Route>
                    <Route path="/generate" component={Generate}> </Route>
                    <Route path="/adress" component={Adress}> </Route>
                    <Route path="/myorder" component={MyOrder}> </Route>
                </Router>
            </Provider>


render(<App/>,document.getElementById('root'));
