import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Users() {
    const [userId, setUserId] = useState('u_1');
    const { data, isPending, isSuccess } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => {return fetch(`https://ui.dev/api/courses/react-query/users/${userId}`)
            .then(res => res.json())}
    });
    console.log(data);
    console.log(userId)

    return (
        <>
        <nav>
            <ol>
                <button onClick={()=> setUserId('u_1')}>user 1</button>
                <button onClick={()=> setUserId('u_2')}>user 2</button>
                <button onClick={()=> setUserId('u_3')}>user 3</button>
                <button onClick={()=> setUserId('u_4')}>user 4</button>
            </ol>
        </nav>
   
            <h1>Users</h1>
            {isPending && <p>Loading...</p>}
            {isSuccess && (
                <div>
                    <h2>{data.name}</h2>
                    <img src={data.profilePictureUrl} alt="" />
                    
                </div>
            )}
        </>
    );
}