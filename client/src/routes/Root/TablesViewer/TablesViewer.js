import React, { Fragment } from 'react'
import Surface from '../../../components/Surface'
import compareTeamName from '../../../utils/compareTeamName'
import './tables-viewer.scss'

const TablesViewer = ({ tableRows, isFetching, fetchError }) => (
  <Fragment>
    <Surface className="tables-viewer__title">
      <h2>Mästarserien 2019</h2>
    </Surface>

    <Surface className="tables-viewer slide-appear">
      {isFetching && <div style={{ padding: '2rem' }}>Hämtar tabell..</div>}

      {fetchError && <div>Något gick fel, kunde inte hämta tabellen :(</div>}

      {tableRows && tableRows.length > 0 && (
        <table className="tables-viewer__table">
          <thead className="tables-viewer__table-head">
            <tr>
              <th>Position</th>
              <th>Lag</th>

              <th>Spelade</th>

              <th>Vunna</th>
              <th>Förlorade</th>
              <th>Oavgjorde</th>

              <th>GM</th>
              <th>IM</th>
              <th>MS</th>

              <th>Points</th>

              <th>Form</th>
            </tr>
          </thead>

          <tbody className="tables-viewer__table-body">
            {tableRows.map(team => (
              <tr
                key={team.name}
                className={`tables-viewer__table-row ${
                  compareTeamName(team.name, 'Partiet')
                    ? 'tables-viewer__table-row--is-own'
                    : ''
                }`}
              >
                <td className="tables-viewer__table-data--position">
                  {team.position}
                </td>

                <td className="tables-viewer__table-data--name">
                  {/*<img
                    className="tables-viewer__table-data-image"
                    src={`https://korpenmalmoidrottsforening.zoezi.se/api/public/image/get?size=30x30&type=usergroup&id=${
                      team.imageId
                    }`}
                    alt={team.name}
                  />*/}
                  {team.name}
                </td>

                <td className="tables-viewer__table-data--played">
                  {team.played}
                </td>

                <td className="tables-viewer__table-data--won">{team.won}</td>
                <td className="tables-viewer__table-data--draw">{team.draw}</td>
                <td className="tables-viewer__table-data--lost">{team.lost}</td>

                <td className="tables-viewer__table-data--scored">
                  {team.scored}
                </td>
                <td className="tables-viewer__table-data--conceded">
                  {team.conceded}
                </td>

                <td className="tables-viewer__table-data--conceded">
                  {team.goalDifference}
                </td>

                <td className="tables-viewer__table-data--points">
                  {team.points}
                </td>

                <td />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Surface>
  </Fragment>
)

export default TablesViewer
