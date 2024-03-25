package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;

public class WorkerViewFilter extends RequestFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Filtering Worker View Request");

        List<Cookie> cookies;

        // Get Cookie from Request
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
        // 1. Verification Step: Check if Worker Cookie is present
        if(cookies.stream().noneMatch(cookie -> cookie.getName().equals("BenisWorkerCookie"))){
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // TODO: 2. Verification Step: Check if Worker Cookie is valid

        // If all verifications are passed, continue with the request
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    protected Log getLogger() {
        return null;
    }
}
