import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props; //object destructuing
    return (
      <div className="my-3">
        <div className="card" style={{ backgroundColor: "#dee2e6" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '85%', zIndex: '1', fontSize: '10px'}}>{source}<span className="visually-hidden">unread messages</span></span>
          <img
            src={
              imageUrl ? imageUrl : "https://wallpapercave.com/wp/wp7342177.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="-blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
