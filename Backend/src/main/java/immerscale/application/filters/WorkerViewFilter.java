package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.juli.logging.Log;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class WorkerViewFilter extends CookieFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        // 1. Verification Step: Check if Worker Cookie is present
        Cookie workerCookie;
        try {
            workerCookie = getCookie(servletRequest, "WorkerCookie");
        } catch (NullPointerException e) {
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // TODO: 2. Verification Step: Check if Worker Cookie is valid currently every caller gets a valid cookie
        String worker_email = workerCookie.getValue();

        // If all verifications are passed, continue with the request
        servletRequest.setAttribute("worker_email", worker_email);
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    protected Log getLogger() {
        return null;
    }
}
