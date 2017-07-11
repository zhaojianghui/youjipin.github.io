/**
 * Created by Administrator on 2017/6/15.
 */
import React,{Component} from "react";
import {Checkbox,List, InputItem,Toast,Picker,Item} from "antd-mobile";
import Header from "../../components/public/public";
import fetchJsonp from "fetch-jsonp";
import {connect} from "redux";
import { createForm } from 'rc-form';
import "./index.css";
import id1 from "./imgs/id.png";
import id2 from "./imgs/id1.png";

//内容组件
class Content extends Component{
    render(){
        return <div className="content">{this.props.children}</div>
    }

}
var address =[];
class Adress extends Component{
    constructor(props){
        super(props);
        this.state={
            visible: false,
            selected: '',
            focused: false,
            focused1: false,
            hasError: false,
            value: '',
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: [],
            name:''

        }

       /* this.handleChange = this.handleChange.bind(this);*/
    }


    onSelect = (opt) => {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
        var phone = value;
        console.log(phone);
        address.push(phone);
        localStorage.setItem("phone",phone);
    }


    onClick = () => {
        !this.state.asyncValue.length&&fetch(`/Services/Proxy.ashx?r=0.14424895709433594&methodName=customer.getregions_1.0&method=customer.getregions&ver=1.0`)
            .then(res=>res.json()).then(data=>{
                console.log(data)
                var arr = data.data.map(e=>({label:e.name,value:e.id}))
                this.setState({
                    data:arr
                })
            }).catch(e=>console.log(e))
    };

