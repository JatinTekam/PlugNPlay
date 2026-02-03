package com.PlugNPlay.www.security;

import com.PlugNPlay.www.entity.Role;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.JWTService;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JWTService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = null;

        // First, try to get token from Authorization header
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            System.out.println("Token from header: " + token);
        }

        // If not in header, try to get from cookies
        if (token == null && request.getCookies() != null) {
            System.out.println("Looking for token in cookies...");
            for (Cookie cookie : request.getCookies()) {
                System.out.println("Cookie found: " + cookie.getName());

                if ("refreshToken".equals(cookie.getName())) {
                    token = cookie.getValue();
                    System.out.println("Token found in refreshToken cookie");
                    break;
                }
            }
        }

        // If token is found, authenticate
        if (token != null) {
            try {
                // Comment out this check for now since we're using refreshToken
                // if (!jwtService.isAccessToken(token)) {
                //     filterChain.doFilter(request, response);
                //     return;
                // }

                Jws<Claims> parse = jwtService.parse(token);
                Claims payload = parse.getPayload();
                String userId = payload.getSubject();
                UUID userUUID = UUID.fromString(userId);
                User user = userRepository.findById(userUUID)
                        .orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

                if (user.isEnable()) {
                    List<GrantedAuthority> authorities = user.getRoles() == null ? List.of()
                            : user.getRoles().stream()
                            .map(role -> new SimpleGrantedAuthority(role.getName()))
                            .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            authorities
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    if (SecurityContextHolder.getContext().getAuthentication() == null) {
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("User authenticated: " + user.getEmail());
                    }
                }

            } catch (ExpiredJwtException e) {
                request.setAttribute("error", "Token Expired");
                System.out.println("Token expired");
            } catch (Exception e) {
                request.setAttribute("error", "Invalid Token");
                System.out.println("Invalid token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth");
    }
}