package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;

import java.io.IOException;

public class PhotoViewFilter extends RequestFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        System.out.println("Filtering PhotoView Request");

        filterChain.doFilter(servletRequest, servletResponse);

    }

    @Override
    protected Log getLogger() {
        return null;
    }
}
