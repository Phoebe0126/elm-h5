import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {modifyUserInfo} from '@/store/action'
import './password.scss'
import API from '../../../api/api'
import Animate from 'rc-animate'
import AlertTip from '@/components/alert_tip/alert_tip'

class Password extends Component {

    static propTypes = {
        userInfo: PropTypes.object.isRequired
    }

    state = {
        showPwd: false,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        captchaCodeImg: '',
        codeNumber: '',
        hasAlert: false,
        alertText: ''
    }

    goBack = () => {
        this.props.history.goBack()
    }
    componentDidMount () {
        this.getCaptchaCode()
    }
    handleInput (type, event) {
        let newValue = event.target.value
       
        this.setState({
            [type]: newValue
        })

    }
    changePasswordType () {
        this.setState({
            showPwd: !this.state.showPwd
        })
    }

    closeTip () {
        this.setState({
          hasAlert: false
        })
      }

    async getCaptchaCode () {
        const res = await API.getCaptchaCode()
        this.setState({
            captchaCodeImg: res.code
        })
    }

    async confirmChange () {
        let isValidate = true, alertText

        if (!this.state.oldPassword.length) {
            alertText = '请输入旧密码'
            isValidate = false
        } else if (!this.state.newPassword.length){
            alertText = '请输入新密码'
            isValidate = false
        } else if (this.state.codeNumber.length < 4) {
            alertText = '验证码错误'
            isValidate = false
        } else if (!this.state.confirmPassword.length) {
            alertText = '请确认新密码'
            isValidate = false
        }

        if (!isValidate) {
            this.setState({
                hasAlert: true,
                alertText
            })
            return
        }

        const sendData = {
            username: this.props.userInfo.username,
            oldpassWord: this.state.oldPassword,
            newpassword: this.state.newPassword,
            confirmpassword: this.state.confirmPassword,
            captcha_code: this.state.codeNumber
        }
        const res = await API.changePassword(sendData)
        if (res.tip) {
            // 重新获取验证码
            this.getCaptchaCode()
            
            this.setState({
              hasAlert: true,
              alertText: res.response.message
            })
        } else {
            this.setState({
                hasAlert: true,
                alertText: res.success
            })
        }
    }
    render () {
        return (
            <Animate transitionName='fade'>
                <div className="password-change-container">
                    <form className="password-form">
                        <section className="input-container">
                            <label>用户名：</label>
                            <div className="input">{this.props.userInfo.username}</div>
                        </section>
                        <section className='input-container'>
                            <label>请输入旧密码：</label>
                            <input type={this.state.showPwd? 'text' : 'password'} value={this.state.oldPassword} onChange={this.handleInput.bind(this, 'oldPassword')}/>
                            <div className={`button-switch ${this.state.showPwd?'change-to-text':''}`}>
                                <div className={`circle-button ${this.state.showPwd?'trans_to_right':''}`} onClick={this.changePasswordType.bind(this)}></div>
                            </div>
                        </section>
                        <section className='input-container'>
                            <label>请输入新密码：</label>
                            <input type="password" value={this.state.newPassword} onChange={this.handleInput.bind(this, 'newPassword')}/>
                        </section>
                        <section className='input-container'>
                            <label>请确认新密码：</label>
                            <input type="password" value={this.state.confirmPassword} onChange={this.handleInput.bind(this, 'confirmPassword')}/>
                        </section>
                        <section className='input-container captcha-code-container'>
                            <label>验证码：</label>
                            <input type="text" maxLength='4' value={this.state.codeNumber} onChange={this.handleInput.bind(this, 'codeNumber')} />
                            <div className='img-change-img' onClick={this.getCaptchaCode.bind(this)}>
                                <img src={this.state.captchaCodeImg} alt="img is wrong"/>
                            </div>
                        </section>
                    </form>
                    <div className='login-button' onClick={this.confirmChange.bind(this)}>确认修改</div>
                    {this.state.hasAlert&&<AlertTip logout={()=> {return false}} closeTip={this.closeTip.bind(this)} alertText={this.state.alertText}/>}
                </div>
            </Animate>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       modifyUserInfo: (key, value) => dispatch(modifyUserInfo(key, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password)