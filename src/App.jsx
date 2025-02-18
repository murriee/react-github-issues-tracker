import { Route, Routes, Link, useMatch } from "react-router-dom";
import Issues from "./pages/Issues";
import Issue from "./pages/Issue";
import AddIssue from "./pages/AddIssue";
import Users from "./components/Users";
import IssueLabelFilter from "./components/DependentQueries";
import ExampleDependentQueries from "./components/ExampleDependentQueries";
function App() {
  const isRootPath = useMatch({ path: "/", end: true });
  return (
    <div className="App">
    
      {!isRootPath ? (
        <Link to="/">Back to Issues List</Link>
      ) : (
        <span>&nbsp;</span>
      )}
      <h1>Issue Tracker</h1>
   
     
      <Routes>
        <Route path="/" element={<Issues />} />
        <Route path="/add" element={ <Users/>} />
        <Route path="/issue/:number" element={<Issue />} />
        <Route path="/dependentQueries" element={<IssueLabelFilter owner={'mojombo'} />} />
        <Route path="/dependentQueries/example" element={<ExampleDependentQueries />} />
      </Routes>
    </div>
  );
}

export default App;
