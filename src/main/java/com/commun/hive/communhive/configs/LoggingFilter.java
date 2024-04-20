package com.commun.hive.communhive.configs;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Component
@WebFilter("/*")
public class LoggingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialization code, if any
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Record the start time
        long startTime = System.currentTimeMillis();

        String log = "Request Method: " + request.getMethod() + ", " +
                "Request URL: " + request.getRequestURL() + ", ";

        // Proceed with the filter chain
        filterChain.doFilter(request, response);

        // Record the end time
        long endTime = System.currentTimeMillis();

        // Calculate the request time taken
        long requestTimeTaken = endTime - startTime;

        log += "Response Status: " + response.getStatus();
        System.out.println(startTime + " REQUEST --- " + log + ", Time Taken: " + requestTimeTaken + " milliseconds");
    }

    @Override
    public void destroy() {
        // Cleanup code, if any
    }
}
