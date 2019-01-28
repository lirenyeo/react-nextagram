import React from 'react'
import Axios from 'axios'
// import Image from 'react-graceful-image'
import GracefulImage from './GracefulImage'
import ImageLoader from '../components/ImageLoader'

export default class UserImages extends React.Component {
  state = {
    images: [],
    loading: true,
  }

  componentDidMount() {
    this.mounted = true
    Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.userId}`)
    .then(({data}) => {
      if (this.mounted) {
        this.setState({images: data, loading: false})
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
    return (
      <div className="row">
        {
          this.state.loading
            ? <ImageLoader/>
            : this.state.images.map((url, index) =>
                <GracefulImage
                  key={index}
                  className='p-1'
                  src={url}
                  width="200"
                  height="200"
                />
              )
        }
      </div>
    )
  }
}