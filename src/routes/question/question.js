/**
 * Created by Administrator on 2017/6/15.
 */
import React,{Component} from "react";

import "./question.css"

class QuestionPage extends Component{
    render(){
        return <div className="y-question-page">
                  <div className="y-ask">
                      <ul>
                          <li>
                              <p className="ask">Q：你们的商品是正品么？</p>
                              <p className="answer">A：优集品所售的商品都是正品，和专卖店销售的一样的，请您放心～</p>
                          </li>
                          <li>
                              <p className="ask">Q：你们是海淘么？</p>
                              <p className="answer">A：优集品并不是一般意义上的海淘。我们有专业的买手团队进行直采，让您能够购买到来自世界各的好物，但不会有转运、关税、难以退换货等烦恼。</p>
                          </li>
                          <li>
                              <p className="ask">Q：送货要多长时间？</p>
                              <p className="answer">A：目前合作的配送公司有中通，宅急送，顺丰。根据地域的不同，会在确认订单后的3-7个工作日内将货品送送到您手中。</p>
                          </li>
                          <li>
                              <p className="ask">Q：为什么好久都没收到货？</p>
                              <p className="answer">A：优集品的商品是交给专业靠谱的快递公司运送的，但偶尔会有些不可抗力导致运送缓慢。如果您查不到物流信息或运送出现问题，请及时与我们的客服联系。（在APP、网站上点击“在线客服”，或拨打4000-788-738）</p>
                          </li>
                          <li>
                              <p className="ask">Q：想改收货地址怎么办？</p>
                              <p className="answer">A：请您直接联系客服修改，如果已经发货了，客服会帮您查询快递公司或配送员的联系方式。</p>
                          </li>
                          <li>
                              <p className="ask">Q：需要退换货怎么办？</p>
                              <p className="answer">A：请先联系客服沟通，非质量问题退换货运费由客户承担，质量问题退换货运费请客户先垫付，之后我司会将垫付的运费返还。更多退换货规则查看→ <a href="/v4/agreement" className="y-protocal">客户退换货服务政策</a></p>
                          </li>
                          <li>
                              <p className="ask">Q：什么是优币？</p>
                              <p className="answer">A：优币是优集品向有效会员返还的虚拟购物币，在优集品购物时可以按比例抵扣货款，不能转让或兑换成现金。</p>
                          </li>
                          <li>
                              <p className="ask">Q：领了优惠券，为什么看不到？</p>
                              <p className="answer">A：如果是用手机号领到的优惠券，要用手机号登录才能看到，用邮箱或微信等第三方登录方式是看不到的呢。</p>
                          </li>
                          <li>
                              <p className="ask">Q：为什么商品在购物车里价格变化了？</p>
                              <p className="answer">A：我们会不定时推出各种优惠活动，可能您把商品放在购物车里的那段时间，商品因为活动有调价。如果想查看最新的优惠，请关注活动版块哦。</p>
                          </li>
                          <li>
                              <p className="ask">Q：你们APP的文案为什么那么像东北话？</p>
                              <p className="answer">A：因为我们团队里真的很多东北姑娘，老敞亮了！</p>
                          </li>
                      </ul>
                  </div>
               </div>
    }
}
export default QuestionPage