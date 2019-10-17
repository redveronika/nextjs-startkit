import React, { Component } from 'react'
import styled from 'styled-components'
import HTTPStatus from 'http-status'
import Helmet from 'react-helmet'
import store from 'store'
import withRedux from 'next-redux-wrapper'
import { media } from 'utils/styles'
import withIntl from 'utils/intl'
import Layout from 'components/Layout'

@withIntl
@withRedux(store)
export default class extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    const { statusCode } = this.props
    const title = statusCode === 404 ? 'Страница не найдена' : HTTPStatus[statusCode] || 'Ошибка сервера'

    return (
      <Layout>
        <Helmet title={title} />
        <Container>
          <Code>{statusCode}</Code>
          <Title>{title}</Title>
        </Container>
      </Layout>
    )
  }
}

const Container = styled.div`
  margin: 58px 0 100px;
  text-align: center;

  ${media.desktop`
    margin: 85px 0 100px;
  `};
`

const Code = styled.h1`
  margin: 0;
  font-size: 100px;
  line-height: 100px;

  ${media.desktop`
    font-size: 144px;
    line-height: 144px;
  `};
`

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 12px;

  ${media.desktop`
    margin-top: -20px;
    font-size: 22px;
    line-height: 25px;
  `};
`
