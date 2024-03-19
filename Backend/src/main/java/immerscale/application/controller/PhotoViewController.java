package immerscale.application.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/photoView")
public class PhotoViewController {

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok("Success");
    }
}
