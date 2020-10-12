import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { saveAttrInfo } from '../../store/action'
import Header from '@/components/header/header'
import Address from './address/address'
import DeliveryModel from './delivery_model/delivery_model'
import API from '../../api/api'
import {getStore} from '@/utils/commons'
import './checkout.scss'
import FoodDisplay from './food_display/food_display'
import Remarks from './remarks/remarks'
import AlertTip from '@/components/alert_tip/alert_tip'

class Checkout extends Component {

    static propTypes = {
        geohash: PropTypes.array.isRequired,
        addressList: PropTypes.array.isRequired,
        saveAttrInfo: PropTypes.func.isRequired
    }

    state = {
        shopID: '',
        cartList: [],
        geohash: '',
        deliveryInfo: {},
        hasAlert: false,
        alertText: '暂不开放支付功能'

    }

    goHome () {
        this.props.history.push('/')
    }

    goBack () {
        this.props.history.goBack()
    }

    componentDidMount () {
        const shopId = this.props.match.params.id
        const geohash = this.props.match.params.geohash
        const cartObj = getStore('cart')
        const cartList = JSON.parse(cartObj)[shopId]

        this.getAddress()
        this.setState({
            shopId,
            geohash,
            cartList
        })

        this.checkout(shopId, geohash, cartList)
    }
    
    async checkout (shopId, geohash, cartList) {
        const res = await API.checkout({
            restaurant_id: shopId,
            geohash,
            entities: [cartList]
        })
        this.setState({
            deliveryInfo: res
        })
    }

    async getAddress () {
        const res = await API.getAddress(getStore('user_id'))
        this.props.saveAttrInfo('addressList', res)
    }

    handleClick (type) {

        if(type) {
            this.setState({
                hasAlert: true
            })
            return
        }

        this.setState({
            hasAlert: !this.state.hasAlert
        })
    }


    render () {
        const deliveryInfo = this.state.deliveryInfo
        const isReady = Object.keys(this.state.deliveryInfo).length > 0
        return (
            <div className='checkout-container'>
                <Header title='确认订单' signUp={true} goHome={this.goHome.bind(this)} goBack={this.goBack.bind(this)}/>
                {this.props.addressList.length > 0 &&<Address address={this.props.addressList[0]}/>}
                {isReady && <DeliveryModel deliveryReachTime={deliveryInfo.delivery_reach_time}/>}
                <div className="payway">
                    <div>
                        <span className="pay-type">支付方式</span>
                        <span className="online-pay">在线支付&nbsp;&gt;</span>
                    </div>
                    <div className="red-envelop">
                        <span>红包</span>
                        <span>暂时只在饿了么APP中支持</span>
                    </div>
                </div>
                {isReady && <FoodDisplay deliveryInfo={deliveryInfo}/>}
                <Remarks cartId={deliveryInfo.id} remark={this.props.remark}/>
                <div className="fixed-block">
                    <div className="amount">
                        待支付<span>￥1459</span>
                    </div>
                    <div className="confirm" onClick={this.handleClick.bind(this, true)}>确认下单</div>
                </div>
                {this.state.hasAlert&&<AlertTip logout={()=> {return false}}  closeTip={this.handleClick.bind(this)} alertText={this.state.alertText}/>}
            </div>
        )
    }
}

// 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
const mapStateToProps = (state) => {
    return {
      geohash: state.geohash,
      addressList: state.addressList,
      remark: state.remark
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, value) => dispatch(saveAttrInfo(attr, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);