package immerscale.application.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import immerscale.application.entities.AccessToken;
import immerscale.application.repositories.AccessTokenRepository;
import immerscale.application.repositories.ImageRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/photoView")
public class PhotoViewController {

    // Wire the Image Repository
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private AccessTokenRepository accessTokenRepository;

    // Method receives a base64 encoded image and saves it to the database
    // The image is in the body as a json object with the key "photo"
    @PostMapping(value = "/photo", consumes = "application/json")
    public ResponseEntity<String> postPhoto(@RequestBody String photo, HttpServletRequest request){

        // extract the image string from the json object
        // Use Jackson ObjectMapper to parse the json
        String photoString = "";
        ObjectMapper mapper = new ObjectMapper();
        try {
            photoString = mapper.readTree(photo).get("photo").asText();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid JSON");
        }

        Optional<AccessToken> accessTokenOptional = accessTokenRepository.findById(request.getAttribute("token_id").toString());
        if(!accessTokenOptional.isPresent())
            return ResponseEntity.badRequest().body("Invalid Token");
        AccessToken accessToken = accessTokenOptional.get();

        // Call the SQL query in the ImageRepository to save the image
        imageRepository.saveImage(accessToken.url_token, accessToken.project_id, photoString);

        return ResponseEntity.ok("Success");
    }

}
