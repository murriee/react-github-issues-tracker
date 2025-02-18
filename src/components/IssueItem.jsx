import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import { useUserData } from "../helpers/useUserData";
import { Label } from "./Label";

export default function IssueItem({
  issueKey,
  title,
  number,
  assignee,
  createdby,
  createdDate,
  labels,
  issueStatus,
  commentCount,
}) {
  const assigneeUser = useUserData(assignee); // queryKey:['users', userId(i.e assignee)],queryFn: () => { return fetch(`/api/users/${userId}`)
  // console.log("assigneeuser", assigneeUser);
  const createdByUser = useUserData(createdby);
  // console.log("createdbyuser", createdByUser);

  return (
    <li key={issueKey}>
      {issueStatus === "done" || issueStatus === "cancelled" ? (
        <GoIssueClosed style={{ color: "red" }} />
      ) : (
        <GoIssueOpened style={{ color: "green" }} />
      )}
      <div className="issue-context">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>{" "}
          {/* =>  App.jsx1️⃣  <Route path="/issue/:number" element={<Issue />} />    => pages/Issue.jsx2️⃣  return <IssueDetails />;   => components/IssueDetails.jsx3️⃣  const { number } = useParams();   */}
          {/* This snippet iterates over the labels array with map, returning a <span> for each label. Each span gets a key attribute (using the label) and a className of "label red". Inside the span, the label value is displayed as text. */}
       
            {labels.map((label, index) => (

              <Label key={index} label={label} />
            ))}
          
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : null}
        </small>
      </div>
      {assignee ? (
        <img
          src={
            assigneeUser.isSuccess ? assigneeUser.data.profilePictureUrl : null
          }
          className="assigned-to"
          alt="avatar"
        />
      ) : null}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment />
            {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
