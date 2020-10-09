import React, { Component } from "react";
import "./menu_list.scss";
import {getImgPath} from '@/utils/commons'

class MenuList extends Component {
    handleClick (index) {
        this.props.activeMenu(index)
    }
    
    render () {
        const menuList = this.props.menuList
        const activeIndex = this.props.activeIndex

        return (
            <ul className='menu-list-wrapper'>
                {
                    menuList.map((item, index) => {
                        return (
                            <li 
                                className={activeIndex === index ? 'activity-menu menu-li': 'menu-li'} 
                                key={index}
                                onClick={this.handleClick.bind(this, index)}
                            >
                                <img src={item.icon_url ? getImgPath(item.icon_url) : ''} alt=""/>
                                <span>{item.name}</span>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default MenuList;

