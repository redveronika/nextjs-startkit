import React, { Component } from 'react'
import { IntlProvider, injectIntl } from 'react-intl'
import { get } from 'lodash'

let messagesCache
if (typeof window !== 'undefined') {
  const locale = get(window, '__NEXT_DATA__.props.locale')
  messagesCache = window.__intl__
}

export const getMessages = locale => {
  const { readFileSync, existsSync } = require('fs')
  const localeFilePath = `./intl/translations/${locale}.json`
  if (existsSync(localeFilePath)) {
    const localeFile = readFileSync(localeFilePath, 'utf8')
    return JSON.parse(localeFile)
  }
  return null
}

export default Page => {
  const IntlPage = injectIntl(Page)

  return class extends Component {
    static async getInitialProps(context) {
      let props
      if (typeof Page.getInitialProps === 'function') {
        props = await Page.getInitialProps(context)
      }

      const { req, query: { locale } } = context
      const now = Date.now()

      if (req) {
        messagesCache = getMessages(locale)
      }

      return { ...props, locale, now }
    }

    render() {
      const { locale, now, ...props } = this.props

      return (
        <IntlProvider defaultLocale="ru" locale={locale} messages={messagesCache} initialNow={now}>
          <IntlPage {...props} />
        </IntlProvider>
      )
    }
  }
}
