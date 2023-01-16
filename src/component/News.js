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

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title = `News-Box-${this.capitalize(this.props.category)}`
  } //constructor calling

  async updatePage(){
    this.props.setProgress(10);
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatePage();
  } //async function and componentDidMount is a cyclic method which is called after the call of the render() function
 
  //page is actual the property of the news api which counts the no. of pages and pageSize= no. of news/ pages
  handelPrevClick = async () => {
    this.setState({page: this.state.page-1});
    this.updatePage();
  };
 //for changing the previous page
  handelNextClick = async () => {
    this.setState({page: this.state.page+1});
    this.updatePage();
  };
 //for changing the next page

capitalize=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// To capitalize a string

  render() {
    return (
      <div className="container my-3">
        <h2 className={`text-center text-${this.props.mode=== 'light' ? 'dark': 'light'}`} style={{marginTop: '90px'}}><img src="./favicon-32x32.png" alt="..." /> News-<strong style={{color: '#0d6efd'}}>B</strong>ox: Top {this.capitalize(this.props.category)} headlines</h2>
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
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
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
