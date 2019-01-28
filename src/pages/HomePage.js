import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import UserImages from '../containers/UserImages'

export default class HomePage extends React.Component {
  state = {
    users: [],
    loading: true
  }

  componentDidMount() {
    this.mounted = true
    Axios.get('https://insta.nextacademy.com/api/v1/users')
    .then(({data}) => {
      if (this.mounted) {
        this.setState({users: data, loading: false})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    if (this.state.loading) return <div className="full-page"><img src="https://66.media.tumblr.com/3c300b438575aef1bef76ca962aba3ae/tumblr_n5stgrcGIB1qzs2sko1_500.gif" alt=""/></div>
    return (
      <div>
        {
          this.state.users.map(user =>
            <div className="row p-3 my-5" key={user.id}>
              <div className="col-3">
                <img src={user.profileImage} className="profile-image d-block mx-auto" alt={user.id} />
                <Link to={`user/${user.id}`}>
                  <div className="username text-center">{user.username}</div>
                </Link>
              </div>
              <div className="col-9">
                <UserImages userId={user.id}/>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}