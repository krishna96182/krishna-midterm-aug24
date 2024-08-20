import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function MembersPage() {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        displayCategory();
    }, []);

    useEffect(() => {
        if (userId) {
            viewUserDetails(userId);
        }
    }, [userId]);

    function displayCategory() {
        const url = "http://localhost:3000/api/v1/users";
        axios.get(url)
            .then((response) => {
                setData(response.data.users);
            })
            .catch((error) => {
                alert("Please try again later.");
                console.error("Error fetching users:", error);
            });
    }

    function viewUserDetails(userId) {
        const url = `http://localhost:3000/api/v1/users/${userId}`;
        axios.get(url)
            .then((response) => {
                setSelectedUser(response.data.user);
            })
            .catch((error) => {
                alert("Unable to fetch user details.");
                console.error("Error fetching user details:", error);
            });
    }

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${userId}`);
            displayCategory();
            setSelectedUser(null);
            navigate('/show');
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewDetails = (userId) => {
        navigate(`/show/${userId}`);
    };

    return (
        <div className="container">
            <div className="user-list">
                <h2>Show Details</h2>
                {data.map((user) => (
                    <div className='user' key={user._id} onClick={() => handleViewDetails(user._id)}>
                        <p><b>Display Name:</b> {user.displayName}</p>
                        <p><b>Email:</b> {user.email}</p>
                        <p><b>Username:</b> {user.username}</p>
                    </div>
                ))}
            </div>
            <div className="user-details">
                {selectedUser && (
                    <div>
                        <h2>User Details</h2>
                        <p><b>Username:</b> {selectedUser.username}</p>
                        <p><b>Display Name:</b> {selectedUser.displayName}</p>
                        <p><b>Email:</b> {selectedUser.email}</p>
                        <p><b>Status:</b> {selectedUser.status ? 'True' : 'False'}</p>
                        <button onClick={() => handleDelete(selectedUser._id)}>Delete User</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MembersPage;
