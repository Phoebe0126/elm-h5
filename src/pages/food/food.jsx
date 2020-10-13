import React, {Component} from 'react'
import ShopList from '@/components/shop_list/shop_list'
import Header from '@/components/header/header'
import './food.scss'
import API from '../../api/api'
import {saveAttrInfo} from '@/store/action'
import PropTypes from 'prop-types'
import { connect } from "react-redux"

class Food extends Component {
  static propTypes = {
    saveAttrInfo: PropTypes.func.isRequired,
  };
  state = {
    shopListArr: []
  }
  goBack = () =>{
    this.props.history.push('/msite')
  }
  componentDidMount () {
    this.getShopList()
  }
  async getShopList () {
    const geohash = this.props.match.params.geohash.split(',')

    let obj = {
      latitude: geohash[0],
      longitude: geohash[1],
    };
    const shopListArr = await API.getShopList(obj);
    this.setState({shopListArr})
  }
  render () {
    return (
      <div className='foodlist-container'>
        <Header title={this.props.match.params.title} goBack={this.goBack}/>
        {this.state.shopListArr.length > 0 &&<ShopList shopListArr={this.state.shopListArr} isSubmit={true}/>}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
  }
}
export default connect(()=>({}), mapDispatchToProps)(Food)