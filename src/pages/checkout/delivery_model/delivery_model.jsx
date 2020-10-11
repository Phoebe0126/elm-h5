import React, {Component} from 'react'
import './delivery_model.scss'

class DeliveryModel extends Component {
    

    render () {
        const deliveryReachTime = this.props.deliveryReachTime
        return (
            <div className="delivery-container">
                <div className='delivery-text'>送达时间</div>
                <div className="delivery-info">
                    <div className="delivery-desc">
                        <span>尽快送达</span>
                        <span>|</span>
                        <span>预计{deliveryReachTime}</span>
                    </div>
                    <div className="delivery-type">
                       <span> 蜂鸟专送</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeliveryModel;