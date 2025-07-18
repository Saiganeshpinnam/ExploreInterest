import {MdFavoriteBorder} from 'react-icons/md'

import {FaRegComment} from 'react-icons/fa'

import {IoMdMore} from 'react-icons/io'

import {GoShareAndroid} from 'react-icons/go'

import './index.css'

const Fashion = props => {
  const {usersData, getLikedItemId} = props
  // console.log(usersData)
  const {id, name, imageUrl, likes, comments, isFavorite} = usersData
  // console.log(likes)

  const activateLike = isFavorite ? '' : 'activate-like-btn'

  const onClickingLike = () => {
    getLikedItemId(id)
  }

  return (
    <div className="fashion-item">
      <img src={imageUrl} className="user-image" alt={name} />
      <div className="card-item-elements-container">
        <div className="likes-comments-share-options-container">
          <div className="likes-container">
            <MdFavoriteBorder
              className={`favorite-icon ${activateLike}`}
              onClick={() => onClickingLike(id, isFavorite)}
            />
            {isFavorite ? (
              <p className="likes-count">{likes}</p>
            ) : (
              <p className="likes-count">{parseInt(likes) + 1}</p>
            )}
          </div>
          <div className="comments-container">
            <FaRegComment className="comment-icon" />
            <p className="comments-count">{comments}</p>
          </div>
          <GoShareAndroid className="share-icon" />
          <IoMdMore className="more-options" />
        </div>
        <button type="button" className="save-btn">
          Save
        </button>
      </div>
    </div>
  )
}

export default Fashion
