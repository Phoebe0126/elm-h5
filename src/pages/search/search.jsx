import React, {Component} from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import './search.scss'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import API from "../../api/api"
import { saveAttrInfo } from '../../store/action'
import ShopList from '@/components/shop_list/shop_list'
import {getStore, setStore} from '../../utils/commons'


class Search extends Component {

    static proptype = {
        saveAttrInfo: PropTypes.func.isRequired
    }

    state = {
        geohash: [],
        keyword: '',
        isSubmit: false,
        shopListArr: [],
        historyList: [],
        isSearching: false
    }

    goBack () {
        this.props.history.goBack()
    }

    cityGuess = async () => {
        let res = await API.cityGuess();
        this.setState({
          geohash: [res.latitude, res.longitude]
        });
        this.props.saveAttrInfo('geohash', [res.latitude, res.longitude])
    }

    componentDidMount () {
        if (this.state.geohash.length === 0) {
            this.cityGuess()
            const historyList = JSON.parse(getStore('historyList'))
            this.setState({
                historyList
            })
        }
    }

    handleKeywordChange (e) {
        const keyword = e.target.value
        this.setState({
            keyword,
            isSubmit: keyword.length > 0 ? this.state.isSubmit : false 
        })
    }
1
    confirm () {
        if (this.state.keyword.length <= 0) {
            return
        }
        this.getShopList()
        const keyword = this.state.keyword
        let historyList = this.state.historyList
        historyList = historyList.includes(keyword) ? historyList : [...historyList, keyword]
        this.setState({
            isSubmit: true,
            historyList
        })
    }

    handleKeyDown (e) {
        if (e && e.keyCode === 13) {
            this.confirm()
        }
    }

    async getShopList () {
        let obj = {
          geohash: this.state.geohash.join(','),
          keyword: this.state.keyword,
        };
        this.setState({
            isSearching: true
        })
        const shopListArr = await API.search(obj);
        this.setState({shopListArr, isSearching: false})
    }
    
    searchFromHistory (keyword) {
        this.setState({
            keyword
        }, () => {
            this.confirm()
        })
        
    }
     
    componentWillUnmount () {
        setStore('historyList', this.state.historyList)
    }

    render () {
        const historyList = this.state.historyList

        return (
            <div className='search-container'>
                <Header title='搜索' goBack={this.goBack.bind(this)}/>
                    <div className="search-input">
                        <input 
                            type="text" 
                            placeholder='请输入商家或美食名称' 
                            value={this.state.keyword} 
                            onChange={this.handleKeywordChange.bind(this)}
                            onKeyDown={this.handleKeyDown.bind(this)}
                        />
                        <button onClick={this.confirm.bind(this)}>提交</button>
                    </div>
                    {!this.state.keyword && historyList.length > 0 && <div className="search-history">
                        <div className="title">搜索历史</div>
                        <div className="history-list">
                            {historyList.map((item, index) => {
                                return (
                                    <div className="item" key={index} onClick={this.searchFromHistory.bind(this, item)}>
                                        <span className='text'>{item}</span>
                                        <span className='close'>×</span>
                                    </div>
                                )
                            })}
                            <div className="clear-button" onClick={() => {this.setState({historyList: []})}}>
                                清空搜索历史
                            </div>
                        </div>
                    </div>}
                    {this.state.keyword.length > 0 && !this.state.isSearching && <ShopList shopListArr={this.state.shopListArr} isSubmit={this.state.isSubmit}/>}    
                <Footer/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      saveAttrInfo: (attr, geohash) => dispatch(saveAttrInfo(attr, geohash))
    }
}

export default connect(() => ({}), mapDispatchToProps)(Search);