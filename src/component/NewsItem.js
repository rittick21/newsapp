import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl} = this.props; //object destructuing
    return (
      <div className="my-3">
        <div className="card" style={{backgroundColor: '#dee2e6'}}>
          <img src={imageUrl ? imageUrl: "https://wallpapercave.com/wp/wp7342177.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
             {description}...
            </p>
            <a href={newsUrl} target="-blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
