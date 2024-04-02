package immerscale.application.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import org.apache.catalina.filters.RequestFilter;
import org.apache.juli.logging.Log;

import java.io.IOException;


// Abstract class for filtering requests based on cookies
public abstract class CookieFilter extends RequestFilter {
    public abstract void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException;
    protected abstract Log getLogger();

    public Cookie getCookie(ServletRequest servletRequest, String cookieName) throws NullPointerException{
        Cookie[] cookies = ((jakarta.servlet.http.HttpServletRequest) servletRequest).getCookies();
        if (cookies == null) {
            throw new NullPointerException("No Cookies found");
        }
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(cookieName)) {
                return cookie;
            }
        }
        throw new NullPointerException("No Cookies found");
    }
}
