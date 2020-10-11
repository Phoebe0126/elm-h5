import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { saveAttrInfo } from '../../store/action'
import Header from '@/components/header/header'
import Address from './address/address'
import DeliveryModel from './delivery_model/delivery_model'
import API from '../../api/api'
import {getStore} from '@/utils/commons'

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
        deliveryInfo: {}
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


    render () {
        return (
            <div>
                <Header title='确认订单' signUp={true} goHome={this.goHome.bind(this)} goBack={this.goBack.bind(this)}/>
                {this.props.addressList.length > 0 &&<Address address={this.props.addressList[0]}/>}
                <DeliveryModel deliveryReachTime={this.state.deliveryInfo.delivery_reach_time}/>
            </div>
        )
    }
}

// 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系
const mapStateToProps = (state) => {
    return {
      geohash: state.geohash,
      addressList: state.addressList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, value) => dispatch(saveAttrInfo(attr, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);