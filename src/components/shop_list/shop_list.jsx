import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./shop_list.scss";
import { imgUrl } from "../../config/envconfig";

class ShopList extends Component {

  // 评价星星
  starCount = (rating) => {
    var items = [];
    for (var i = 0; i < Math.ceil(rating); i++) {
      items.push(<div className="icon-wuxing" key={i} />);
    }
    return items;
  };
  
  render() {

    return (
      <div className="shoplist-container">
        {this.props.isSubmit && 
          <ul>
            {this.props.shopListArr.length > 0 && this.props.shopListArr.map((item, index) => {
              return (
                <Link
                  to={`/shop/${item.id}`}
                  className="shop-item"
                  key={"l" + index}
                >
                  <img src={imgUrl + item.image_path} alt="" />
                  <div className="shop-content">
                    <div className="shop-content-title">
                      <div className="title-left">
                        <span>品牌</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="title-right">保准票</div>
                    </div>
                    <div className="shop-content-title">
                      <div className="title-left">
                        <div className="star-num">
                          {this.starCount(item.rating)}
                        </div>
                        <div className="star-rating">{item.rating}</div>
                        <div className="order-num">
                          月售
                          {item.recent_order_num}单
                        </div>
                      </div>
                      <div className="title-right order-badge">
                        <span>蜂鸟专送</span>
                        <span>准时达</span>
                      </div>
                    </div>
                    <div className="shop-content-title">
                      <div className="fee-left">
                        <span className="fee-text">
                          ¥{item.float_minimum_order_amount}
                          起送
                        </span>
                        <span className="segmentation">/</span>
                        <span className="fee-text">
                          {item.piecewise_agent_fee.tips}
                        </span>
                      </div>
                      <div className="fee-right">
                        <span>{item.distance}</span>
                        <span>/</span>
                        <span>{item.order_lead_time}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            {!this.props.shopListArr.length &&
              <div className='blank-result'>
                很抱歉，暂时无搜索结果!
              </div>
            }
         </ul>
        }
      
      </div>
    );
  }
}

export default ShopList;
