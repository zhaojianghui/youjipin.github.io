
import  React,{Component} from "react";
import  LeiImg from "../../image/fenlei.png";
import  UserImg from "../../image/user.png";
import  CartImg from "../../image/gwd.png";
import  "./public.css";
import {Link} from "react-router" ;
class Header extends Component {
    state={
        FlieData:[],
        status:false,
        route:''
    }
    render() {

        const {FlieData}=this.state;

        return <div className="z-header">
                  <Link to="/" className="z-header-a">
                  <p className="z-left-logn">
                      {this.props.title}
                  </p>
                  </Link>
                  <div className="z-header-item">
                      <p className="z-rightOne" onClick={()=>this.changeStatus()}>
                          <img src={LeiImg}/>
                      </p>
                      <p className="z-rightTwo">
                          <Link to={`/${this.state.route}`}>
                          <img src={UserImg}/>
                          </Link>
                      </p>
                      <p className="z-rightThree">
                          <Link to="/cart">
                          <img src={CartImg}/>
                          </Link>
                      </p>
                  </div>
            <div className="z-filter">
                <div className="z-filter-box">
                    <div className="z-filter-header">
                        <div>
                            <p></p>
                            <input type="text" placeholder="请输入搜索内容"/>
                        </div>
                        <span onClick={()=>this.changeHidden() }>取消</span>
                    </div>{
                    FlieData&&FlieData.map((ele,index)=>{
                        return <div className="z-filter-body "  key={index} data-index={index}>
                            <div className="z-filter-body-zhu" onClick={()=>this.changeLie(index)}>
                                <span>{ele.name}</span>
                                <span className="z-jiantou"></span>
                            </div>

                            <div className="z-filter-body-lie " >
                                {
                                    FlieData[index]&&FlieData[index]["sub_cate_list"].map((ele,num)=>{
                                        return  <Link to={`/list/${ele.name}`} >
                                                    <p key={num} onClick={this.changeHidden}>{ele.name}</p>
                                                </Link>
                                    })
                                }
                            </div>

                        </div>
                    })
                }
                </div>
            </div>
               </div>

    }
    changeLie(index){
        const zfilterbodylies=document.querySelectorAll(".z-filter-body-lie");
        const zjiantous=document.querySelectorAll(".z-jiantou");
        //console.log(index)
        if(!this.state.status){
            zfilterbodylies[index].style.display="block";
            zjiantous[index].style.transform="rotate(270deg)"
            this.setState({
                status:true
            })
        }else{
            zfilterbodylies[index].style.display="none";
            zjiantous[index].style.transform="rotate(90deg)"
            this.setState({
                status:false
            })
        }
    }
    changeHidden(){
        const filter=document.querySelector('.z-filter');
        filter.style.display="none";
    }
    changeStatus(){
        const filter=document.querySelector('.z-filter');
        if(!this.state.status){
            filter.style.display="block";
            this.setState({
                status:true
            })
        }else{
            filter.style.display="none";
            this.setState({
                status:false
            })
        }

    };
    componentDidMount(){
        fetch("/api/v4/tags/discovery")
            .then(res => {
                return res.json()
            })
            .then(data => {
                //console.log(data)
                this.setState({
                    FlieData:data.data
                })
            })
        const userPhone=localStorage.getItem("userPhone")|| []
        //console.log(userPhone.length)
        if(userPhone.length){
            this.setState({
                route:"mine"
            })
        }else{
            this.setState({
                route:"login"
            })
        }
    }




}
export default Header




