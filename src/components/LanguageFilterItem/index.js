// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachData, onFilterButtonClick, isActive} = props
  const {id, language} = eachData

  const onClickItem = () => {
    onFilterButtonClick(id)
  }

  const buttonClassName = isActive ? 'active-button' : ''

  return (
    <li>
      <button
        type="button"
        onClick={onClickItem}
        className={`filter-button ${buttonClassName}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
