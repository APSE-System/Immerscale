package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class WorkerViewFilter extends RequestFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Filtering Worker View Request");

        // Get Cookie from Request
        List<Cookie> cookies  = Arrays.stream(((HttpServletRequest) servletRequest).getCookies()).toList();

        // 1. Verification Step: Check if Worker Cookie is present
        if(cookies.stream().noneMatch(cookie -> cookie.getName().equals("BenisWorkerCookie"))){
            throw new ServletException("Unauthorized");
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
