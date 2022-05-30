import { useState, useEffect } from "react";
import apiService from "../services/api.service";

function EditProjectPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const projectId = props.match.params.id;
  
  
  useEffect(() => {
    
    // Send the token through the request "Authorization" Headers 
    apiService.getProjectById(projectId)
      .then((data) => {
        const oneProject = data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
    
  }, [projectId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedProject = { title, description };
  
    apiService.updateProjectById(projectId, updatedProject)
      .then((data) => {
        props.history.push(`/projects/${projectId}`)
      });
  };
  
  
  const deleteProject = () => {  
    apiService.deleteProjectById(projectId)
      .then(() => props.history.push("/projects"))
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;