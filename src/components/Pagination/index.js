import {Component} from 'react'
import './index.css'

class Pagination extends Component {
  state = {
    pageNo: 1,
  }

  onNextPage = () => {
    const {apiCallBack, totalPage} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo < totalPage) {
          return {pageNo: prevState.pageNo + 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  onPrevPage = () => {
    const {apiCallBack} = this.props
    this.setState(
      prevState => {
        if (prevState.pageNo !== 1) {
          return {pageNo: prevState.pageNo - 1}
        }
        return prevState
      },
      () => {
        const {pageNo} = this.state
        apiCallBack(pageNo)
      },
    )
  }

  render() {
    const {pageNo} = this.state
    return (
      <div className="page-count-section">
        <button className="page-btn" onClick={this.onPrevPage}>
          Previous
        </button>
        <p className="pageNo">{pageNo}</p>
        <button className="page-btn" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
