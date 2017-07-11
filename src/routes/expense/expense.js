/**
 * Created by Administrator on 2017/6/16.
 */
import React,{Component} from "react";

import "./expense.css";
import Oimg from "../../image/mimg.jpg"
import Header from "../../components/public/public";
class ExpendsPage extends Component{
    render(){
        return <div className="y-extends-page">
                    <Header title={"首页"}/>
                    <div className="y-extends">
                        <div className="y-heade">
                            <h2>账户余额：<span>￥0.00</span></h2>
                            <p>帐户余额可在购物下单结算时最大化使用，不支持提现；余额明细用于了解余额变化；如有任何问题，请联系优集品客服进行咨询。</p>
                        </div>
                        <div className="y-checklist">
                            <figure>
                                <img src={Oimg} />
                            <figcaption>暂时没有内容~</figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
    }
}
export default ExpendsPage