package immerscale.application.controller;

import immerscale.application.entities.Worker;
import immerscale.application.repositories.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {

    @Autowired
    private WorkerRepository workerRepository;

    @GetMapping("/test")
    public ResponseEntity<Iterable<Worker>> test(){
        return ResponseEntity.ok(workerRepository.findAll());
    }

    @GetMapping(value = "/worker/{email}")
    public ResponseEntity<String> postWorker(@PathVariable(name = "email") String email){

        Worker worker = new Worker();
        worker.email = email;

        workerRepository.save(worker);

        return ResponseEntity.ok("Success");
    }
}
