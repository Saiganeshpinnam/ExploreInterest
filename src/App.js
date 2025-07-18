import {BrowserRouter, Switch, Route} from 'react-router-dom'

import ExploreInterest from './components/ExploreInterest'

import Home from './components/Home'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/fashion" component={ExploreInterest} />
    </Switch>
  </BrowserRouter>
)

export default App