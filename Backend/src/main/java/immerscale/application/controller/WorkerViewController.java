package immerscale.application.controller;

import immerscale.application.entities.AccessToken;
import immerscale.application.entities.Image;
import immerscale.application.entities.Project;
import immerscale.application.repositories.AccessTokenRepository;
import immerscale.application.repositories.ProjectRepository;
import immerscale.application.repositories.ImageRepository;
import jakarta.servlet.http.HttpServletRequest;
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

    // Wire the AccessToken Repository
    @Autowired
    private AccessTokenRepository accessTokenRepository;

    // Method returns all projects
    // TODO: Only return the projects belonging to a specific worker
    @GetMapping(value = "/projects")
    public ResponseEntity<Iterable<Project>> getProjects(HttpServletRequest request){
        String worker_email = request.getAttribute("worker_email").toString();
        return new ResponseEntity<Iterable<Project>>(projectRepository.getAllProjects(worker_email), HttpStatus.OK);
    }


    // Method receives a project name and a worker email and saves it to the database
    @PostMapping("/project")
    @ResponseBody
    public ResponseEntity<String> postProject(@RequestParam(name = "name") String name, HttpServletRequest request){
        long projectCount = projectRepository.count();
        projectRepository.saveProject( name, request.getAttribute("worker_email").toString());

        return ResponseEntity.ok("Success");
    }

    // This endpoints returns all the images which belong to the given project ID
    @GetMapping("/images")
    public ResponseEntity<Iterable<Image>> getImages(@RequestParam(name = "id") Integer projectId){
        return new ResponseEntity<Iterable<Image>>(imageRepository.getImages(projectId), HttpStatus.OK);
    }

    // This endpoint will only return one image
    // The index will return the nth element from the project
    @GetMapping("/image")
    public ResponseEntity<Image> getImage(@RequestParam(name = "id") Integer projectId, @RequestParam(name = "index") Integer index){
        Image image = imageRepository.getImage(projectId, index);

        if(image == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(image, HttpStatus.OK);
    }

    // Returns all the links which belong to the given project ID
    @GetMapping("/tokens")
    public ResponseEntity<Iterable<AccessToken>> getAccessTokens(@RequestParam(name = "id") Integer projectId){
        return new ResponseEntity<Iterable<AccessToken>>(accessTokenRepository.getAccessTokens(projectId), HttpStatus.OK);
    }
}
