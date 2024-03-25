package immerscale.application.controller;

import immerscale.application.entities.AccessToken;
import immerscale.application.entities.Image;
import immerscale.application.entities.Project;
import immerscale.application.repositories.ProjectRepository;
import immerscale.application.repositories.ImageRepository;
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

    // Wire the Image Repository
    @Autowired
    private ImageRepository imageRepository;



    // Method returns all projects
    // TODO: Only return the projects belonging to a specific worker
    @GetMapping(value = "/projects")
    public ResponseEntity<Iterable<Project>> getProjects(){
        return new ResponseEntity<Iterable<Project>>(projectRepository.getAllProjects(), HttpStatus.OK);
    }

    @PostMapping("/project")
    @ResponseBody
    //TODO: Make ID auto increment/calculated on the backend
    public ResponseEntity<String> postProject(@RequestParam(name = "name") String name, @RequestParam(name = "mail") String worker_email){
        long projectCount = projectRepository.count();
        //auto incrementing the project id for now TODO: change this
        projectRepository.saveProject((int)projectCount, name, worker_email);
        return ResponseEntity.ok("Success");
    }

    // This endpoints returns all the images which belong to the given project ID
    @GetMapping("/images")
    public ResponseEntity<Iterable<Image>> getImages(@RequestParam(name = "id") Integer projectId){
        return new ResponseEntity<Iterable<Image>>(imageRepository.getImages(projectId), HttpStatus.OK);
    }

    // Returns all the links which belong to the given project ID
    @GetMapping("/tokens")
    public ResponseEntity<Iterable<AccessToken>> getAccessTokens(@RequestParam(name = "id") Integer projectId){
        return new ResponseEntity<Iterable<AccessToken>>(projectRepository.getAccessTokens(projectId), HttpStatus.OK);
    }

}
