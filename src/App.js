import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./constants/firebase"
import { Login, MainScreen } from "./screens"
import { ProtectedRoute } from "./components"
function App() {
	return (
		<Router>
			<Switch>
				{/* <Route exact component={SignUp} path={`/signup`}>
          <SignUp />
        </Route> */}
				<Route exact component={Login} path='/login'>
					<Login />
				</Route>
				<ProtectedRoute exact component={MainScreen} path='/' />
			</Switch>
		</Router>
	)
}

export default App
