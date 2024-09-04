import React, { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
};

type Post = {
  userId: number;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users and posts
    const fetchUsersAndPosts = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts'),
        ]);

        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();

        setUsers(usersData);
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUsersAndPosts();
  }, []);

  const getPostCount = (userId: number) => {
    return posts.filter(post => post.userId === userId).length;
  };

  if (loading) {
    return <div>Waiting to load...</div>;
  }

  return (
    <div>
      <h2>User Fetched successfully</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - Posts: {getPostCount(user.id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
