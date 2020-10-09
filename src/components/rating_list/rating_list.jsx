import React, { Component } from "react";
import "./rating_list.scss";
import {getImgPath} from '../../utils/commons'
import { cdnUrl } from '../../config/envconfig'

class RatingList extends Component {

    // 评价星星
    starCount = (rating) => {
        var items = [];
        for (var i = 0; i < Math.ceil(rating); i++) {
        items.push(<div className="icon-wuxing" key={i} />);
        }
        return items;
    }

    getImgUrl (img) {
        if (!img) {
            return getImgPath()
        }

        return `${cdnUrl}/${img[0]}/${img.slice(1, 3)}/${img.slice(3)}.jpeg`
    }

    getFoodImg (ratingArr, type) {
        console.log(ratingArr)
        if (type === 1) {
            return ratingArr.map((food, index) => {
                return (<img key={index} src={this.getImgUrl(food.image_hash)} alt=""/>)
            })
        } else {
            return ratingArr.map((food, index) => {
               return  (<div className="food-name" key={index}>{food.food_name}</div>)
            })
        }
       
    }

    render () {
        const ratingList = this.props.ratingList

        return (
            <div className='rating-list'>
                {
                    ratingList.map(item => {
                        return (
                            <div key={item._id} className='rating-item'>
                                <div className='avatar'>
                                    <img src={this.getImgUrl(item.avatar)} alt=''></img>
                                </div>
                                <div className='rating-info'>
                                    <div className="top">
                                        <div className="nickname">额******d</div>
                                        <div className="created-time">2017-02-10</div>
                                    </div>
                                    <div className="detail">
                                        <div className="stars">
                                            {this.starCount(5)}
                                        </div>
                                        <div className="comment">按时送达</div>
                                        <div className="food-imgs">
                                            {item.item_ratings.map((food, index) => {
                                                return !!food.image_hash && <img key={index} src={this.getImgUrl(food.image_hash)} alt=""/>
                                            })}
                                        </div>
                                        <div className="food-names">
                                            {item.item_ratings.map((food, index) => {
                                                return  <div className="food-name" key={index}>{food.food_name}</div>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RatingList;