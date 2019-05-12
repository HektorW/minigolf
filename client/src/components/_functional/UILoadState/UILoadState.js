import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UILoadState extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,

    waitMs: PropTypes.number,
    minLoadingMs: PropTypes.number
  }

  static defaultProps = {
    waitMs: 100,
    minLoadingMs: 750
  }

  state = {
    showLoadingStartTime: null
  }

  timeoutId = null

  componentDidMount() {
    // If we mount with load state we show it instantly
    if (this.props.isLoading) {
      this.setState({ shouldShowLoadState: true })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoading && !prevProps.isLoading) {
      const { showLoadingStartTime } = this.state
      if (showLoadingStartTime !== null) {
        clearTimeout(this.timeoutId)
      } else {
        this.timeoutId = setTimeout(
          () => this.setState({ showLoadingStartTime: Date.now() }),
          this.props.waitMs
        )
      }
    }

    if (!this.props.isLoading && prevProps.isLoading) {
      const { showLoadingStartTime } = this.state
      if (showLoadingStartTime !== null) {
        const timeSinceShowLoadingStart = Date.now() - showLoadingStartTime
        const additionalWait = Math.max(
          0,
          this.props.minLoadingMs - timeSinceShowLoadingStart
        )
        this.timeoutId = setTimeout(
          () => this.setState({ showLoadingStartTime: null }),
          additionalWait
        )
      } else {
        clearTimeout(this.timeoutId)
      }
    }
  }

  render() {
    const { children } = this.props
    const { showLoadingStartTime } = this.state

    const shouldShowLoadState = showLoadingStartTime !== null

    if (typeof children === 'function') {
      return children(shouldShowLoadState)
    }

    if (shouldShowLoadState) {
      return <div>TODO : Create generic loader</div>
    }

    return children
  }
}
