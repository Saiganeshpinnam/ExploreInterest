import {Link} from 'react-router-dom'

import {RiHome2Fill} from 'react-icons/ri'

import './index.css'

const Header = () => (
  <Link to="/">
    <RiHome2Fill className="home-icon" />
  </Link>
)

export default Header
