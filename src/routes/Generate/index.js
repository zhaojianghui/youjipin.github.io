/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import Header from "../../components/public/public";
import fetchJsonp from 'fetch-jsonp';
import {connect} from "redux";
import {Link} from "react-router";
import "./index.css";

//内容组件
class Content extends Component{
    render(){
        return <div className="content">{this.props.children}</div>
    }

}
class Generate extends Component{
    constructor(props){
        super(props);
        this.state={
            generateData :""
        };
    };
    render(){
        const {generateData} = this.state;
        return(
            <div className="page">
                <Header title= "首页"/>
                <Content>
                    <ul className="g-order-info">
                        <li className="g-order-did"><div></div></li>
                        <li className="g-order-sc">订单已生成</li>
                        <li className="g-order-ts">请在45分钟内完成支付</li>
                        <li className="g-order-pay">支付金额  :  <span>¥ { generateData } </span></li>
                        <li className="g-order-zfb"><div></div></li>
                        <li className="g-order-zfbpay">
                                <span></span>
                                <p>支付宝支付</p>
                        </li>
                        <li className="g-order-btn">
                            <Link to="/myOrder">
                            <div>去付款</div>
                            </Link>
                        </li>
                    </ul>
                </Content>
            </div>
        )
    }
    componentDidMount(){
        fetch("/api/v5/settlements/cart",{timeout:20000,credentials: 'include',method:'POST'})
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.status_code == 1205) return;
                this.setState({
                    generateData:data.data.order_amount
                })
            })
    }
}

export default Generate;