package immerscale.application.filters;

import immerscale.application.helper.AESEncrypter;
import immerscale.application.repositories.AccessTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;


// Filter PhotoView Requests
// Each Request must have an Enduser Cookie
@Component
public class PhotoViewFilter extends CookieFilter {

    @Autowired
    private AccessTokenRepository accessTokenRepository;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws ServletException, IOException {

        System.out.println("Filtering PhotoView Request");

        // 1. Verification Step: Check if Enduser Cookie is present
        Cookie userCookie;
        try {
            userCookie = getCookie(servletRequest, "EnduserCookie");
        } catch (NullPointerException e) {
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        System.out.println("made it this far");

        // 2. Verification Step: Check if Enduser Cookie is valid
        String token_id;
        try {
            token_id = AESEncrypter.getInstance().decrypt(userCookie.getValue());
        } catch (Exception e) {
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (!verifyEnduser(token_id)) {
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // If all verifications are passed, continue with the request and add the token_id to the request
        servletRequest.setAttribute("token_id", token_id);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    protected Log getLogger() {
        return null;
    }

    private boolean verifyEnduser(String token_id) {
        return accessTokenRepository.findById(token_id).isPresent();
    }

}
