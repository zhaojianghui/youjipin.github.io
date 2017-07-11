/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import  "./shopping.css";
import  {Link} from "react-router";
import  Header from "../../components/public/public";
class Content extends Component{
    render(){
        const  {listData}=this.props;
        return      <div className="z-shoppingAll">
                    <div className="z-content-shoplognOne">
                        <img src={listData.logo&&listData.logo} />
                        <div className="z-content-shopdetailOne">
                            <span>{listData.name&&listData.name}</span>
                            <p>
                                <span></span>
                                <span>{listData.country&&listData.country}</span>
                                <span>{listData.position&&listData.position}</span>
                            </p>
                        </div>
                    </div>
                    <div className="z-shopping-cont">{listData.intro&&listData.intro}</div>
                    <ul className="z-content-list">
                          {
                            listData.goods_list&&listData.goods_list.map((ele,index)=>{
                                return <li key={index}>
                                            <Link to={`/detail/${ele.goods_id}`}>
                                                <img src={ele.thumbnail} />
                                            </Link>
                                              <p>{ele.selling_point}</p>
                                              <p>{ele.goods_name}</p>
                                              <p>
                                                  <span>¥{ele.goods_price}</span>
                                                  <span>¥{ele.market_price}</span>
                                              </p>
                                        </li>
                            })
                          }
                      </ul>
                  </div>
    }

}
class ShopPage extends Component{
     state={
        listData:[]
     }
     render(){

         return <div>
                    <Header title={"首页"}/>
                    <Content  listData={this.state.listData}/>
                 </div>
     }
     getlistData(){
         fetch("api/v4/tags/"+this.props.params.tag_id)
             .then(res=>{
                 return res.json()
             }).then(data=>{
             console.log(data.data)
             this.setState({
                 listData:data.data
             })
         })
     }
     componentDidMount(){
         this.getlistData()
     }
}

export default ShopPage