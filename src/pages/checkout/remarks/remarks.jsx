import React, {Component} from 'react'
import './remarks.scss'
import {Link} from 'react-router-dom'


class Remarks extends Component {

    render () {
        const { remark } = this.props
        return (
            <div className="remarks-container" >
                    <Link to={'/checkout/remark/' + this.props.cartId}>
                        <div className="order">
                            <span className='name'>订单备注</span>
                            <span className='value'>{ remark || '' }</span>
                            <span>&nbsp;&gt;</span>
                        </div>
                    </Link>
                <div className="invoice">
                <span className='name'>发票抬头</span>
                    <span className='value'>不需要开发票</span>
                    <span>&nbsp;&gt;</span>
                </div>
            </div>
        )
    }
}

export default Remarks;