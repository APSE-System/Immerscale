package immerscale.application.controller;

import immerscale.application.entities.AccessToken;
import immerscale.application.helper.AESEncrypter;
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
    public ResponseEntity<String> verifyEnduser(@RequestParam(value = "token_id") String token_id, HttpServletResponse response){

        Optional<AccessToken> accessToken = accessTokenRepository.findById(token_id);

        // Token if present in database -> issue cookie
        if(accessToken.isPresent()){
            try {
                Cookie cookie = new Cookie("EnduserCookie", AESEncrypter.getInstance().encrypt(token_id));
                cookie.setPath("/");
                cookie.setAttribute("SameSite", "None");

                response.addCookie(cookie);
                return ResponseEntity.ok("Success");
            }
            catch (Exception e){
                return new ResponseEntity<String>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<String>("Unauthorized",HttpStatus.UNAUTHORIZED);

    }

    // Method issues a cookie to the worker, when a valid token is passed
    // This cookie allows access to all endpoint from the WorkerViewController
    // TODO: Verification Logic must be added, currently every caller gets a valid cookie
    @GetMapping("/cookie/worker")
    public ResponseEntity<String> verifyWorker(@RequestParam(value = "credential") String credential, HttpServletResponse response){

         if(true){
            Cookie cookie = new Cookie("WorkerCookie", "exampleMail@mail.de");
            cookie.setPath("/");
            cookie.setAttribute("SameSite", "None");

            response.addCookie(cookie);
            return ResponseEntity.ok("Success");
        }

        return new ResponseEntity<String>("Unauthorized",HttpStatus.UNAUTHORIZED);

    }
}
