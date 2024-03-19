package immerscale.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Success");
    }

    @GetMapping(value = "/worker/{email}")
    public ResponseEntity<String> postWorker(@PathVariable(name = "email") String email){;

        return ResponseEntity.ok("Success");
    }
}
