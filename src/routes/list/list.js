/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import  Header from "../../components/public/public";
import  "./list.css";
import  {Link} from "react-router";

class Content extends Component{

    render(){
        const  {listData}=this.props;
        //console.log(listData)
        return  <div className="z-content">
                      <div className="z-content-header">
                          <div >搜索“{this.props.name}”结果</div>
                          <div>
                              <p className="z-content-sort one active" onClick={this.props.changeshujuOne}>
                                  <span>人气排序</span>
                                  <span className="z-content-sort-left"></span>
                              </p>

                              <p className="z-content-sort two" onClick={this.props.changeshujuTwo}>
                                  <span>价格排序</span>
                                  <span  className="z-content-sort-right"></span>
                              </p>
                          </div>
                      </div>
                      <ul className="z-content-list">
                          {
                            listData&&listData.map((ele,index)=>{
                                return <li>
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
class ListPage extends Component{
     state={
        listData:[]
     }
     render(){
         const name=this.props.params.name;
         //console.log(name);
         return <div>
                    <Header title="首页"/>
                    <Content name={name} listData={this.state.listData}
                             changeshujuTwo={()=>this.changeshujuTwo()}
                             changeshujuOne={()=>this.changeshujuOne()}/>
                 </div>
     }
     getlistData(){
         fetch("api/v4/search/goods?page=1&q="+this.props.params.name)
             .then(res=>{
                 return res.json()
             }).then(data=>{
             //console.log(data.data.goods_list)
             this.setState({
                 listData:data.data.goods_list
             })
         })
     }
    changeshujuOne(){
        const contSortOne=document.querySelector(".z-content-sort.one") ;
        const contSortTwo=document.querySelector(".z-content-sort.two") ;
        const contSortLeft=document.querySelector(".z-content-sort-left") ;
        const contSortRight=document.querySelector(".z-content-sort-right") ;
        contSortLeft.style.backgroundImage="url(../../image/sj.png)";
        contSortRight.style.backgroundImage="url(../../image/ssj.png)";
        contSortOne.className="z-content-sort one active";
        contSortTwo.className="z-content-sort two "
        fetch("api/v4/search/goods?page=1&q="+this.props.params.name+"&&sort=1")
            .then(res=>{
                return res.json()
            }).then(data=>{
            //console.log(data.data.goods_list)
            this.setState({
                listData:data.data.goods_list
            })
        })
    }
    changeshujuTwo(){
        const contSortOne=document.querySelector(".z-content-sort.one") ;
        const contSortTwo=document.querySelector(".z-content-sort.two") ;
        const contSortLeft=document.querySelector(".z-content-sort-left") ;
        const contSortRight=document.querySelector(".z-content-sort-right") ;
        contSortLeft.style.backgroundImage="url(../../image/hsj.png)";
        contSortRight.style.backgroundImage="url(../../image/hongsj.png)";
        contSortOne.className="z-content-sort one";
        contSortTwo.className="z-content-sort two active"
        fetch("api/v4/search/goods?page=1&q="+this.props.params.name+"&&sort=2&ascend=1")
            .then(res=>{
                return res.json()
            }).then(data=>{
            //console.log(data.data.goods_list)
            this.setState({
                listData:data.data.goods_list
            })
        })
    }
     componentDidMount(){
         this.getlistData()
     }
    componentWillReceiveProps(nextProps) {

        //console.log("new",nextProps.params.name,this.props.params.name)
        if(nextProps.params.name!==this.props.params.name){
            this.props.params.name=nextProps.params.name
            this.getlistData()
        }
    }

}

export default ListPage