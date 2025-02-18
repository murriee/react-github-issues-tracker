
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import IssueItem from "./IssueItem";

import Labels from "./Labels";

import { ComboboxDemo } from "./ui/combobox";

export default function IssuesList() {
  const [issueDetails, setIssueDetails] = useState(null);
  const { data, isPending } = useQuery({
    queryKey: ["issues"],
    queryFn: () => fetch("/api/issues").then((res) => res.json()),
  });
  console.log('IssuesList.jsx',data);
   const statuses = data?.map(item => item?.status).filter(status => status !== undefined && status !== null);

  // console.log('statuses',statuses);

  useEffect(() => {
    if (data) {
      setIssueDetails(data);
    }
    console.log("useEffect was called",data);
  }, [data]);

  return (
   
    <div>
      <h2>Issues List</h2>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
        <ul className="issues-list">
          {" "}
          {issueDetails &&
            issueDetails.map((issue) => (
              <IssueItem
                key={issue.id}
                issueKey={issue.id}
                title={issue.title}
                number={issue.number}
                assignee={issue.assignee}
                createdby={issue.createdBy}
                createdDate={issue.createdDate}
                labels={issue.labels}
                issueStatus={issue.status}
                commentCount={issue.comments.length}
              />
            ))}
        </ul>
       

        
          </>
      )}
     
      
      {isPending ? <p>Loading...</p>:
      <aside>
      <ComboboxDemo status={[...new Set(statuses)]} setIssueDetails={setIssueDetails} issueDetails={issueDetails} data={data} />
        <Labels setIssueDetails={setIssueDetails} />
      </aside>
    }
    </div>
  );
}
