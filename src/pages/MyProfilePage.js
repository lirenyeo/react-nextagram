import React from 'react'
import Axios from 'axios';

export default class MyProfilePage extends React.Component {
  state = {
    images: []
  }

  componentDidMount() {
    Axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/images/me',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      },
    })
    .then(res => {
      this.setState({images: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items center flex-wrap">
        {
          this.state.images.map((url, index) =>
            <img key={index} src={url} />
          )
        }
      </div>
    )
  }
}