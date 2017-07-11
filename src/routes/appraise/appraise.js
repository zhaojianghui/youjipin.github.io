/**
 * Created by Administrator on 2017/6/16.
 */
import React,{Component} from "react";
import  Header from "../../components/public/public";
import  "./appraise.css";
class Content extends  Component{
    render(){
        const {contData}=this.props;
        return  <div className="z-content-conter">
                    {
                        contData&&contData.map((ele,index)=>{
                            return  <div key={index} >
                                        <p>{ele.user_name}</p>
                                        <p>{ele.content}</p>
                                        <p>
                                            <span>颜色：白色</span>
                                            <span>均码</span>
                                        </p>
                                        <p>{ele.reply[0]&&ele.reply[0].content}</p>
                                    </div>
                        })
                    }
                </div>
    }

}
class AppraisePage extends Component{
    state={
        contData:[]
    }
    render(){
        console.log(this.props)
        return  <div>
                    <Header title={"首页"}/>
                    <Content contData={this.state.contData}/>
                </div>
    }
    componentDidMount(){
        fetch("/api/v4/goods/"+this.props.params.goods_id+"/comments?")
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.data)
                this.setState({
                    contData:data.data
                })
            })
    }
}
export default AppraisePage