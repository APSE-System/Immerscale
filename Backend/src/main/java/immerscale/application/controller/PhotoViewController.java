package immerscale.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {


    // TODO: Remove this test endpoint when no longer needed
    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Success");
    }

}
