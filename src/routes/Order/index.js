/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from 'react';
import Header from "../../components/public/public";
import fetchJsonp from "fetch-jsonp";
import { List, Switch } from 'antd-mobile';
import {connect} from "react-redux";
import {Link}  from "react-router"

import "./index.css";

//内容组件
class Content extends Component{
    render(){
        return <div className="content">{this.props.children}</div>
    }

}
class Footer extends Component{
    render(){
        const {orderData} = this.props;
        return(
           <div className="order-footer">
               <div className="o-total">总计 :  <span>¥{orderData.data && orderData.data.order_amount}</span></div>
               <div className="o-submit">
                   <a href="#/generate">提交订单</a></div>
           </div>
        )
    }
}
 class Order extends Component{
     render(){
         const {orderData,subOrderData} = this.props;

             console.log("props ",this.props);

         return(
             <div className="page">
                 <Header title="首页" />
                 <Footer orderData={orderData} />
                 <Content>
                     <div className="o-content">
                         <Link to={`/adress`}>
                             <div className="o-adress">
                                 <div className="o-uname">

                                     <p>收件人 : <span>{orderData.data&&orderData.data.address.consignee}</span></p>
                                     <p className="o-phone">
                                         {orderData.data&&orderData.data.address.mobile}
                                     </p>
                                 </div>
                                 <div className="o-shopping-adress">
                                     {orderData.data&&orderData.data.address.address}
                                 </div>
                             </div>
                         </Link>
                         <div className="o-goods-list">
                             {
                                 subOrderData.map((ele,index)=>{
                                     return(
                                         <div className="o-list-item" key={index}>
                                             <div className="o-shipper">{ele.shipper}</div>
                                             <ul>
                                                 {
                                                     subOrderData[index].goods_list.map((ele,index)=>{
                                                         return(
                                                             <li  key={index}>
                                                                 <div className="o-g-info">
                                                                     <div className="o-pic"><img src={ele.thumbnail} alt=""/></div>
                                                                     <div className="o-name">
                                                                         <p className="o-g-name">{ele.goods_name}</p>
                                                                         <p className="o-g-attrs">
                                                                             <span>{ele.attrs[0]}</span>
                                                                             <span>{ele.attrs[1]}</span>
                                                                         </p>
                                                                     </div>
                                                                     <div className="o-price">
                                                                         <p>¥ {ele.goods_price}</p>
                                                                         <p className="o-p-num">X {ele.number}</p>
                                                                     </div>
                                                                 </div>
                                                             </li>
                                                         )
                                                     })
                                                 }
                                             </ul>
                                             <div className="o-postage">
                                                 <p className="o-p-name">运费 : </p>
                                                 <p className="o-p-price">¥  {ele.postage}</p>
                                             </div>
                                         </div>

                                     )
                                 })
                             }

                         </div>

                         <ul className="o-discount">
                             <li>
                                 优惠券 : <span className="o-select">请选择优惠券 <i>&gt;</i></span>
                             </li>
                             <li>
                                 <span>0优币可用,抵扣¥0.00</span>
                             </li>
                             <li>
                                 <span>可使用余额¥0.00</span>


                             </li>
                         </ul>
                         <ul className="o-account">
                             <li>
                                 <p >商品原价 : </p>
                                 <p>¥{orderData.data&&orderData.data.goods_amount}</p>
                             </li>
                             <li>
                                 <p>折扣 : </p>
                                 <p>¥{orderData.data&&orderData.data.promotions_amount}</p>
                             </li>
                             <li>
                                 <p>优惠券 : </p>
                                 <p>¥0.00</p>
                             </li>
                             <li>
                                 <p>优币折扣 : </p>
                                 <p>¥0.00</p>
                             </li>
                             <li>
                                 <p>使用余额 : </p>
                                 <p>¥0.00</p>
                             </li>
                             <li>
                                 <p>运费 : </p>
                                 <p>¥{orderData.data&&orderData.data.postage}</p>
                             </li>
                         </ul>
                     </div>
                 </Content>
             </div>
         )
     }
     componentDidMount(){
         this.props.getOrderData();
     }
 }
function mapStateToProps(state){
    return {
        orderData:state.orderReducer.orderData,
        subOrderData:state.orderReducer.subOrderData,
    }
}
function mapDispatchToProps(dispatch){
    return{
        getOrderData(){
            fetch("/api/v5/settlements/cart",{timeout:20000,credentials: 'include',method:'POST'})
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    if(data.status_code == 1205) return;
                    var data1 = data.data.sub_orders;
                    dispatch({type:"getOrderData",data:{orderData:data,subOrderData:data1}})
                })
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order);