import { useQuery } from "@tanstack/react-query";
import { data } from "react-router-dom";
import { useState } from "react";

export default function ExampleDependentQueries() {
    const [issuesData, setIssuesData] = useState(null);
    const labelsQuery = useQuery({
        queryKey: ["labels"],
        queryFn: async () =>  { 
        const response= await fetch("https://ui.dev/api/courses/react-query/labels")
           if(!response.ok){
               throw new Error("Network response was not ok")
           }
           return response.json()
        }
    });
    console.log('exmaple.jsx',labelsQuery.data);

    const handleLabelClick = async (label) => {
        console.log(label)
        const response = await fetch(`https://ui.dev/api/courses/react-query/issues?labels[]=${label}`)
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setIssuesData(data);
    }
    

    return(
        <>
        <h1>LABELS</h1>
        {labelsQuery.isPending ? (<p>LOADING ..</p>) 
        :labelsQuery.isError ? (<p>ERROR: {labelsQuery.error.message}</p>)
        :( <ul >
            {labelsQuery.data.map((label) => (
                <button onClick={()=> handleLabelClick(label.name)}  key={label.id} className={`label ${label.color}`}>{label.name}</button>
     
            ))}
        </ul>
        )}
        <h2>ISSUES</h2>
        {issuesData ? (
            <ul>
                {issuesData.map((issue) => (
                    <li key={issue.id}>{issue.title}</li>
                ))}
            </ul>
        ):null}
        </>
    )
}