/**
 * Created by Administrator on 2017/6/16.
 */
import React,{Component} from "react";

import "./index.css"
import Header from "../../components/public/public";

//内容组件
class Content extends Component{
    render(){
        return <div className="content">{this.props.children}</div>
    }

}
class OrderPage extends Component{
    constructor(props){
        super(props);
        this.state={
            orderData:[],
            subOrderData:[]
        }
    }
    render(){
        const {orderData,subOrderData} =this.state;
        return <div className="y-order-page">
                    <Header title="首页"/>
                    <div className="y-order">
                        <div className="nav-list1 order">
                            <div className="swiper-container nav_1 swiper swiper-mode">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide swiper-slide-active act" data-status="0" >全部</div>
                                    <div className="swiper-slide swiper-slide-next" data-status="1" >待支付</div>
                                    <div className="swiper-slide" data-status="2">待收货</div>
                                    <div className="swiper-slide" data-status="3">待评价</div>
                                    <div className="swiper-slide hou" data-status="4">售后/退款</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-list">
                            <div className="item" data-order_id="2233131">
                                <div className="t">订单号：59780311697490634266
                                    <span className="color_red">已取消</span>
                                </div>
                                <a href="/v4/settlement?order_id=2233131">
                                    <div className="g-list-wrap">
                                    {
                                       orderData&&orderData.map((ele,index)=>{
                                           return <div className="g-list" key={index}>
                                               <div className="g-list-t"><span>包裹{index+1}</span>
                                               </div>
                                                   {orderData[index].goods_list.map((ele,index)=>{
                                                   return(
                                                           <ul>
                                                               <li>
                                                                   <img src={ele.thumbnail} alt="" key={index}/>
                                                               </li>
                                                           </ul>

                                                       )

                                           })}
                                           </div>
                                       })


                                        }
                                    </div>
                                </a>
                                <div className="total clearfix">
                                    <div className="l">
                                        <p className="pro">合计：<span>¥{subOrderData.order_amount}</span></p>
                                        <p className="num">(共 1 件商品)</p>
                                    </div>
                                    <div className="r"></div>
                                </div>
                            </div>
                        </div>
                        <div className="loading">没有更多了</div>
                    </div>
                </div>
    }
    componentDidMount(){
        fetch("/api/v5/settlements/cart",{timeout:20000,credentials: 'include',method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.status_code == 1205) return;
                var data1 = data.data.sub_orders;
                console.log(data1);
                this.setState({
                    orderData:data1,
                    subOrderData:data.data
                })
            })
    }
}
export default OrderPage