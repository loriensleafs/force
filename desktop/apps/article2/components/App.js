import PropTypes from 'prop-types'
import React, { Component } from 'react'
import components from '@artsy/reaction-force/dist/components/publishing/index'
import _ from 'underscore'
const { ImagesetPreview, Artwork, Image, FeatureHeader } = components

export default class App extends Component {
  static propTypes = {
    article: PropTypes.object
  }

  renderSections (sections) {
    // const renderedSections = sections.map((section) => {
    //   if (section.type === 'image_collection') {
    //     const images = section.images.map((image) => {
    //       if (image.type === 'image') {
    //         return (
    //           <div style={{ width: '50%' }}>
    //             <Image image={image} />
    //           </div>
    //         )
    //       } else if (image.type === 'artwork') {
    //         return (
    //           <div style={{ width: '50%' }}>
    //             <Artwork linked artwork={image} />
    //           </div>
    //         )
    //       }
    //     })
    //     return images
    //   } else if (section.type === 'image_set') {
    //     return (
    //       <ImagesetPreview images={section.images} />
    //     )
    //   }
    // })
    // return renderedSections
  }

  renderFeatureHeader (header) {
    // if (header) {
    //   return (
    //     <div style={{ width: '100%', position: 'relative' }}>
    //       <FeatureHeader header={header} />
    //     </div>
    //   )
    // }
  }

  render () {
    const { article } = this.props
    return (
      <div>
        <div style={{ width: '100%' }}>
          {this.renderFeatureHeader(article.hero_section)}
          {this.renderSections(article.sections)}
        </div>
      </div>
    )
  }
}
