import React,{Component} from 'react';
import {Icon,Toast,Stepper,Checkbox} from "antd-mobile"
import Header from "../../components/public/public";
import fetchJsonp from "fetch-jsonp";
import {connect} from "react-redux";

import "./index.css"

//内容组件
class Content extends Component{
    render(){
        return <div className="content">{this.props.children}</div>
    }

}
class Footer extends Component {
    render(){
        const {listData,allSelected,dispatch} = this.props;
        var total = this.getTotal(listData);
        return(
            <div className="footer">
                <div className="l-footer-left">
                    <div className="l-all-change">
                        <Checkbox  defaultChecked="true"/>
                        &nbsp;&nbsp;全选
                    </div>
                    <div className="l-total">
                        <p className="l-total-money">合计 : <span>{total.p}</span></p>
                        <p className="l-no-yf">(不含运费)</p>
                    </div>
                </div>
                <div className="l-pay"><a href="#/order">去结算</a></div>
            </div>
        )
    };
    getTotal(data){
        var price = 0;
        data.map( (ele,index)=>{
            data[index].goods_list.map( (ele,index)=>{
                 price += parseFloat(ele.subtotal);
            })
        })
        var p = price.toFixed(2);
        return {p};
    }
}
class Cart extends Component {

    render(){
        console.log(this.props);
        const {cartData,listData,changeNum,delItem,dispatch} = this.props;
        return(
            <div className="page">
                <Header title="首页"/>
                <Footer cartData={cartData}  listData={listData}/>
                <Content>
                    <div className="l-content-list">
                    <div className="l-con-title">{cartData.postage_info}</div>
                    <div className="l-goods-list">
                        {listData&&listData.map((ele,index)=>{
                            return(
                                <div className="l-c-item" key={index}>
                                    <div className="l-i-tit">
                                        <span className="l-t-bg"><i>{ele.short_tag}</i></span>
                                        <span className="l-t-tips">精选商品，限时7折</span>
                                    </div>
                                    <ul>
                                        {
                                            listData[index].goods_list.map((ele,index)=>{
                                                return(
                                                    <li className="l-goods-info" key={index}>
                                                        <div className="l-checked">
                                                            <Checkbox  defaultChecked="true"/>
                                                        </div>
                                                        <div className="l-img">
                                                            <img src={ele.goods_thumbnail} alt=""/>
                                                        </div>
                                                        <div className="l-info">
                                                            <p className="l-name">{ele.goods_name}</p>
                                                            <p className="l-size">{ele.properties.color}&nbsp;{ele.properties.size}</p>
                                                            <div className="l-goods-price">
                                                                <span className="l-g-money">¥{ele.goods_price}</span>
                                                                <div className="l-contro">
                                                                    <Stepper
                                                                        showNumber
                                                                        max={ele.stock}
                                                                        min={1}
                                                                        value= {ele.goods_number}
                                                                        onChange={(num)=>{
                                                                            changeNum(num,ele.cart_item_id,index)
                                                                            console.log(num)
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="l-delete"
                                                             onClick={()=>delItem(ele.cart_item_id)}
                                                        ></div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                </Content>
            </div>
        )
    }

    componentDidMount(){
        this.props.getCartData();
        this.props.listData&&console.log(this.props.listData)
        /* document.querySelector(".l-content-list").style.display = "none";
           document.querySelector(".footer").style.display="none";*/

    }

};

function mapStateToProps(state) {
    return {
        cartData:state.cartReducer.cartData,
        listData:state.cartReducer.listData
    }

};

function mapDispatchToProps(dispatch) {
    return {
        getCartData(){
            fetch("/api/v4/cart",{timeout:20000,credentials: 'include',method:'POST'})
                .then(res=>res.json())
                .then(data=>{
                    var data1 = data.data;
                    var data2 = data.data.sections;

                    dispatch({type:"getCartData",data:{cartData:data1,listData:data2}})
                })
        },
        changeNum(num,id,index){
            var obj={};
            obj[id] = num;
            Toast.loading("提交中...")
            fetch(`/api/v4/cart` ,{
                timeout:20000,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify({
                    action:'chg',
                    cart_items:obj
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    Toast.hide()
                    var data1 = data.data.sections;
                    dispatch({type:"changeCartData",data:{listData:data1}})
                })
        },
        delItem(id){
            var str = JSON.stringify(id);
            var arr =[str];
            fetch('/api/v4/cart' ,{
                timeout:20000,
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:'POST',
                body: JSON.stringify({
                    action:'clear',
                    cart_items_ids:arr
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                })
        },
        dispatch:dispatch
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Cart);