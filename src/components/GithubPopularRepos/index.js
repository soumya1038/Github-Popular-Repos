import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    initialRepositoryList: [],
    filterLanguage: 'ALL',
    response: false,
  }

  componentDidMount() {
    this.getRepositoryItemList()
  }

  getRepositoryItemList = async () => {
    const {filterLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${filterLanguage}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedDate = fetchData.popular_repos.map(eachData => ({
        avatarUrl: eachData.avatar_url,
        forksCount: eachData.forks_count,
        issuesCount: eachData.issues_count,
        name: eachData.name,
        starsCount: eachData.stars_count,
        id: eachData.id,
      }))
      this.setState({
        initialRepositoryList: updatedDate,
        isLoading: false,
        response: false,
      })
    } else {
      this.setState({isLoading: false, response: true})
    }
    // console.log(response.ok)
  }

  onFilterButtonClick = id => {
    this.setState(
      {filterLanguage: id, isLoading: true},
      this.getRepositoryItemList,
    )
  }

  renderRepositoryItem = () => {
    const {isLoading, initialRepositoryList} = this.state

    return (
      <ul className="display-repository-container">
        {!isLoading &&
          initialRepositoryList.map(each => (
            <RepositoryItem eachItem={each} key={each.id} />
          ))}
      </ul>
    )
  }

  renderFaliRequest = () => {
    const {response} = this.state

    return (
      <>
        {response && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="faliur view"
            />
            <h1>Something Went Wrong</h1>
          </div>
        )}
      </>
    )
  }

  render() {
    const {isLoading, filterLanguage} = this.state
    return (
      <div className="bg-container">
        <div className="header-container">
          <h1>Popular</h1>
          <ul className="language-filter-button-container">
            {languageFiltersData.map(eachData => (
              <LanguageFilterItem
                eachData={eachData}
                key={eachData.id}
                onFilterButtonClick={this.onFilterButtonClick}
                isActive={filterLanguage === eachData.id}
              />
            ))}
          </ul>
        </div>
        {isLoading && (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )}
        {this.renderRepositoryItem()}
        {this.renderFaliRequest()}
      </div>
    )
  }
}

export default GithubPopularRepos
