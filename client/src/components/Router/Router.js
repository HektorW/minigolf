import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NotFound404 from '../../routes/NotFound404'
import Matches from '../../routes/Matches'
import Root from '../../routes/Root'
import Settings from '../../routes/Settings'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Root} />
      <Route path="/matches" component={Matches} />
      <Route path="/settings" component={Settings} />

      <Route component={NotFound404} />
    </Switch>
  </BrowserRouter>
)

export default Router
