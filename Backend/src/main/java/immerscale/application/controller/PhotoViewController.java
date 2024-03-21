package immerscale.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {

    // Wire the Image Repository


    // TODO: Remove this test endpoint when no longer needed
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Success");
    }


    // Method receives a base64 encoded image and saves it to the database
    // The image is in the body as a json object with the key "photo"
    @PostMapping(value = "/photo", consumes = "application/json")
    public ResponseEntity<String> postPhoto(@RequestBody String photo){



        return ResponseEntity.ok("Success");
    }

}
