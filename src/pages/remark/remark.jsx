import React, {Component} from 'react'
import './remark.scss'
import Header from '@/components/header/header'
import API from '../../api/api'
import { saveAttrInfo } from '../../store/action'
import { connect } from "react-redux"
import PropTypes from "prop-types"

class Remark extends Component {

    static protypes = {
        remarksText: PropTypes.string.isRequired,
        saveAttrInfo: PropTypes.func.isRequired
    }

    state = {
        activeObj: {},
        cartId: '',
        remarks: [],
        otherRemark: ''
    }

    componentDidMount () {
        const cartId = this.props.match.params.id
        this.setState({
            cartId: this.props.match.params.id
        })
        this.getRemarks(cartId)
    }


    async getRemarks (cartId) {
        const { remarks } = await API.getRemarks(cartId)
        this.setState({
            remarks
        })
    }

    goBack () {
        this.props.history.goBack()
    }

    handleRemarkChange (e) {
        this.setState({
            otherRemark: e.target.value
        })
    }

    modifyRemark (index, type) {
        const activeObj = this.state.activeObj
        activeObj[index] = type === activeObj[index] ? '' : type
        this.setState({activeObj})
    }

    confirmRemark () {
        let remark = ''
        const { activeObj, remarks, otherRemark }  = this.state

        Object.keys(activeObj).forEach(key => {
            const text = remarks[key][activeObj[key]]
            if (text) {
                remark += text + '，'
            } 
        })
        if (otherRemark) {
            remark += otherRemark
        } else {
            remark = remark.slice(0, remark.length - 1)
        }
        this.props.saveAttrInfo('remark', remark)
        this.goBack()
    }

    render () {
        const { remarks, activeObj } = this.state

        return (
            <div className='remark-wrapper'>
               <Header title='订单备注' goBack={this.goBack.bind(this)}/>
               <div className="remark-quick">
                   <div className="name">快速备注</div>
                   <div className="remark-tags">
                       {remarks.map((tags, index) => {
                           return tags.map((tag, num) => {
                            return (
                                <div 
                                    className={['tag', activeObj[index] === num ? 'active' : ''].join(' ')} 
                                    key={index + '' + num}
                                    onClick={this.modifyRemark.bind(this, index, num)}
                                >{tag}</div>
                            )
                           })
                       })}
                   </div>
               </div>
               <div className="remark-others">
                   <div className="name">其他备注</div>
                   <div className="text">
                       <textarea 
                       placeholder='请输入备注内容(可不填)' 
                       value={this.state.otherRemark}
                       onChange={this.handleRemarkChange.bind(this)}
                       ></textarea>
                   </div>
               </div>
               <button onClick={this.confirmRemark.bind(this)}>确定</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        remarksText: state.remark
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (key, value) => dispatch(saveAttrInfo(key, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Remark);