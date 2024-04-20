package com.commun.hive.communhive.configs;

import com.commun.hive.communhive.utils.JWTConfig;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Component
@WebFilter(urlPatterns = {"/*"})
public class Authentication implements Filter {
    private static final List<Pattern> ALLOWED_PATH_PATTERNS = new ArrayList<>();

    @Autowired
    private JWTConfig jwt;

    static {
        // Add regular expressions for allowed paths
        ALLOWED_PATH_PATTERNS.add(Pattern.compile("/api/v1/.*")); // Example regex
        // Add more allowed paths as needed
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code, if any
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String path = request.getRequestURI().substring(request.getContextPath().length()).replaceAll("/+$", "");

        // Add CORS headers to all responses
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "authorization, content-type");

        // Check if the request method is OPTIONS
        if (request.getMethod().equals("OPTIONS")) {
            // For OPTIONS requests, return success status and exit the method
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        boolean allowedPath = isAllowedPath(path);

        if (allowedPath) {
            // Check if the request contains the Authorization header
            String authHeader = request.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                // Extract the JWT token from the Authorization header
                String token = authHeader.substring(7);

                // Validate the JWT token
                if (jwt.validate(token)) {
                    Map<String, Object> details = jwt.getUserDetails(token);
                    String type = (String) details.get("user_type");
                    request.setAttribute("type", type);
                    filterChain.doFilter(request, response);
                    return; // Exit the method after proceeding
                }
            }
            // If the token is invalid or missing, return unauthorized status
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // Set content type to JSON
            response.setContentType("application/json");
            // Write JSON body to response output stream
            String jsonBody = "{\"error\": \"Unauthorized\",\"message\": \"Valid details are required!\"}";
            response.getWriter().write(jsonBody);
            return;
        }

        // For non-protected paths, proceed with the filter chain
        filterChain.doFilter(request, response);
    }

    private boolean isAllowedPath(String path) {
        // Check if the request path matches any of the allowed path patterns
        for (Pattern pattern : ALLOWED_PATH_PATTERNS) {
            if (pattern.matcher(path).matches()) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void destroy() {
        // Cleanup code, if any
    }
}
