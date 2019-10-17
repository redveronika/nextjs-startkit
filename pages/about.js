import React, { Component } from 'react'
import { defineMessages, FormattedMessage } from 'react-intl'
const messages = defineMessages({
  title: 'TEST'
})

export default class extends Component {
  render() {
    return (
      <FormattedMessage {...messages.title} />
    )
  }
}