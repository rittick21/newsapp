import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'business'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  } //constructor calling

  async componentDidMount() {
    // console.log("Cdm");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98bbff13fb8649819b99ad5800585be1&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
  } //async function and componentDidMount is a cyclic method which is called after the call of the render() function
 
  //page is actual the property of the news api which counts the no. of pages and pageSize= no. of news/ pages
  handelPrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98bbff13fb8649819b99ad5800585be1&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading: false
    });
  };
 //for changing the previous page
  handelNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 20))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=98bbff13fb8649819b99ad5800585be1&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading: false
      });
    }
  };
 //for changing the next page
  render() {
    // console.log("render")
    return (
      <div className="container my-3">
        <h2 className={`text-center text-${this.props.mode=== 'light' ? 'dark': 'light'}`}>News-<strong style={{color: '#0d6efd'}}>B</strong>ox: Top headlines</h2>
        <div className="row">
        {this.state.loading && <Spinner/>}
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            onClick={this.handelPrevClick}
          >
            &laquo;Previous
          </button>
          <button
            type="button"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            className="btn btn-primary"
            onClick={this.handelNextClick}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}
//looping using map method in javascript

export default News;
