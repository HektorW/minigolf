import React from 'react'
import PropTypes from 'prop-types'
import MainLayout from '../../components/MainLayout'
import Loader from '../../components/Loader'
import MatchList from '../../components/MatchList'
import useUILoadState from '../../hooks/useUILoadState'
import Surface from '../../components/Surface'
import './matches.scss'

const Matches = ({ isFetching, upcomingMatches, playedMatches }) => {
  const shouldShowLoadState = useUILoadState(isFetching, 0)

  return (
    <MainLayout className="matches">
      {shouldShowLoadState ? (
        <Loader />
      ) : (
        <>
          <Surface className="matches__surface" withPadding>
            <h2 className="matches__title">Spelade matcher</h2>
            <MatchList matches={playedMatches} />
          </Surface>

          <Surface className="matches__surface" withPadding>
            <h2 className="matches__title">Kommande matcher</h2>
            <MatchList matches={upcomingMatches} />
          </Surface>
        </>
      )}
    </MainLayout>
  )
}

Matches.propTypes = {}

export default Matches
