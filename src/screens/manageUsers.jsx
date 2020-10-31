import React, { useState } from "react"
import { FilePicker } from "react-file-picker"
import { Loading } from "../components"
import firebase from "firebase"
import "../styles/main.css"

const NewPost = () => {
	const [loading, setLoading] = useState(false)
	const [image, setImage] = useState(null)
	const [name, setName] = useState(null)
	const [displayName, setDisplayName] = useState(null)

	const handleSubmit = async () => {
		try {
			if (name && displayName && image) {
				setLoading(true)
				const id = Date.now().toString()
				const imageRef = firebase
					.storage()
					.ref()
					.child("channels/")
					.child(id)
					.child("post_assets/")
					.child("profile/")
				const res = await imageRef.put(image)
				const url = await imageRef.getDownloadURL()

				const data = {
					dateCreated: Date.now(),
					name: displayName,
					username: name,
					avatar: url,
					verifiedAccount: false,
					followers: [],
					accountType: "news",
					uid: id,
				}

				const channelsRef = firebase.firestore().collection("users")

				await channelsRef.doc(id).set(data)

				setLoading(false)

				alert(`Channel Account Created Successfully!`)
			} else {
				alert(`missing fields`)
			}
		} catch (error) {
			setLoading(false)
			alert(error.message)
		}
	}

	return (
		<div className='db-container'>
			<div className='db-cards'>
				<div className='borderedContainer'>
					<h1 className='header'>Add Channel</h1>
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
								</button>
							</FilePicker>
						)}
					</div>
					<div className='text-input'>
						<input
							type='text'
							name='name'
							title='Full Name of The Channel i.e. FOX NEWS'
							onChange={(e) => setName(e.target.value)}
							placeholder='Channel Name'
						/>
					</div>
					<div className='text-input'>
						<input
							type='text'
							name='name'
							title="i.e. @CNN (Don't Include @)"
							onChange={(e) => setDisplayName(e.target.value)}
							placeholder='Display Name'
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
