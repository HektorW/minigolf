import React from 'react'
import PropTypes from 'prop-types'
import TablesViewer from './TablesViewer/TablesViewer.connect'
import './root.scss'
import MainLayout from '../../components/MainLayout'
import NextMatch from './NextMatch'

const Root = () => (
  <MainLayout>
    <TablesViewer />

    {/* <NextMatch /> */}
  </MainLayout>
)

Root.propTypes = {}

export default Root
