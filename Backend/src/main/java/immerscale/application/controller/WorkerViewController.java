package immerscale.application.controller;

import immerscale.application.entities.Project;
import immerscale.application.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/workerView")
public class WorkerViewController {

    // Wire the Project Repository
    @Autowired
    private ProjectRepository projectRepository;


    // Method returns all projects
    // TODO: Only return the projects belonging to a specific worker
    @GetMapping(value = "/projects")
    public ResponseEntity<Iterable<Project>> getProjects(){
        return new ResponseEntity<Iterable<Project>>(projectRepository.getAllProjects(), HttpStatus.OK);
    }

    @PostMapping("/project")
    @ResponseBody
    //TODO: Make ID auto increment/calculated on the backend
    public ResponseEntity<String> postProject(@RequestParam(name = "id") Integer id, @RequestParam(name = "name") String name, @RequestParam(name = "mail") String worker_email){
        projectRepository.saveProject(id, name, worker_email);
        return ResponseEntity.ok("Success");
    }

}
