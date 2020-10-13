import React, {Component} from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import './technology.scss'

class Food extends Component {
  goBack = () =>{
    this.props.history.push('/')
  }
  render () {
    return (
      <div className='tech-container'>
        <Header title='订单' goBack={this.goBack}/>
        <div className="tech-list">
          <ul>
          </ul>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Food