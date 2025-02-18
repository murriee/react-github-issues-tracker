/* ------------------------DEPENDENT QUERIES------------------------
Dependent (or serial) queries depend on previous ones to finish before 
they can execute.To achieve this, it's as easy as using the enabled 
option to tell a query when it is ready to run
*/

import { useQuery } from "@tanstack/react-query";

const IssueLabelFilter = ( {owner} ) => {
 
  const labelsQuery = useQuery({
    queryKey:[owner], 
    queryFn :() => (
    fetch(`https://api.github.com/users/${owner}`)
    .then((res) => res.json())
    ),


});
console.log('labels',labelsQuery.data)
const loginID = labelsQuery.data?.login;   // The query will not execute if you write loginID = null when enabled is true even if loginID is explicitly set to mojombo in the secondQuery
// const loginID= null;

  const issuesQuery = useQuery({
    queryKey:[loginID], 
    queryFn:  async () => {
      const res =  await fetch(`https://api.github.com/users/${loginID}`);
      // Throw an error if the HTTP response is not ok
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
  enabled: !!loginID,  // The query will not execute until the loginID exists

 
});
console.log(issuesQuery.data)

  return (
    <div>
      <h2>Labels</h2>
      {labelsQuery.isPending ? (
        <p>Loading LABELS...</p>
      ) : (
        // <ul>
        //   {labelsQuery.data.map((user) => 
        //     <li key={user.id}>{user.name}</li>
        //   )}
        // </ul>
        <p>User Login is: {loginID}</p>
      )}
      <hr />

      <h2>Issues</h2>
      {issuesQuery.isPending && issuesQuery.fetchStatus ==='fetching' 
      ? 
        (<p>Loading</p>) 
      : 
      issuesQuery.isError ? (<p>{issuesQuery.error.message}</p>) 
      :
       <p>{JSON.stringify(issuesQuery.data) }</p>
      }
    </div>
  );

};


export default IssueLabelFilter;