/**
 * Created by Administrator on 2017/6/15.
 */
import React,{Component} from "react";
import  Header from "../../components/public/public";
import  "./detail.css";
import  {Link} from "react-router";
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
class Content extends  Component{
    state = {
        initialHeight: 640


    }
    scroll() {
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
        return document.body.scrollTop||document.documentElement.scrollTop
    }
    render(){
            const {data,buyData,addToCart}=this.props;
           // console.log(data.products&&data.products.properties["花色"]);
            var attributes = []
            if(data.attributes){
                for(var attr in data.attributes){
                    attributes.push({
                        title:attr,
                        value:data.attributes[attr]
                    })
                }
            }

            const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {height:"640px"};
            return <div className="z-content">
                        <Carousel
                            className="my-carousel"
                            autoplay={true}
                            infinite
                            selectedIndex={1}
                            swipeSpeed={35000}
                        >
                            {(data.splash&&data.splash||[]).map((ele,index) => (
                                 <a href="http://www.baidu.com" key={index} style={hProp}>
                                   <img
                                        src={ele}
                                        alt="icon"
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({
                                                initialHeight: null,
                                            });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                        <div className="z-content-name">{data.goods_name}</div>
                        <div className="z-content-price">
                            <span>¥{data.goods_price}</span>
                            <span></span>
                            <span>已售{data.sold_number}件</span>
                        </div>
                        <div className="z-content-title">
                            <span>限时优惠</span>
                            <span>精选推荐-限时特惠</span>
                        </div>
                        <ul className="z-content-lieone">
                            {
                                data.services&&data.services.map((ele,index)=>{
                                    return  <li>
                                                <span></span>
                                                <span>{ele.desc}</span>
                                            </li>
                                })
                            }
                            <p></p>
                        </ul>
                        <div className="z-content-class">
                            <span>{data.default_selected_product}</span>
                            <p></p>
                        </div>
                        <div className="z-content-shop">
                            <div className="z-content-shoplogn">
                                <img src={data.brand&&data.brand.logo} />
                                <div className="z-content-shopdetail">
                                    <span>{data.brand&&data.brand.name}</span>
                                    <p>
                                        <span></span>
                                        <span>{data.brand&&data.brand.country}</span>
                                        <span>{data.brand&&data.brand.position}</span>
                                    </p>
                                </div>
                                <span className="z-content-shopright"></span>
                            </div>
                            <Link to={`/shopping/${data.brand&&data.brand.tag_id}`}>
                            <div className="z-content-shopnum">查看在售商品{data.brand&&data.brand.goods_count}件</div>
                            </Link>
                        </div>
                        <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <th>商品属性</th>
                            {
                                attributes&&attributes.length&&attributes.map((e,i)=>{
                                    return <tr>
                                                <td className="z-title">{e.title}</td>
                                                <td>{e.value}</td>
                                            </tr>
                                })
                            }
                        </table>
                        <div className="z-shopping-detail">
                            <p>商品详情</p>
                            <p>{data.story&&data.story.intro}</p>
                            <p>
                                {
                                    data.story&&data.story.slices.map((ele,index)=>{
                                       return   <div>
                                               <span>{ele.content}</span>
                                                <img src={ele.image} />
                                                </div>
                                    })
                                }
                            </p>
                        </div>
                        <div className="z-shop-use">
                            <p>使用方法</p>
                            <p>{data&&data.instructions}</p>
                        </div>
                        <div className="z-shop-thing">
                            <p>注意事项</p>
                            {
                                data.tips&&data.tips.map((ele,index)=>{
                                    return  <p key={index} className="z-shop-thingOne">
                                              <span>{ele}</span>
                                            </p>
                                })

                            }
                        </div>
                        <div className="z-shop-content">
                            <div className="z-shop-content-top">
                                <p>
                                    <span>用户评论</span>
                                    <span>（{data&&data.comment_count}）</span>
                                </p>
                                <p>
                                    <span>{data.comments&&data.comments.user_name}</span>
                                    <span>{data.comments&&data.comments.content}</span>
                                </p>
                            </div>
                            <Link to={`/appraise/${data.goods_id&&data.goods_id}`}>
                            <div className="z-shop-content-bom">查看全部评价</div>
                            </Link>
                        </div>
                        <div className="z-shopping-buy-header">{buyData&&buyData.title}</div>
                        <ul className="z-shopping-buy">
                            {
                             buyData.goods_list&&buyData.goods_list.map((ele,index)=>{
                                 return  <li>
                                              <Link to={`/detail/${ele.goods_id}`}>
                                              <img src={ele.thumbnail}  onClick={()=>{
                                                  console.log(this.scroll())
                                              }

                                              }/>
                                              </Link>
                                              <p>{ele.goods_name}</p>
                                              <p>
                                                  <span>{ele.goods_price}</span>
                                                  <span>{ele.market_price}</span>
                                              </p>
                                         </li>
                             })
                            }
                        </ul>
                        <div className="z-filter-detail">
                             <div className="z-filter-gwc">
                                  <div className="z-one">
                                      <img src={data.thumbnail&&data.thumbnail}/>
                                      <p>
                                          <span>{data.goods_name&&data.goods_name}</span>
                                          <span>¥{data.goods_price&&data.goods_price}</span>
                                      </p>
                                      <p onClick={()=>{this.close()}} className="z-close">×</p>
                                  </div>
                                 <div className="z-color" >
                                     <p>花色</p>
                                     <div className="z-colorAll">
                                     {
                                         data.products&&data.products.properties["花色"].map((ele,index)=>{
                                             return <p className="z-color-lie" onClick={(e)=>this.changeColor(e)}>{ele}</p>
                                         })
                                     }
                                     </div>
                                 </div>
                                 <div  className="z-color">
                                     <p>尺寸</p>
                                     <div >
                                     {
                                     data.products&&data.products.properties["尺寸"].map((ele,index)=>{
                                         return <p >{ele}</p>
                                     })
                                     }
                                     </div>
                                 </div>
                                 <div className="z-count">
                                     <p>数量</p>
                                     <p>
                                         <button>-</button>
                                         <input type="text"value={1} />
                                         <button>+</button>
                                     </p>
                                 </div>
                                 <div className="z-btn" onClick={()=>{ addToCart(data.products&&data.products.list[0].product_id)}}>加入购物袋</div>
                             </div>
                        </div>
                    </div>
    }
    changeColor(e){
        const p=document.querySelectorAll(" .z-colorAll p")
        //p.style.background="#ccc";
        for(var i=0;i<p.length;i++){
            p[i].style.background="#fff";
            p[i].style.color="#4F494B";
            p[i].style.border="1px solid #4F494B";
        }
        //console.log(p)
        e.target.style.background="#E74C3C";
        e.target.style.color="#fff";
        e.target.style.border="1px solid #E74C3C";
    }
    close(){
        const  filter=document.querySelector(".z-filter-detail");
        filter.style.display="none";
    }

}
class Footer extends Component{
    render(){
        const  data=this.props;
        //console.log(data)
        return  <div className="z-footer">
                    <span>总价</span>
                    <span>¥{data.data.goods_price&&data.data.goods_price}</span>
                    <span onClick={()=>this.changeShow()}>立即购买</span>
                </div>
    }
    changeShow(){
        const  filter=document.querySelector(".z-filter-detail");
        filter.style.display="block";
    }
}
class DetailPage extends  Component{
    state = {
        data:[],
        buyData:[]


    }
    render(){

        const  goods_id=this.props.params.goods_id;
        //console.log(goods_id)
        return (
            <div>
                <Header title={"首页"}/>
                <Content data={this.state.data} buyData={this.state.buyData} addToCart={this.addToCart}/>
                <Footer data={this.state.data}/>
            </div>
        )
    }
    componentDidMount() {
       this.getdetailData()
    }
    getdetailData(){
        fetch("api/v4/goods/"+this.props.params.goods_id)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    data:data.data
                })
            })
        fetch("api/v4/search/goods/recommend?sc=goods"+this.props.params.goods_id)
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data.data)
                this.setState({
                    buyData:data.data
                })
            })
    }
    componentWillReceiveProps(nextProps) {

        //console.log("new",nextProps.params.name,this.props.params.name)
        if(nextProps.params.goods_id!==this.props.params.goods_id){
            this.props.params.goods_id=nextProps.params.goods_id
            this.getdetailData()
        }
    }
    addToCart(id){
        fetch(`/api/v4/cart/products` ,{
            timeout:20000,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                count:1,
                product_id:id
            })
        })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                alert("已成功加入购物车")
                document.querySelector(".z-filter-detail").style.display = "none";
            })
    }
}
export default DetailPage