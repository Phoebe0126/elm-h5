import React, {Component} from 'react'
import './address.scss'

class Address extends Component {

    render () {
        const address = this.props.address
        
        return (
            <div className='address-container'>
                <div className="address-img"></div>
                <div className="user">
                    <div className="user-info">
                        <span className='name'>{address.name}</span>
                        <span className='gender'>{address.sex === 1 ? '先生' : '女士'}</span>
                        <span className='mobile'>{address.phone}</span>
                    </div>
                    <div className="user-address">
                        <span className="tag">{address.tag}</span>
                        <span className="detail">{address.address_detail}</span>
                    </div>
                </div>
                <div className="icon-arrow-right">
                </div>
            </div>
        )
    }
}

export default Address;