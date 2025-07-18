import {Link} from 'react-router-dom'

import './index.css'

const Category = props => {
  const {eachCategory} = props
  const {name} = eachCategory
  return (
    <Link to={`/${name}`}>
      <button type="button" className="category-btn">
        {name}
      </button>
    </Link>
  )
}

export default Category