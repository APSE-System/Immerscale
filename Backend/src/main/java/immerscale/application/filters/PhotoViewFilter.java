package immerscale.application.filters;

import immerscale.application.helper.AESEncrypter;
import immerscale.application.repositories.AccessTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;


// Filter PhotoView Requests
// Each Request must have an Enduser Cookie
public class PhotoViewFilter extends RequestFilter {

    @Autowired
    private AccessTokenRepository accessTokenRepository;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("Filtering PhotoView Request");

        List<Cookie> cookies;

        // Get Cookie from Request if there are any
        try{
            cookies  = Arrays.stream(((HttpServletRequest) servletRequest).getCookies()).toList();
        }
        catch (NullPointerException e){
            System.out.println("No Cookies found");
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        System.out.println("Cookies found");
        // 1. Verification Step: Check if Enduser Cookie is present
        if(cookies.stream().noneMatch(cookie -> cookie.getName().equals("UserCookie"))){
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 2. Verification Step: Check if Enduser in cookie is valid

        Cookie userCookie = cookies.stream().filter(cookie -> cookie.getName().equals("UserCookie")).findFirst().get();
        String token_id;
        try{
            token_id = AESEncrypter.getInstance().decrypt(userCookie.getValue());
        }
        catch (Exception e){
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if(!verifyEnduser(token_id)){
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

    private boolean verifyEnduser(String token_id){
        return accessTokenRepository.findById(token_id).isPresent();
    }

}
