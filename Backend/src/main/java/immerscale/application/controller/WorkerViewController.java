package immerscale.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import immerscale.application.entities.Project;
import immerscale.application.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/workerView")
public class WorkerViewController {

    // Wire the Project Repository
    @Autowired
    private ProjectRepository projectRepository;


    // Method returns all projects
    @GetMapping(value = "/projects")
    public ResponseEntity<Iterable<Object>> getProjects(){

       projectRepository.getAllProjects().forEach(o -> {
            System.out.println(0);
        });
        return new ResponseEntity<Iterable<Object>>(projectRepository.getAllProjects(), HttpStatus.OK);
    }

}
