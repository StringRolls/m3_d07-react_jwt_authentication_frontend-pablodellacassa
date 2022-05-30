import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import apiService from "../services/api.service";


function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const projectId = props.match.params.id;
  
  
  const getProject = () => {
    apiService.getProjectById(projectId)
      .then((data) => {
        const oneProject = data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getProject();
  }, [] );

  
  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      
      <AddTask refreshProject={getProject} projectId={projectId} />          

      { project && project.tasks.map((task) => <TaskCard key={task._id} {...task} /> )} 

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>
          
      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>
      
    </div>
  );
}

export default ProjectDetailsPage;