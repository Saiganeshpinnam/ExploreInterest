import {Component} from 'react'

import Fashion from '../Fashion'

import Category from '../Category'

import Header from '../Header'

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

class Home extends Component {
  state = {
    isLoading: true,
    fashionData: [],
    shuffledList: [],
  }

  componentDidMount() {
    this.getUsersData()
  }

  getHomeData = () => {
    const {fashionData} = this.state
    const shuffled = [...fashionData].sort(() => Math.random() - 0.5)
    this.setState({
      shuffledList: shuffled,
    })
  }

  getUsersData = async () => {
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
      this.setState(
        {
          fashionData: updatedData,
        },
        this.getHomeData,
      )
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

  render() {
    const {shuffledList} = this.state
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
        <h1>Home Component</h1>
        <ul className="user-images-container">
          {shuffledList.map(eachFashion => (
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
}

export default Home
