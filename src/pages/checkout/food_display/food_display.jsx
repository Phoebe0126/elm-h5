import React, {Component} from 'react'
import './food_display.scss'


class FoodDisplay extends Component {

  
    render () {
        const cart = this.props.deliveryInfo.cart
        const itemList = cart.groups[0]
        const extraList = []
        extraList[0] = {name: '餐盒', account: cart.extra[0].price, index: 'e1'}
        extraList[1] = {name: '配送费', account: cart.deliver_amount, index: 'e2'}

        return (
            <div className='food-list-container'>
                <div className="shop">
                    <img src={'/img/' + cart.restaurant_info.image_path} alt=""/>
                    <div className="shop-name">{cart.restaurant_info.name}</div>
                </div>
                <div className="items">
                    {itemList.map((item) => {
                        return (
                            <div className="item" key={item.id}>
                                <span className='name'>{item.name}</span>
                                <div className="qty">×&nbsp;{item.quantity}</div>
                                <div className="price">￥{item.price}</div>
                            </div>
                        )
                    })}
                   {extraList.map((item) => {
                        return (
                            <div className="item" key={item.index}>
                                <span className='name'>{item.name}</span>
                                <div className="price">￥{item.account}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="order">
                    <div className="account">
                        订单￥<span className='total-price'>{cart.original_total}</span>
                    </div>
                    <div className="to-checkout">
                        <div>待支付</div>
                        <div>￥{cart.original_total}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FoodDisplay;