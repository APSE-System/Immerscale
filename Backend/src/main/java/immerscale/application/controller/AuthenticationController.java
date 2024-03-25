package immerscale.application.controller;

import immerscale.application.entities.AccessToken;
import immerscale.application.repositories.AccessTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


// The controller is used for authentication
// Unauthorized Requests wont be filtered
@RestController
@RequestMapping( value = "/auth")
public class AuthenticationController {


    // Method issues a cookie to the enduser, when a valid token is passed
    // This cookie allows access to all endpoints from the PhotoViewController
    @Autowired
    AccessTokenRepository accessTokenRepository;
    @GetMapping("/cookie/enduser")
    public ResponseEntity<String> verifyEnduser(@RequestParam(value = "tokend_id") String tokend_id, HttpServletResponse response){

        Optional<AccessToken> accessToken = accessTokenRepository.findById(tokend_id);

        // Token if present in database -> issue cookie
        if(accessToken.isPresent()){
            Cookie cookie = new Cookie("BenisUserCookie", tokend_id);
            cookie.setPath("/photoView");
            response.addCookie(cookie);
            return ResponseEntity.ok("Success");
        }

        return new ResponseEntity<String>("Unauthorized",HttpStatus.UNAUTHORIZED);

    }

    // Method issues a cookie to the worker, when a valid token is passed
    // This cookie allows access to all endpoint from the WorkerViewController
    // TODO: Verification Logic must be added, currently every caller gets a valid cookie
    @GetMapping("/cookie/worker")
    public ResponseEntity<String> verifyWorker(@RequestParam(value = "token_id") String token_id, HttpServletResponse response){

         if(true){
            Cookie cookie = new Cookie("BenisWorkerCookie", "123456789");
            cookie.setPath("/workerView/");
            response.addCookie(cookie);
            return ResponseEntity.ok("Success");
        }

        return new ResponseEntity<String>("Unauthorized",HttpStatus.UNAUTHORIZED);

    }
}
