/**
 * Created by Administrator on 2017/6/15.
 */
import React,{Component} from "react";

import {Link} from "react-router";
import "./mine.css"
import Header from "../../components/public/public";
class MinePage extends Component{
    state={
        userPhone:''
    }
    render(){
        return <div className="y-mypage">
                    <Header title={"首页"} />
                    <div className="y-main">
                        <div className="y-welcome">
                            <div className="y-bg-img"></div>
                            <div className="y-in-fo">
                                <p><span className="y-nickname">{this.state.userPhone}</span></p>
                                <p><span className="y-sign_integral">0</span> 优币
                                </p></div>
                        </div>
                        <div className="y-personal y-mt10">
                            <ul>
                                <li className="y-yj"><Link to="/myOrder" className="y-my-order">我的订单</Link></li>
                                <li className="y-yj"><Link to="/" className="y-my-keep">我的浏览记录</Link></li>
                                <li className="y-yj"><Link to="/cheap" className="y-my-coupon">我的优惠券<span><em>5</em> 张</span></Link></li>
                                <li className="y-yj"><Link to="/expense" className="y-balance">我的余额<span className="y-bar">￥<em>0.00</em></span></Link></li>
                                <li className="y-yj"><Link to="/adress" className="y-address">地址管理</Link></li>
                                <li className="y-yj"><Link to="/about" className="">关于我们</Link></li>
                                <li className="y-yj"><Link to="/question" cssName="">常见问题</Link></li>
                                <li className="y-yj y-mt10" onClick={()=>this.logout()}><Link to="/" className="y-sign-out">退出登录</Link></li>
                            </ul>
                        </div>
                        <div className="y-f-info y-pt16">
                            优集品©2011-2015 京ICP备11028595号
                            <p className="y-color-red">客服电话 <a href="tel:4000788738">4000788738</a></p>
                        </div>
                    </div>
                </div>
    }
    logout(){
         localStorage.removeItem("userPhone")
    }
    componentDidMount(){
        this.setState({
            userPhone:localStorage.getItem("userPhone")
        })
        fetch("api/v4/users/me")
            .then(res=>res.json())
            .then(data=>{
                myData:data
                console.log(data)
            })

    }
}
export default MinePage