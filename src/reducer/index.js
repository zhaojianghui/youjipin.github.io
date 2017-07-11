
const listReducer = (state={listData:[],ltData:[]},action)=>{
    switch(action.type){
        case "getProductListData" :
            var newState = Object.assign({},state,action.payload)
            return newState;
            break;
        case "getProductListDataMore" :
            var newState = Object.assign({},state,{listData:state.listData.concat(action.payload.listData)})
            return newState;
        default :
        return state
    }
}
const cartReducer = function (state={cartData:[],listData:[],},action) {
    //console.log(action.data.listData)
    switch (action.type){
        case "getCartData":
            var newState = Object.assign({},state,{cartData:action.data.cartData,
                listData:action.data.listData});
            return newState;
            break;
        case "changeCartData":
            var newState = Object.assign({},state,{listData:action.data.listData});
            return newState;


        /*//单选被点击
         case "changeItemSelect1" :
         console.log(action.payload.index);

         var  index = action.payload.index; //保存下标
         var newState = JSON.parse(JSON.stringify(state));//深拷贝
         //让自己的状态取反
         var newSelected = !newState.CartData[index].selected
         newState.CartData[index].selected=newSelected
         if(!newSelected){
         //如果自己为false，那么全选也为false
         newState.allSelected=false
         }else{
         //如果自己为true，假设全选也为true
         newState.allSelected=true
         newState.CartData.forEach(e=>{
         //循环所有的选项，如果有一个没有被选中，全选就为false
         if(!e.selected){
         newState.allSelected=false
         }
         })
         }
         return newState
         //全选被点击
         case "changeAllSelect1" :
         var newState = JSON.parse(JSON.stringify(state));//深拷贝
         newState.allSelected=!newState.allSelected;//全选取反
         //让所有的选中和全选同步
         newState.CartData.forEach(e=>{
         e.selected = newState.allSelected
         })
         return newState*/
        default:
            return state;
    }
};

const orderReducer = function (state={orderData:[],subOrderData:[]},action) {
    switch (action.type){
        case "getOrderData":
            var newState = Object.assign({},state,{orderData:action.data.orderData,
                subOrderData:action.data.subOrderData});
            return newState;
            break;
        default:
            return state;
    }
};


export {listReducer,cartReducer,orderReducer}