import { useQuery } from "@tanstack/react-query"

export function useUserData(userId) { 
    const usersData = useQuery({
        queryKey:['users', userId],
        queryFn: () => { return fetch(`/api/users/${userId}`) //  fetches a new user everytime it is called from "IssueList.jsx" => const assigneeUser = UserData(assignee)
        .then(res => res.json())
           
        },
        retry: false,
    });
    return usersData;
}