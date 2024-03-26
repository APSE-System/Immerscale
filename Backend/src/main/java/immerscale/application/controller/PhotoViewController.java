package immerscale.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    // Method receives a base64 encoded image and saves it to the database
    // The image is in the body as a json object with the key "photo"
    @PostMapping(value = "/photo", consumes = "application/json")
    public ResponseEntity<String> postPhoto(@RequestBody String photo){

        // TODO: Remove this test code when no longer needed
        long imageCount = imageRepository.count();

        // extract the image string from the json object
        // Use Jackson ObjectMapper to parse the json
        String photoString = "";
        ObjectMapper mapper = new ObjectMapper();
        try {
            photoString = mapper.readTree(photo).get("photo").asText();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid JSON");
        }


        // Call the SQL query in the ImageRepository to save the image
        // TODO: The token and the project id are hardcoded for now
        imageRepository.saveImage( "test", 1, photoString);

        return ResponseEntity.ok("Success");
    }

}
