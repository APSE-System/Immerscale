package immerscale.application.controller;


import immerscale.application.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/workerBackend")
public class WorkerPageController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/project")
    @ResponseBody
    //TODO: Make ID auto increment/calculated on the backend
    public ResponseEntity<String> postProject(@RequestParam(name = "id") Integer id, @RequestParam(name = "name") String name, @RequestParam(name = "mail") String worker_email){
        projectRepository.saveProject(id, name, worker_email);
        return ResponseEntity.ok("Success");
    }
}
