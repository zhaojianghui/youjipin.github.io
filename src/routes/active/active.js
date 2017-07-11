/**
 * Created by Administrator on 2017/6/14.
 */
import React,{Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {Icon,ListView,RefreshControl,Toast} from "antd-mobile";

import "./active.css"
import Header from "../../components/public/public";
const RenderRow =(rowData)=>{
    // console.log(rowData)
    return (<li className="y-iem" >
        <a href="" className="y-track">
            <Link to={`/detail/${rowData.goods_id&&rowData.goods_id}`}>
            <img className="y-lazyload" src={rowData.thumbnail}/>
            </Link>
        </a>
        <div className="y-goods-info">
            <p className="y-selling">{rowData.selling_point}</p>
            <p className="y-name">{rowData.goods_name}</p>
            <div className="y-price">
                <span>¥ {rowData.goods_price}</span>
                <span className="y-market">¥ {rowData.market_price}</span>
            </div>
        </div>
    </li>)
};
class ActivePage extends Component{
    state = {
        pageNum: 1,
        refreshing:false
    }
    render(){
        console.log(this.props)
        const {ltData,listData}=this.props;
        // console.log("props"+this.props)

        const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        const dataSource = ds.cloneWithRows(listData)
        return (<div className="y-active-page">
                   <Header title={"首页"}/>
                    <div className="y-containt">
                        {listData[0]&& <ListView className="y-lists"
                            style={{
                                height: document.documentElement.clientHeight - (2 * window.devicePixelRatio / 2),
                            }}
                            initialListSize={10}
                            pageSize={10}
                            renderHeader={()=> <section className="y-section">
                                    <img src={ltData&&ltData.top_image}/>
                                    <div className="y-activity">
                                        <div className="y-t">{ltData&&ltData.name}</div>
                                        <div className="y-con">{ltData&&ltData.intro}</div>
                                    </div>
                                </section>
                           }
                            dataSource={dataSource}
                            refreshControl={<RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>{this.refresh()}}
                             />}
                             scrollRenderAheadDistance={100}
                            useZscroller={true}
                            renderRow={RenderRow}
                            scrollerOptions={{scrollbars: true}}
                            onEndReached={() => {
                                this.loadMore()
                            }}
                            onEndReachedThreshold={10}
                        />}
                    </div>
                </div>)
    }
    refresh(){
        this.setState({
            refreshing:true
        });
    this.props.dispatch(getInitProductData(()=>{
        this.setState({
            refreshing:false,
            pageNum:1,
        })
    }))

    }
    loadMore(){
    var num = this.state.pageNum;
    var tag_id=this.props.params.redirect_content;
    if(num>=3){
        return
    }
    if(this.loading){ return }
    this.loading =true;
    Toast.loading('加载中...', 1);
    this.setState({
        pageNum:++num

    })
        console.log(num)
    this.props.dispatch(getProductMoreData(tag_id,num,()=>{this.loading=false;Toast.hide()}))
    }
    componentDidMount(){

    this.props.dispatch(getInitProductData(this.props.params.redirect_content))
}
}
const getProductMoreData =(tag_id,num,callback)=>{
    return function (dispatch){
        return fetch(`api/v4/tags/${tag_id}?page=${num}`,{timeout:"20000"})
            .then(res=>res.json())
            .then(data=>{
                callback()
                dispatch({type:"getProductListDataMore",payload:{
                    listData:data.data.goods_list,
                    ltData:data.data
                }})
            })
    }
}
const getInitProductData =(tag_id,callback)=>{
    return function (dispatch){
        return fetch("api/v4/tags/"+tag_id+"?page=1",{timeout:"20000"})
            .then(res=>res.json())
            .then(data=>{
                callback&&callback()
                dispatch({type:"getProductListData",payload:{
                    ltData :data.data,
                    listData:data.data.goods_list
                }})
            })
    }
}

var mapStateToProps = (state)=>{
    // console.log(state.listReducer.listData,)
    return {
        listData:state.listReducer.listData,
        ltData:state.listReducer.ltData
    }
}

export default connect(mapStateToProps)(ActivePage)