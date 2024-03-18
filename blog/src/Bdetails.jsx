import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

 export const Bdetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/blogOne/${id}`);
                console.log(response.data);
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, [id]);

    console.log('ghf', blog);

    return (
        <>
            <section>
                <div className='details container'>
                    <h1>{blog.title}</h1>
                    <img src={`http://localhost:5000/uploads/${blog.image}`} alt="" />
                    <p style={{ marginTop: '30px' }}>{blog.content}</p>
                </div>
            </section>
        </>
    );
};


