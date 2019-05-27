import React from 'react'
import Axios from 'axios'

export default class MyProfilePage extends React.Component {
  state = {
    images: [],
    loading: true
  }

  componentDidMount() {
    Axios({
      method: 'get',
      url: 'https://insta.nextacademy.com/api/v1/images/me',
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
      .then(res => {
        this.setState({ images: res.data, loading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.state.loading)
      return (
        <div className="full-page">
          <img
            src="https://66.media.tumblr.com/3c300b438575aef1bef76ca962aba3ae/tumblr_n5stgrcGIB1qzs2sko1_500.gif"
            alt=""
          />
        </div>
      )
    return (
      <div className="d-flex justify-content-center align-items center flex-wrap">
        {this.state.images.map((url, index) => (
          <img height="300" key={index} src={url} />
        ))}
      </div>
    )
  }
}
