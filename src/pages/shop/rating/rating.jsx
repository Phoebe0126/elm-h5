import React, { Component } from "react";
import './rating.scss'
import API from  '../../../api/api'
import TagList from '@/components/tag_list/tag_list'
import RatingList from '@/components/rating_list/rating_list'


class Rating extends Component {

    state = {
        ratingScores: {},
        tagList: [],
        activeTagName: '全部',
        ratingList: [],
        id: ''
    }

    initData = async id => {
        const ratingScores = await API.getRatingScores(id)
        const tagList = await API.getRatingTags(id)
        const ratingList = await API.getRatingInfo(id, {
            tag_name: this.state.activeTagName
        })

        this.setState({
            id,
            ratingScores,
            tagList,
            ratingList
        })

    }

    async changeActiveTag (index) {
        const activeTagName = this.state.tagList[index].name
        const id = this.state.id
        
        const ratingList = await API.getRatingInfo(id, {
            tag_name: activeTagName
        })
        this.setState({
            activeTagName,
            ratingList
        })
    }

    componentDidMount () {
        const id = this.props.id;
        this.initData(id);
    }

    // 评价星星
    starCount = (rating) => {
        var items = [];
        for (var i = 0; i < Math.ceil(rating); i++) {
        items.push(<div className="icon-wuxing" key={i} />);
        }
        return items;
    }

    render () {
        const ratingScores = this.state.ratingScores
        return (
            <div className='rating'>
                {Object.keys(ratingScores).length > 0&&
                    <div className='rating-header'>
                        <div className='rating-header-left'>
                            <div className='rating-bold'>{Math.round(ratingScores.overall_score * 10)/10}</div>
                            <div>综合评价</div>
                            <div>高于周边商家{(ratingScores.compare_rating * 100).toFixed(1)}%</div>
                        </div>
                        <div className='rating-header-right'>
                            <div>
                                服务态度 
                                <div className='stars'> { this.starCount(Math.round(ratingScores.service_score)) }</div>
                                <span>{Math.round(ratingScores.service_score * 10) / 10}</span>
                            </div>
                            <div>
                                菜品评价
                                <div className='stars'> { this.starCount(Math.round(ratingScores.food_score)) }</div>
                                <span>{Math.round(ratingScores.food_score * 10) / 10}</span>
                            </div>
                            <div>送达时间<span className='minute'>{ratingScores.deliver_time}分钟</span></div>
                        </div>
                    </div>
                }
                <TagList tagList={this.state.tagList} activeTagName={this.state.activeTagName} changeActiveTag={this.changeActiveTag.bind(this)}/>
                <RatingList ratingList={this.state.ratingList}/>
            </div>
        )
    }
}

export default Rating;

