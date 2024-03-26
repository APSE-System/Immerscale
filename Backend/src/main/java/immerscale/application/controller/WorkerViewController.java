package immerscale.application.controller;

import immerscale.application.entities.AccessToken;
import immerscale.application.entities.Image;
import immerscale.application.entities.Project;
import immerscale.application.repositories.ProjectRepository;
import immerscale.application.repositories.AccessTokenRepository;
import immerscale.application.repositories.ImageRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Random;


@RestController
@RequestMapping("/workerView")
public class WorkerViewController {

    // Wire the Project Repository
    @Autowired
    private ProjectRepository projectRepository;

    // Wire the Image Repository
    @Autowired
    private ImageRepository imageRepository;

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

    // Endpoint for generating a new token for a project
    @PostMapping("/token")
    public ResponseEntity<String> generateToken(@RequestParam(name = "name") String name, @RequestParam(name = "project_id") Integer projectId, HttpServletRequest request){

        // Verify that the project 1. exists and 2. belongs to the worker
        String worker_email = request.getAttribute("worker_email").toString();
        if(!projectRepository.containsProject(projectId, worker_email))
            return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);

        // Generate a new token_id
        String token_id = "";
        do {
            // TODO: Check if 16 characters are enough
           token_id = generateRandomAlphaNumericString(16);
        } while (accessTokenRepository.findById(token_id).isPresent());

        // Add the token to the database
        // TODO: Add a time limit to the token
        AccessToken accessToken = new AccessToken();
        accessToken.project_id = projectId;
        accessToken.url_token = token_id;
        accessToken.name = name;
        accessTokenRepository.save(accessToken);

        return new ResponseEntity<String>("Token generated", HttpStatus.OK);
    }

    public String generateRandomAlphaNumericString(int length) {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(length)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

}
