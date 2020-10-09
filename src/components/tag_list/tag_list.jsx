import React, { Component } from "react";
import "./tag_list.scss";

class TagList extends Component {

    changeActiveTag (index) {
        this.props.changeActiveTag(index)
    }

    render () {
        const tagList = this.props.tagList
        const activeTagName = this.props.activeTagName

        return (
            <div className='tag-list-container'>
                {tagList.map((tag, index) => {
                    return (
                    <div 
                        className={['tag', activeTagName !== tag.name ? (tag.unsatisfied ? 'tag-unsatisfied' : '') : 'tag-active'].join(' ')} 
                        key={index}
                        onClick={this.changeActiveTag.bind(this, index)}
                        >{tag.name}({tag.count})</div>
                    )
                })}
            </div>
        )
    }
}

export default TagList;