    onPickerChange = (val) => {
        console.log(val);

        var colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        var url = `/Services/Proxy.ashx?r=0.468610955010067&parentid=${val[0]}&methodName=customer.getregions_1.0&method=customer.getregions&ver=1.0`
        fetch(url)
            .then(res=>res.json()).then(data=>{

            console.log(data)
            var arr = data.data.map(e=>({label:e.name,value:e.id}))
            d.forEach((ele) => {
                if(ele.value === val[0]){

                    if(!ele.children){
                        ele.children = arr;
                        colNum = 2;
                        asyncValue.push(ele.value);
                        var sheng = ele.label;
                        console.log(sheng);
                        //添加省份进数组;
                        address.push(sheng)
                        localStorage.setItem("sheng",sheng)
                    }else {
                        ele.children.forEach(cEle=>{
                            if(cEle.value === val[1]){
                                colNum = 3;
                                if(!cEle.children){
                                    //数据请求
                                    fetch(`/Services/Proxy.ashx?r=0.6463642002270928&parentid=${val[1]}&methodName=customer.getregions_1.0&method=customer.getregions&ver=1.0`)
                                        .then(res=>res.json()).then(data=>{
                                        var arr2 = data.data.map(e=>({label:e.name,value:e.id}))
                                        cEle.children=arr2;
                                        asyncValue.push(cEle.value);
                                        var shi = cEle.label;
                                        console.log(shi)
                                        address.push(shi)
                                        localStorage.setItem("shi",shi)
                                        this.setState({
                                            data:d,
                                            cols:colNum,
                                            asyncValue,
                                        })
                                    })

                                }else{
                                    cEle.children.forEach(ccEle=>{
                                        if(ccEle.value === val[2]){
                                            asyncValue.push(ccEle.value);
                                            var xian = ccEle.label;
                                            console.log(xian)
                                            address.push(xian)
                                            localStorage.setItem("xian",xian)
                                            this.setState({
                                                data:d,
                                                cols:colNum,
                                                asyncValue,
                                            })
                                        }
                                    })
                                }
                            }
                        })
                    }

                }
            })
            this.setState({
                data:d,
                cols:colNum,
                asyncValue,
            })

        }).catch(e=>console.log(e))
        console.log(address)
    };
   /* handleChange(event) {
        this.setState({name: event.target.value});
        localStorage.setItem("name",this.state.name)
    }*/
    render(){
        return(
            <div className="page">
                <Header title="首页"/>
                <Content>

                    <div className="select-adress">
                        <ul className="a-content">
                            <li>
                                <div className="a-uname">

                                    <p>收件人 : <span>大飞</span></p>
                                    <p className="a-phone">
                                        {localStorage.getItem("phone")}
                                    </p>
                                </div>
                                <div className="a-shopping-adress">
                                    {localStorage.getItem("sheng")}{localStorage.getItem("shi")}{localStorage.getItem("xian")}
                                </div>
                                <div className="a-default-adress"> 默认地址</div>
                            </li>
                        </ul>
                        <div className="a-add-btn" onClick={()=>this.changeStata()}>
                            添加新地址
                        </div>
                    </div>
                    <div className="add-adress" >
                        <div  className="l-a-info">
                            <List>
                                <InputItem data-seed="logId" 
                                >姓名:</InputItem>
                            </List>
                            <List>
                                <InputItem
                                    type="phone"
                                    error={this.state.hasError}
                                    onErrorClick={this.onErrorClick}
                                    onChange={this.onChange}
                                    value={this.state.value}
                                >电话:</InputItem>
                            </List>
                            <List style={{ backgroundColor: 'white' }} className="picker-list">

                                <Picker
                                    data={this.state.data}
                                    cols={this.state.cols}
                                    value={this.state.asyncValue}
                                    onPickerChange={this.onPickerChange}

                                >
                                    <List.Item arrow="horizontal" onClick={this.onClick}>选择地区:</List.Item>
                                </Picker>
                                <InputItem
                                    className="l-detial"
                                >详细地址:</InputItem>
                            </List>

                        </div>



                        <div className="set-def">
                            < Checkbox />
                            &nbsp;&nbsp;&nbsp;设置为默认地址
                        </div>
                        <div className="verification">
                            <div className="v-tit">验证身份信息:</div>
                            <div className="id-num">
                                <InputItem data-seed="logId">身份证号：</InputItem>
                            </div>
                            <div className="v-imgs">
                                <div className="imgs-tit">上传收件人身份证照片（选填）：</div>
                                <ul>
                                    <li>
                                       <div className="imgs-zm">
                                       </div>
                                        <div className="text">身份证正面</div>
                                        <img src={id2} alt=""/>
                                    </li>
                                    <li>
                                        <div className="imgs-zm">
                                        </div>
                                        <div className="text">身份证反面</div>
                                        <img src={id1} alt=""/>
                                    </li>
                                </ul>
                                <div className="tips">
                                    <p>1.请上传单一背景，清晰有效正反面照片。</p>
                                    <p>2.请保证照片的四个角完整显示。</p>
                                </div>
                            </div>
                        </div>
                        <div className="question">
                            <div className="q-tit">为什么要实名认证？</div>
                            <div className="q-con">
                                根据海关规定，购买跨境商品需要办理清关手续，请您配合实名认证，以确保您购买的商品顺利通过海关检查。优集品承诺所传身份信息只用于办理跨境商品清关手续，不作其它用途使用，其它人员无法查看。
                            </div>
                        </div>
                        <div className="make-sure">
                            <p onClick={()=>this.makeSure()}>确认</p>
                        </div>
                    </div>
                    <div className="l-regions">
                        <div className="l-province">
                            <ul></ul>
                        </div>
                        <div className="l-city">
                            <ul></ul>
                        </div>
                        <div className="l-county">
                            <ul></ul>
                        </div>
                    </div>

                </Content>
            </div>
        )
    }
    changeStata(){
        document.querySelector('.add-adress').style.visibility="visible";
        document.querySelector('.am-list-item .am-list-line .am-list-arrow-horizontal').style.visibility="visible";
    };
    makeSure(){
        document.querySelector('.add-adress').style.visibility="hidden";
        document.querySelector('.am-list-item .am-list-line .am-list-arrow-horizontal').style.visibility="hidden";
    };

}

export default Adress;