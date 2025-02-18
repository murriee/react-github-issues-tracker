import { useQuery } from "@tanstack/react-query";

export default function Labels({setIssueDetails}) {
    const { data, isPending,isSuccess,isError,error } = useQuery({
        queryKey:['labels'],
        queryFn: async () => { 
         const  response = await fetch("https://ui.dev/api/courses/react-query/labels")
          if(!response.ok){
              throw new Error("Network response was not ok")
          }
          return response.json()
        }
    });
    // console.log('Labels.jsx',data);


    const handleLabelClick = async (label) => {
      console.log(label)
      const response = await fetch(`https://ui.dev/api/courses/react-query/issues?labels[]=${label}`)
      if(!response.ok){
          throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setIssueDetails(data);
  }


  return (
    <div>
      <h1>Labels</h1>
        {isPending && <p>Loading...</p> }
        {isError && <p>Error: {error.message}</p>} 
        {isSuccess &&
       data.map((label) => (
                    
        <button onClick={()=> handleLabelClick(label.name)}  key={label.id} className={`label ${label.color}`}>{label.name}</button>
               
            ))
    
    }
    </div>
  );
}