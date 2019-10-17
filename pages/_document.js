import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import Helmet from 'react-helmet'
import { getMessages } from 'utils/intl'

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context)
    const { renderPage, query: { locale } } = context

    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    const { nextExport = false } = global.__NEXT_DATA__ || {}
    const messages = getMessages(locale)

    return { ...props, styleTags, locale, messages, nextExport, helmet: Helmet.rewind() }
  }

  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {this.helmetHeadComponents}
          {this.props.styleTags}
        </Head>
        <body className="max-height">
          <Main />
          <script src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`} />
          <script dangerouslySetInnerHTML={{ __html: `window.__intl__ = ${JSON.stringify(this.props.messages)}` }} />
          <NextScript />
        </body>
      </html>
    )
  }
}
