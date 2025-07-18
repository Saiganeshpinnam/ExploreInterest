import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Fashion from '../Fashion'

import Category from '../Category'

import Header from '../Header'

import NotFound from '../NotFound'

import './index.css'

const categoriesList = [
  {
    id: 1,
    name: 'fashion',
  },
  {
    id: 2,
    name: 'education',
  },
  {
    id: 3,
    name: 'selfImprovement',
  },
  {
    id: 4,
    name: 'health',
  },
  {
    id: 5,
    name: 'nature',
  },
  {
    id: 6,
    name: 'foodie',
  },
  {
    id: 7,
    name: 'drawing',
  },
  {
    id: 8,
    name: 'workout',
  },
  {
    id: 9,
    name: 'sports',
  },
  {
    id: 10,
    name: 'tradition',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ExploreInterest extends Component {
  state = {
    fashionData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUsersData()
  }

  getUsersData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://retoolapi.dev/Pey4cb/data')
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(eachUser => ({
        id: eachUser.id,
        name: eachUser.full_name,
        imageUrl: eachUser.image_url,
        likes: eachUser.likes,
        comments: eachUser.comments,
        isFavorite: eachUser.is_favorite,
      }))
      const shuffled = [...updatedData].sort(() => Math.random() - 0.5)
      this.setState({
        fashionData: shuffled,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getLikedItemId = id => {
    this.setState(prevState => ({
      fashionData: prevState.fashionData.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isFavorite: !eachItem.isFavorite}
        }
        return eachItem
      }),
    }))
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {fashionData} = this.state
    return (
      <div className="bg-container">
        <Header />
        <ul className="categories-container">
          {categoriesList.map(eachCategory => (
            <li key={eachCategory.id}>
              <Category eachCategory={eachCategory} />
            </li>
          ))}
        </ul>
        <ul className="user-images-container">
          {fashionData.map(eachFashion => (
            <li key={eachFashion.id}>
              <Fashion
                usersData={eachFashion}
                getLikedItemId={this.getLikedItemId}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <NotFound />

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ExploreInterest
