/**
 * Created by Administrator on 2017/6/13.
 */
import React,{Component} from "react";
import {Link} from "react-router";
import "./login.css"
import Img from "../../image/login1.jpg"

class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state={
            mobile:"",
            password:"",
            err:"",
            time:60,
            nameItem:''
        }
    }
    render(){
        console.log(this.state.nameItem)
        return <div className="y-login-page">
            <img src={Img} alt=""/>
            <a className="y-go-back">
                <em></em>
            </a>
            <div className="y-login-items">
                <div className="y-items">
                          <span className="y-icon">
                              <em></em>
                          </span>
                    <input name="mobile" type="text" className="y-input-text"
                           placeholder="请输入手机号" onChange={(e)=>{this.changeMobile(e)}}/>
                </div>
                <div className="y-items">
                          <span className="y-icon y-icon-pass">
                              <em></em>
                          </span>
                    <input name="password" type="password" className="y-input-pass"
                           placeholder="请输入验证码" onChange={(e)=>{this.changePassword(e)}}/>
                    <div className="get-code quick" onClick={()=>this.confirmSubmit()}>验证</div>
                </div>
                <div className="y-tips y-ttc y-hide">{this.state.err}</div>
                <input className="y-login-btn" type="submit" value="手机快捷登录"
                       onClick={this.handleClick.bind(this,this.state.mobile,this.state.password)}/>
                <div className="tips-phone">
                    <p>未注册的手机号，登录时将自动注册，登录即表示您同意</p>
                    <p><a href="/v4/agreement">《优集品用户协议》</a></p>
                </div>
            </div>
        </div>
    }
    changeMobile(e){
        this.setState({
            mobile:e.target.value
        })
    }
    changePassword(e){
        this.setState({
            password:e.target.value
        })

    }
    handleClick(){
        if(this.state.mobile === ""||this.state.mobile===null){
            this.setState({
                err: "* 用户名不能为空"
            })
        }else if(this.state.password === ""||this.state.password === null){
            this.setState({
                err: "* 验证码码不能为空"
            })
        }else{
            window.location.href="/#/mine"
        }
        const reg1=/^1[3578]\d{3,11}$/
        const reg2=/^\d{4}$/
        if(!reg1.test(this.state.mobile)){
            alert("手机号码输入错误")
            return
        }
        if(reg1.test(this.state.mobile)&&!reg2.test(this.state.password)){
            alert("验证码输入错误")
            return
        }
        if(reg1.test(this.state.mobile)&&reg2.test(this.state.password)){
            localStorage.setItem("userPhone",this.state.mobile)

        }

    }
    confirmSubmit(){
         const getCode=document.querySelector(".get-code.quick");
         var time=this.state.time;
         const timer=setInterval(() =>{
                         time--;
             getCode.innerHTML=time;
             if(time<1){
                 clearInterval(timer)
                 getCode.innerHTML="验证"
             }
                     },1000)

    }

}


export default LoginPage
