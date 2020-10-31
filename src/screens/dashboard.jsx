import React, { useEffect, useState } from "react"
import DashBoardCard from "../components/dashboardCard"
import "../styles/main.css"
import firebase from "firebase"
import Users from "../functions/users"
import Posts from "../functions/posts"

const Dashboard = () => {
	const [activeUsers, setActiveUsers] = useState(0)
	const [totalPosts, setTotalPosts] = useState(0)
	const [bannedUsers, setBannedUsers] = useState(0)

	const fetchUsers = async () => {
		const { users } = await Users.fetchAllUsers()
		setActiveUsers(users.length)
	}

	const fetchPosts = async () => {
		const { posts } = await Posts.fetchAllPosts()
		setTotalPosts(posts.length)
	}

	const fetchBannedUsers = async () => {
		const { users } = await Users.fetchBannedUsers()
		setBannedUsers(users.length)
	}

	useEffect(() => {
		;(() => {
			fetchUsers()
			fetchPosts()
			fetchBannedUsers()
		})()
	})

	return (
		<div className='db-container'>
			<div className='db-cards'>
				<DashBoardCard title='Active Users' value={activeUsers} />
				<DashBoardCard title='Total Posts' value={totalPosts} />
				<DashBoardCard title='Banned Users' value={bannedUsers} />
			</div>
		</div>
	)
}

export default Dashboard
