import React, { useEffect, useState } from "react"
import firebase from "firebase"
import { Loading } from "../components"
import { Icon } from "semantic-ui-react"

const banAccount = async (id) => {
	try {
		const account = firebase.firestore().collection("users").doc(id)
		await account.set({ banned: true }, { merge: true })
	} catch (error) {
		alert(error.message)
	}
}

const unBanAccount = async (id) => {
	try {
		const account = firebase.firestore().collection("users").doc(id)
		await account.set({ banned: false }, { merge: true })
	} catch (error) {
		alert(error.message)
	}
}

const verifyAccount = async (id) => {
	try {
		const account = firebase.firestore().collection("users").doc(id)
		await account.set({ verifiedAccount: true }, { merge: true })
	} catch (error) {
		alert(error.message)
	}
}

const ChannelRender = ({ item }) => {
	const [editable, setEditable] = useState(false)
	const [name, setName] = useState(null)
	const [uname, setUname] = useState(null)

	const handleDone = async () => {
		setEditable(false)
		try {
			const data = await firebase
				.firestore()
				.collection("users")
				.doc(item.id)
				.get()

			const _data = {
				...data.data(),
				name: name ? name : data.data().name,
				username: uname ? uname : data.data().username,
			}

			data.ref.set(_data, { merge: true })
		} catch (error) {
			alert(error.message)
		}
	}

	return (
		<tr style={{ borderBottom: "1px solid #ccc" }}>
			<td style={{ maxWidth: 30 }}>
				<img src={item.avatar} style={{ width: 100, height: 100 }} />
			</td>
			<td style={{ paddingLeft: 10 }}>
				<input
					style={{ backgroundColor: "#fff", border: 0 }}
					type='text'
					disabled={!editable}
					defaultValue={item.name}
					onChange={(e) => setName(e.target.value)}
				/>
				<br />
				<input
					style={{ backgroundColor: "#fff", border: 0 }}
					type='text'
					disabled={!editable}
					defaultValue={item.username}
					onChange={(e) => setUname(e.target.value)}
				/>
			</td>
			<td style={{ textAlign: "center" }}>
				{item.followers ? item.followers.length : 0}
			</td>
			<td
				style={{
					display: "flex",
					height: 100,
					justifyContent: "center",
				}}
			>
				{!editable ? (
					<button
						onClick={() => setEditable(true)}
						style={{
							padding: 5,
							width: "90%",
							backgroundColor: "#fff",
							border: 0,
						}}
					>
						<Icon name='pencil' size={26} />
					</button>
				) : (
					<button
						onClick={handleDone}
						style={{
							padding: 5,
							width: "90%",
							backgroundColor: "#fff",
							border: 0,
						}}
					>
						<Icon name='check' size={26} />
					</button>
				)}
			</td>
			<td style={{ textAlign: "center" }}>
				{!item.verifiedAccount ? (
					<button
						style={{
							backgroundColor: "rgba(81,135,200,1)",
							border: 0,
							color: "white",
							padding: 5,
							borderRadius: 5,
						}}
						onClick={() => verifyAccount(item.id)}
					>
						Verify
					</button>
				) : (
					<p>Verified</p>
				)}
			</td>
			<td style={{ textAlign: "center" }}>
				{!item.banned ? (
					<button
						style={{
							backgroundColor: "red",
							border: 0,
							color: "white",
							padding: 5,
							borderRadius: 5,
						}}
						onClick={() => banAccount(item.id)}
					>
						Ban
					</button>
				) : (
					<button
						style={{
							backgroundColor: "orange",
							border: 0,
							padding: 5,
							borderRadius: 5,
						}}
						onClick={() => unBanAccount(item.id)}
					>
						unban
					</button>
				)}
			</td>
		</tr>
	)
}

const Channels = () => {
	const [newsChannels, setChannels] = useState(null)
	const [filter, setFilter] = useState("all")
	useEffect(() => {
		;(async () => {
			let channelsRef

			switch (filter) {
				case "news":
					channelsRef = firebase
						.firestore()
						.collection("users")
						.where("accountType", "==", "news")
					break
				case "users":
					channelsRef = firebase
						.firestore()
						.collection("users")
						.where("accountType", "!=", "news")
					break
				default:
					channelsRef = firebase.firestore().collection("users")
			}

			channelsRef.onSnapshot((snapshot) => {
				const _channels = []

				snapshot.docs.map((channel) => {
					_channels.push({ id: channel.id, ...channel.data() })
				})

				const currentUserID = firebase.auth().currentUser.uid

				const __channels = _channels.filter(
					(channel) => channel.id !== currentUserID,
				)

				setChannels(__channels)
			})
		})()
	})

	return (
		<div className='db-container'>
			<div className='db-cards'>
				<div className='borderedContainer'>
					<h1 className='header'>Manage Users</h1>
					<ul>
						<li style={{ padding: 10 }}>Filter</li>
						<li>
							<button onClick={() => setFilter("all")}>All</button>
						</li>
						<li>
							<button onClick={() => setFilter("news")}>News</button>
						</li>
						<li>
							<button onClick={() => setFilter("users")}>Users</button>
						</li>
					</ul>
					<table
						style={{
							backgroundColor: "#fff",
							boxShadow: "8px 8px 8px #ccc",
							width: "100%",
							padding: 10,
						}}
					>
						<tr>
							<td>Avatar</td>
							<td>Info</td>
							<td style={{ textAlign: "center" }}>Followers</td>
							<td style={{ textAlign: "center" }}>Edit</td>
							<td style={{ textAlign: "center" }}>Verification</td>
							<td style={{ textAlign: "center" }}>Action</td>
						</tr>
						{newsChannels !== null ? (
							newsChannels.map((channel) => <ChannelRender item={channel} />)
						) : (
							<Loading />
						)}
					</table>
				</div>
			</div>
		</div>
	)
}

export default Channels
