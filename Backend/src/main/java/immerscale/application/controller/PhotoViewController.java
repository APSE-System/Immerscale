package immerscale.application.controller;

import immerscale.application.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {

    // Wire the Image Repository
    @Autowired
    private ImageRepository imageRepository;


    // TODO: Remove this test endpoint when no longer needed
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Success");
    }


    // Method receives a base64 encoded image and saves it to the database
    // The image is in the body as a json object with the key "photo"
    @PostMapping(value = "/photo", consumes = "application/json")
    public ResponseEntity<String> postPhoto(@RequestBody String photo){

        // TODO: Remove this test code when no longer needed
        long imageCount = imageRepository.count();

        // Call the SQL query in the ImageRepository to save the image
        // TODO: The token and the project id are hardcoded for now
        imageRepository.saveImage("test", (int) imageCount, photo);

        return ResponseEntity.ok("Success");
    }

}
