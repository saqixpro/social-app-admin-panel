import React, { useEffect, useState } from "react"
import "../styles/main.css"
import { FilePicker } from "react-file-picker"
import firebase from "firebase"
import { Loading } from "../components"
const NewPost = () => {
	const [image, setImage] = useState(null)
	const [textContent, setTextContent] = useState(null)
	const [sourceUrl, setSourceUrl] = useState(null)
	const [channels, setChannels] = useState(null)
	const [loading, setLoading] = useState(false)
	const [currentChannel, setChannel] = useState(null)

	const handleSubmit = async () => {
		if (currentChannel) {
			if (textContent) {
				if (sourceUrl) {
					if (image) {
						try {
							setLoading(true)
							const timeStamp = Date.now()
							const imageRef = firebase
								.storage()
								.ref()
								.child("channels")
								.child(currentChannel)
								.child(`post_assets`)
								.child(timeStamp.toString())
							const res = await imageRef.put(image)
							const imgUrl = await imageRef.getDownloadURL()

							const data = {
								textContent,
								image: imgUrl,
								author: currentChannel,
								type: "news",
								url: sourceUrl,
								timeStamp,
								likes: [],
								comments: [],
							}

							const postsRef = firebase.firestore().collection("posts")

							await postsRef.add(data)

							setLoading(false)
						} catch (error) {
							setLoading(false)
							alert(error.message)
						}
					} else {
						alert(`Image is Required`)
					}
				} else {
					alert(`Source URL is required`)
				}
			} else {
				alert(`Text Content Cannot Be Empty!`)
			}
		} else {
			alert(`You Must Select a Channel First`)
		}
	}

	const fetchChannels = async () => {
		const channels = await firebase
			.firestore()
			.collection("users")
			.where("accountType", "==", "news")
			.get()

		const _channels = []

		channels.docs.map((channel) =>
			_channels.push({ id: channel.id, ...channel.data() }),
		)
		setChannels(_channels)
	}

	useEffect(() => {
		fetchChannels()
	}, [])

	return (
		<div className='db-container'>
			<div className='db-cards'>
				<div className='borderedContainer'>
					<h1 className='header'>NEW POST</h1>
					<div className='custom-file-upload'>
						{loading ? (
							<Loading />
						) : (
							<FilePicker
								extensions={["heic", "jpg", "png", "jpeg"]}
								onChange={(file) => setImage(file)}
								onError={(errMsg) => alert(errMsg)}
							>
								<button className='btn'>
									<img
										src={require("../assets/images/image.png")}
										style={{ width: "100%", height: "100%" }}
									/>
									.
								</button>
							</FilePicker>
						)}
					</div>
					<div style={{ marginTop: "2%" }} />
					<div>
						<label
							style={{ marginLeft: 10, marginRight: 10 }}
							htmlFor='channel'
						>
							Select Channel
						</label>
						<select
							style={{
								marginLeft: 10,
								marginRight: 10,
							}}
							name='channel'
							id='channel'
							onChange={(e) => setChannel(e.target.value)}
						>
							<option value=''>SELECT CHANNEL</option>
							{channels ? (
								channels.map((channel) => (
									<option value={channel.id}>{channel.name}</option>
								))
							) : (
								<Loading />
							)}
						</select>
					</div>
					<div className='text-input'>
						<input
							type='text'
							name='textContent'
							onChange={(e) => setTextContent(e.target.value)}
							placeholder="What's going on?"
						/>
					</div>
					<div className='text-input'>
						<input
							type='text'
							name='textContent'
							onChange={(e) => setSourceUrl(e.target.value)}
							placeholder='Source Link?'
						/>
					</div>
					<div className='submit-button'>
						<button onClick={handleSubmit}>
							<p className='btn-text'>Submit</p>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewPost
