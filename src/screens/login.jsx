import React, { useState } from "react"
import "../styles/login.css"
import { Redirect } from "react-router-dom"
import { Hint, Loading } from "../components"
import { Button, Input, Icon } from "semantic-ui-react"
import firebase from "firebase"

const Login = () => {
	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [loggedIn, setLoggedIn] = useState(false)
	const [loading, setLoading] = useState(false)

	const onPressSignIn = async () => {
		setLoading(true)
		try {
			const { user } = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)

			if (user) {
				setLoggedIn(true)
			}
		} catch (err) {
			setLoading(false)
			alert(err.message)
		}
	}

	return loggedIn ? (
		<Redirect to={{ pathname: "/" }} />
	) : (
		<div className='container'>
			<div className='sidebar'>
				<div className='content'>
					<Hint icon='search' text='Follow Your Interests' />
					<Hint icon='users' text='Hear What Other People are Talking About' />
					<Hint icon='chat' text='Join a conversation' />

					<div>
						<p>What People are talking about</p>
					</div>
					<div>
						<p>Join a Conversation</p>
					</div>
				</div>
			</div>
			<div className='mainContent' style={{ justifyContent: "center" }}>
				{loading ? (
					<Loading />
				) : (
					<div className='subMainContent'>
						<h1 style={{ width: "70%" }}>
							See What's Happening in the world right now
						</h1>
						<div className='input'>
							<Input
								icon='mail'
								fluid
								placeholder='Email'
								onChange={(e) => setEmail(e.target.value)}
								size='big'
							/>
						</div>
						<div className='input'>
							<Input
								icon='lock'
								type='password'
								fluid
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
								size='big'
							/>
						</div>
						<div className='center'>
							<Button color='black' onClick={onPressSignIn} animated>
								<Button.Content visible>
									<Icon name='sign-in' />
								</Button.Content>
								<Button.Content hidden>Login</Button.Content>
							</Button>
						</div>

						{/* <div style={{ marginTop: "5%" }} className='center'>
							<p>
								Don't Have an Account?{" "}
								<Link to={{ pathname: "/signup" }}>Sign Up</Link> Here
							</p>
						</div> */}
					</div>
				)}
			</div>
		</div>
	)
}

export default Login
