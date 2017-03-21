import React from 'react'

export class Image extends React.Component {

  static propTypes = {
    transforms: React.PropTypes.object
  }

  render() {
    const { src, className, title, transforms } = this.props
    const query = Object.keys(transforms).map(key => `${key}=${transforms[key]}` ).join('&')
    const normal = `/imagecache${src}?${query}&dpi=1`
    const retina = `/imagecache${src}?${query}&dpi=2`
    return <img src={normal} srcSet={`${normal} 1x, ${retina} 2x`} title={title} className={className} />
  }

}

export default Image
