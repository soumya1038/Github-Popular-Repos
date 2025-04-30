// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = eachItem

  return (
    <li className="each-Container">
      <img src={avatarUrl} alt={name} className="avater-image" />
      <h1>{name}</h1>
      <div className="each-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo-image"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="each-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo-image"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="each-details-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo-image"
        />
        <p>{issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
