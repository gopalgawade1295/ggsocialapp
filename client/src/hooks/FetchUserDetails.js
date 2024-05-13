import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const useFetchUserDetails = (id) => {
    const [user, setUser] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        picturePath: '',
        friends: [],
        viewedProfile: '',
        impressions: '',
        location: '',
        occupation: ''
    });

    const token = useSelector((store) => store.auth.token);

    const getUser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_SECRET_KEY}users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            });
            const data = await res?.data;
            console.log(data?.data)
            setUser({
                _id: data?.data?._id,
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                picturePath: data?.data?.picturePath,
                friends: data?.data?.friends,
                viewedProfile: data?.data?.viewedProfile,
                impressions: data?.data?.impressions,
                location: data?.data?.location,
                occupation: data?.data?.occupation
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        id !== "" && getUser();
    }, [id])

    return user
}

export default useFetchUserDetails
