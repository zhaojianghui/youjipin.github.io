/**
 * Created by Administrator on 2017/6/13.
 */
import React,{Component} from "react";
import  Header from "../../components/public/public";
import  "./index.css";
import  {Link} from "react-router";
import  LognImg from "../../image/logo.png";
import  Title from "../../image/title.png";
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
class Content extends Component {
    state = {
        data: [],
        ImgData:[],
        LieData:[],
        timeData:[],
        DataOne:[],
        DataTwo:[],
        listData:[],
        FlieData:[],
        h:[],
        m:[],
        s:[],
        initialHeight: 320

    }

    render() {
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {height:"320px"};
        const {ImgData,LieData,timeData,DataOne,DataTwo,h,m,s,listData}=this.state;
        if(!(timeData.cover&&timeData.cover)){
            timeData.cover==Title
        }
        console.log(this.state);
        return (
                <div className="z-content">
                <Carousel
                    className="my-carousel"
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35000}

                >
                    {this.state.data.map((ele,index) => (
                        <Link to={`/active/${ele.redirect_content}`} key={index} style={hProp}>
                            <img
                                src={ele.cover}
                                alt="icon"
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({
                                        initialHeight: null,
                                    });
                                }}
                            />
                        </Link>
                    ))}

                </Carousel>
                <ul className="z-content-lie">{
                    ImgData.map((ele,index)=>{
                        return  < li key={index}>
                                    <img src={ele.tab_icon} alt=""/>
                                </li>
                    })
                }</ul>
                <Link to={`/active/${LieData.feature_id}`}>
                <img src={LieData.cover} className="z-img-item"/>
                </Link>
                <div className="z-seckill">
                    <Link to={`/detail/${timeData.goods_id&&timeData.goods_id}`}>
                    <img src={timeData.goods_thumbnail} className="z-seckill-leftImg" />
                    </Link>
                    <div className="z-seckill-middle">¥{timeData.seckill_price}</div>
                    <div className="z-seckill-right">
                        <img src={Title} className="z-seckill-rightImg"/>
                        <div className="z-seckill-time">
                            <span>{h}</span><i>:</i>
                            <span>{m}</span><i>:</i>
                            <span>{s}</span>
                        </div>
                    </div>
                </div>
                    <Link to={`/active/${DataOne.feature_id}`}>
                <img src={DataOne.cover&&DataOne.cover} className="z-dataone-img" />
                    </Link>
                <ul className="z-dataone">
                    {
                        DataOne["goods_list"]&&DataOne["goods_list"].map((ele,index)=>{
                            return<li>
                                      <Link to={`/detail/${ele.goods_id}`}>
                                      <img src={ele.thumbnail}/>
                                      </Link>
                                      <p>{ele.goods_name}</p>
                                      <p>
                                          <span>¥{ele.market_price}</span>
                                          <span>¥{ele.goods_price}</span>
                                      </p>
                                  </li>
                        })
                    }
                </ul>
                    <Link to={`/active/${DataTwo.feature_id}`}>
                <img src={DataTwo.cover&&DataTwo.cover} className="z-dataone-img" />
                    </Link>
                <ul className="z-dataone">
                    {
                        DataTwo["goods_list"]&&DataTwo["goods_list"].map((ele,index)=>{
                            return<li key={index}>
                                <Link to={`/detail/${ele.goods_id}`}>
                                <img src={ele.thumbnail}/>
                                </Link>
                                <p>{ele.goods_name}</p>
                                <p>
                                    <span>¥{ele.market_price}</span>
                                    <span>¥{ele.goods_price}</span>
                                </p>
                            </li>
                        })
                    }
                </ul>
                {
                    listData.map((ele,index)=>{
                        return <div key={index}>
                                <div className="z-listData">{listData[index]&&listData[index].name}</div>
                                        <ul className="z-listData-wrap">
                                        {
                                            listData&&listData[index].goods_list.map((ele,num)=>{
                                                return  <li key={num}>
                                                    <Link to={`/detail/${ele.goods_id}`}>
                                                    <img src={ele.thumbnail}/>
                                                    </Link>
                                                    <p>{ele.selling_point}</p>
                                                    <p>{ele.goods_name}</p>
                                                    <p className="z-third">
                                                        <span>¥{ele.goods_price}</span>
                                                        <span>¥{ele.market_price}</span>
                                                    </p>
                                                </li>

                                            })
                                        }
                                    <Link to={`/listlie/${ele.tag_id}`} className="z-li-shop">
                                    <div className="z-listData-wrap-item">
                                        <p>{listData[index]&&listData[index].name}</p>
                                        <p>还有{listData[index]&&listData[index].goods_amount}件生活好物</p>
                                        <p></p>
                                    </div>
                                    </Link>
                                    </ul>
                               </div>
                    })
                }

                </div>
        )
    }
    setTime(){
        setInterval(()=>{
            const newDate=new Date();
            const endData=new Date('2017/06/19 24:00');
            const num = endData - newDate; //剩余的毫秒数
            const h = parseInt( num/1000/60/60 );
            const m = parseInt( num/1000/60%60 );
            const s = parseInt( num/1000%60 );
            this.setState({
                h:h<10?"0"+h:h, m:m<10?"0"+m:m, s:s<10?"0"+s:s
            })
        },1000);
    }
    componentDidMount() {

            fetch("/api/v5/home")
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    //console.log(data.data.activity_list)
                    if(data.data.activity_list.length==7){
                        this.setState({
                            data:data.data.splash_list,
                            ImgData:data.data.activity_list[0].tab_list,
                            LieData:data.data.activity_list[1],
                            timeData:data.data.activity_list[4],
                            DataOne:data.data.activity_list[5],
                            DataTwo:data.data.activity_list[6],
                            listData:data.data.tag_list
                        })
                    }
                    if(data.data.activity_list.length==6){
                        this.setState({
                            data:data.data.splash_list,
                            ImgData:data.data.activity_list[0].tab_list,
                            LieData:data.data.activity_list[1],
                            timeData:data.data.activity_list[3],
                            DataOne:data.data.activity_list[4],
                            DataTwo:data.data.activity_list[5],
                            listData:data.data.tag_list
                        })
                    }
                    if(data.data.activity_list.length==5){
                        this.setState({
                            data:data.data.splash_list,
                            ImgData:data.data.activity_list[0].tab_list,
                            LieData:data.data.activity_list[1],
                            timeData:data.data.activity_list[2],
                            DataOne:data.data.activity_list[3],
                            DataTwo:data.data.activity_list[4],
                            listData:data.data.tag_list
                        })
                    }

                })

      }


}
class IndexPage extends  Component{
    state={
       status:false
    }
    render(){
        const Logn=<img src={LognImg}/>
        return <div>
                  <Header title={Logn}/>
                  <Content />
               </div>
    }

}

export default IndexPage