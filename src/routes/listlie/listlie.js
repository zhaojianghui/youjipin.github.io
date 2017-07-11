/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import  "./listlie.css";
import  {Link} from "react-router";
import  Header from "../../components/public/public";
class Content extends Component{
    render(){
        const  {listData}=this.props;
        return     <ul className="z-content-list">
                          {
                            listData&&listData.map((ele,index)=>{
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
    }

}
class ListliePage extends Component{
     state={
        listData:[]
     }
     render(){
         const name=this.props.params.name;
         //console.log(name);
         return <div>
                    <Header title={"首页"}/>
                    <Content name={name} listData={this.state.listData}/>
                 </div>
     }
     getlistData(){
         fetch("api/v4/tags/"+this.props.params.tag_id)
             .then(res=>{
                 return res.json()
             }).then(data=>{
             console.log(data.data.goods_list)
             this.setState({
                 listData:data.data.goods_list
             })
         })
     }
     componentDidMount(){
         this.getlistData()
     }
}

export default ListliePage