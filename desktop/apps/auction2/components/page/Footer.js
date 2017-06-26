import PropTypes from 'prop-types'
import React from 'react'
import block from 'bem-cn'
import renderTemplate from 'desktop/components/react/utils/render_template'
import { first } from 'underscore'

export default function Footer (props) {
  const { articles, auction, footerItems } = props
  const footerItem = first(footerItems)
  const showArticles = Boolean(articles.length)
  const showFooterItems = footerItem && !auction.isAuctionPromo()
  const b = block('auction-footer')

  if (!showArticles) {
    return null
  }

  return (
    <footer
      className={b({without: false})
        .mix('auction-page-section')
        .mix(articles.length ? 'has-articles' : 'has-no-articles')}
    >
      { showArticles &&
        <div className={b('auction-articles')}>
          { articles.models.map((article, key) => {
            let articleFigureHTML

            // Serverside
            if (typeof window === 'undefined') {
              articleFigureHTML = renderTemplate('desktop/components/article_figure/template.jade', { locals: { article, ...props } })

              // Client
            } else {
              articleFigureHTML = require('desktop/components/article_figure/template.jade')({ article, ...props })
            }

            return (
              <div
                key={key}
                dangerouslySetInnerHTML={{ __html: articleFigureHTML }}
              />
            )
          })}
        </div>
      }

      { showFooterItems &&
        <div className={b('auction-app-promo-wrapper')}>
          <a className={b('auction-app-promo')}>
            <div className={b('auction-app-promo-image')}>
              <img
                src={footerItem.src}
                alt={footerItem.alt}
              />
            </div>
            <div className={b('auction-app-promo-metadata')}>
              <div className={b('auction-app-promo-title')}>
                {footerItem.title}
              </div>
              <div className={b('auction-app-promo-subtitle')}>
                {footerItem.subtitle}
              </div>
            </div>
          </a>
        </div> }
    </footer>
  )
}

Footer.propTypes = {
  articles: PropTypes.object,
  auction: PropTypes.object,
  footerItems: PropTypes.array
}

Footer.defaultProps = {
  articles: {},
  footerItems: []
}
