import React from "react"
import Axios from 'axios';

class UserProfilePage extends React.Component {
  state = {
    images: [],
    loading: true,
  }

  componentDidMount = () => {
    Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.match.params.id}`)
    .then(({data}) => {
      this.setState({images: data, loading: false})
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    if (this.state.loading) return <div className="full-page"><img src="https://66.media.tumblr.com/3c300b438575aef1bef76ca962aba3ae/tumblr_n5stgrcGIB1qzs2sko1_500.gif" alt=""/></div>
    return (
      <div className='d-flex justify-content-center align-items-center flex-wrap'>
        {
          this.state.images.map((image, index) =>
            <img key={index} src={image} alt={index} className="p-3" width="300" />
          )
        }
      </div>
    )
  }
}

export default UserProfilePage