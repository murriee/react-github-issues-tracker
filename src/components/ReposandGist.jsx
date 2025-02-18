

//-------------------PARALLEL QUERIES-------------------  


import { useQuery } from "@tanstack/react-query";
import { useQueries } from "@tanstack/react-query";

/* In this case both queries have seperate loading states and error states.
   The data is also displayed seperately.
*/

const ReposAndGists = ({ username }) => {
// //   console.log(username);
//   const reposQuery = useQuery({
//     queryKey: ["repos", username],
//     queryFn: () => {
//       return fetch(`https://api.github.com/users/${username}/repos`).then(
//         (res) => res.json()
//       );
//     },
//   });
//   const gistsQuery = useQuery({
//     queryKey: ["gists", username],
//     queryFn:  async () => {
//       const res = await fetch(`https://api.github.com/users/${username}/gists`)
//       return res.json();
//     }
    
//   });


  /*
    We can also use the useQueries hook to fetch multiple queries at once.We pass an array 
    of query objects to the useQueries hook.
  */

  const [reposQuery, gistsQuery] = useQueries({
    queries: [
    {
      queryKey: ["repos", username],
      queryFn: async () => {
       const res = await fetch(`https://api.github.com/users/${username}/repos`)
          return res.json()
      },
    },
    {
      queryKey: ["gists", username],
      queryFn: async () => {
        const res =await fetch(`https://api.github.com/users/${username}/gists`)
        return res.json()
      },
    },
  ],
});
  console.log(gistsQuery.data);
  
  return(
    <>
    <div>
        <h2>Repos</h2>
        {reposQuery.isPending && <p>Loading repos ....</p>}
        {reposQuery.isError &&
             <p>
                Error loading: {reposQuery.error.message}
            </p>}
      
        {reposQuery.data && (
                <ul>
                    {reposQuery.data.map((repo)=>(
                        <li key={repo.id}>{repo.name}</li>
                    ))}
                </ul>
            )
        }
        <hr/>

        {/* <h2>Gists</h2>
        {gistsQuery.isPending && <p>Loading gists...</p>}
        {gistsQuery.isError && 
            <p>
            Error Loading Gists:{gistsQuery.error.message}
            </p>}
            {gistsQuery.data  && (
                <ul>
                    {gistsQuery.data.map((gist)=>(
                        <li key={gist.id}>{gist.id}</li>
                    ))}
                </ul>
            )} */}

    </div>
    </>
  )

};

export default ReposAndGists;



 
