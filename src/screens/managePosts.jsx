import React, { useEffect, useState } from "react"
import "../styles/main.css"
import firebase from "firebase"
import { Icon } from "semantic-ui-react"

const RenderPost = ({ item }) => {
	const formatTime = (timeStamp) => {
		const timeInSeconds =
			(new Date().getTime() - new Date(timeStamp).getTime()) / 1000
		if (timeInSeconds < 60) return `${timeInSeconds.toFixed(0)} s`
		const timeInMinutes = timeInSeconds / 60
		if (timeInMinutes < 60) return `${timeInMinutes.toFixed(0)} m`
		const timeInHours = timeInMinutes / 60
		if (timeInHours < 24) return `${timeInHours.toFixed(0)} h`
		const timeInDays = timeInHours / 24
		if (timeInDays < 30) return `${timeInDays.toFixed(0)} d`
		const timeInMonths = timeInDays / 30
		if (timeInMonths < 12) return `${timeInMonths.toFixed(0)} months`
		return `${(timeInMonths / 12).toFixed(0)} y`
	}

	const likePost = async () => {
		const userID = firebase.auth().currentUser.uid
		const post = await firebase
			.firestore()
			.collection("posts")
			.doc(item.id)
			.get()
		const likes = post.data().likes
		post.ref.set({ likes: [...likes, userID] }, { merge: true })
	}

	const unLikePost = async () => {
		const userID = firebase.auth().currentUser.uid
		const post = await firebase
			.firestore()
			.collection("posts")
			.doc(item.id)
			.get()
		const likes = post.data().likes.filter((id) => id !== userID)
		post.ref.set({ likes }, { merge: true })
	}

	const deletePostAsync = async (id) => {
		const postRef = firebase.firestore().collection("posts").doc(id)
		await postRef.delete()
	}

	const alreadyLiked = () => {
		const currentUserID = firebase.auth().currentUser.uid

		let liked = false

		if (item.likes) {
			liked = item.likes.find((id) => id == currentUserID)
		}
		return liked
	}

	return (
		<div
			style={{
				padding: 20,
				minHeight: 400,
				maxHeight: 400,
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div style={{ display: "flex", flex: 0.1 }}>
				<div style={{ flex: 0.2 }}>
					<img
						src={item.author.avatar}
						style={{ width: 50, height: 50, borderRadius: 50 }}
					/>
				</div>
				<div
					style={{
						paddingLeft: 5,
						flex: 0.7,
						alignItems: "flex-start",
					}}
				>
					<p style={{ padding: 0, margin: 0, fontSize: 12 }}>
						{item.author.name}
					</p>
					<p
						style={{
							padding: 0,
							margin: 0,
							fontSize: 11,
							fontWeight: "lighter",
						}}
					>
						{item.author.username}
					</p>
				</div>
				<div style={{ flex: 0.1, justifyContent: "center" }}>
					<p style={{ fontSize: 13, fontWeight: "lighter", color: "#8F92A1" }}>
						{formatTime(item.timeStamp)}
					</p>
				</div>
			</div>
			<div style={{ flex: 0.8 }}>
				{item.image ? (
					<img
						src={item.image}
						style={{ width: 300, height: 200, borderRadius: 10 }}
					/>
				) : null}
				<p style={{ textAlign: "center", fontWeight: "bold", padding: 5 }}>
					{item.textContent}
				</p>
			</div>
			<div
				style={{
					flex: 0.1,
					display: "flex",
					paddingTop: 10,
					justifyContent: "space-between",
				}}
			>
				{alreadyLiked(item.id) ? (
					<button
						onClick={unLikePost}
						style={{ backgroundColor: "#fff", border: 0 }}
					>
						<Icon name='heart' color='red' size={26} />
					</button>
				) : (
					<button
						onClick={likePost}
						style={{ backgroundColor: "#fff", border: 0 }}
					>
						<Icon name='heart outline' color='black' size={26} />
					</button>
				)}
				<button
					onClick={() => deletePostAsync(item.id)}
					style={{ backgroundColor: "#fff", border: 0 }}
				>
					<Icon name='trash' color='red' size={26} />
				</button>
			</div>
		</div>
	)
}

const NewPost = () => {
	const [posts, setPosts] = useState(null)

	const fetchAuthor = async (id) => {
		const userRef = firebase.firestore().collection("users").doc(id)

		const user = await userRef.get()

		return { id: user.id, ...user.data() }
	}

	const fetchPosts = () => {
		const postsRef = firebase.firestore().collection("posts")
		const query = postsRef.where("image", "!=", null)

		query.onSnapshot(async (snapshot) => {
			const arr = []

			for (let i = 0; i < snapshot.docs.length; i++) {
				const doc = snapshot.docs[i]
				const author = await fetchAuthor(doc.data().author)
				const post = { id: doc.id, ...doc.data(), author }
				arr.push(post)
			}
			setPosts(arr)
		})
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	return (
		<div className='db-container'>
			<div className='db-cards'>
				<div className='borderedContainer'>
					<h1 className='header'>Manage Posts</h1>
					<ul>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(3, 1fr)",
							}}
						>
							{posts ? posts.map((post) => <RenderPost item={post} />) : null}
						</div>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default NewPost
