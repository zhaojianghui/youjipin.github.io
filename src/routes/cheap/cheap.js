/**
 * Created by Administrator on 2017/6/15.
 */
import React,{Component} from "react";

import Header from "../../components/public/public";
import "./cheap.css";
import Oimg from "../../image/coupons_y.jpg";
class CheapPage extends Component{
    render(){
        return <div className="y-cheap-page">
                    <Header title={"首页"}/>
                    <div className="y-box">
                        <div className="y-exchange-box">
                            <input type="text" className="y-exchange-input" />
                                <div className="y-exchange-btn">兑换</div>
                        </div>
                    </div>
                    <div className="y-con">
                        <ul className="y-ul">
                                <li  content="满￥618, 减￥118.00" className="y-rank">
                                    <div className="y-l"><span className="check"></span></div>
                                    <div className="y-r"><img src={Oimg}/>
                                        <div className="y-price"><em>¥</em><span>118</span></div>
                                        <div className="y-name"><em>618会员美体券</em> <span>满￥618, 减￥118.00</span></div>
                                        <div className="y-coupons-date"><span className="y-range">仅限全球购、健康美体类商品使用！</span>有效期：2017-06-14-2017-06-20
                                        </div>
                                    </div>
                                </li>
                                <li  content="满￥618, 减￥188.00" className="y-rank">
                                    <div className="y-l"><span className="check"></span></div>
                                    <div className="y-r"><img src={Oimg}/>
                                        <div className="y-price"><em>¥</em><span>188</span></div>
                                        <div className="y-name"><em>618会员美体券</em> <span>满￥888, 减￥188.00</span></div>
                                        <div className="y-coupons-date"><span className="y-range">仅限全球购、健康美体类商品使用！</span>有效期：2017-06-14-2017-06-20
                                        </div>
                                    </div>
                                </li>
                                <li  content="满￥618, 减￥188.00" className="y-rank">
                                    <div className="y-l"><span className="check"></span></div>
                                    <div className="y-r"><img src={Oimg}/>
                                        <div className="y-price"><em>¥</em><span>118</span></div>
                                        <div className="y-name"><em>618品类专享券</em> <span>满￥618, 减￥188.00</span></div>
                                        <div className="y-coupons-date"><span className="y-range">仅限全球购、健康美体类商品使用！</span>有效期：2017-06-14-2017-06-20
                                        </div>
                                    </div>
                                </li>
                                <li  content="满￥618, 减￥618.00" className="y-rank">
                                    <div className="y-l"><span className="check"></span></div>
                                    <div className="y-r"><img src={Oimg}/>
                                        <div className="y-price"><em>¥</em><span>618</span></div>
                                        <div className="y-name"><em>618会员美体券</em> <span>满￥1888, 减￥618.00</span></div>
                                        <div className="y-coupons-date"><span className="y-range">仅限全球购、健康美体类商品使用！</span>有效期：2017-06-14-2017-06-20
                                        </div>
                                    </div>
                                </li>
                                <li  content="满￥618, 减￥10.00" className="y-rank">
                                    <div className="y-l"><span className="check"></span></div>
                                    <div className="y-r"><img src={Oimg}/>
                                        <div className="y-price"><em>¥</em><span>10</span></div>
                                        <div className="y-name"><em>新用户福利卷</em> <span>满￥99, 减￥10.00</span></div>
                                        <div className="y-coupons-date"><span className="y-range">仅限全球购、健康美体类商品使用！</span>有效期：2017-06-14-2017-06-20
                                        </div>
                                    </div>
                                </li>
                        </ul>
                    </div>
                </div>
    }
    componentDidMount(){
        fetch("api/v4/users/coupons")
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
                // conData:data
            })
    }
}
export default CheapPage