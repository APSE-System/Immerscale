package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;

import java.io.IOException;

public class WorkerViewFilter extends RequestFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("Filtering Worker View Request");

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    protected Log getLogger() {
        return null;
    }
}
