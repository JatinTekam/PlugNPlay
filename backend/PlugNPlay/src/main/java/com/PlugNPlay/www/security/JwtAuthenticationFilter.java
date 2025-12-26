package com.PlugNPlay.www.security;

import com.PlugNPlay.www.entity.Role;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.exceptions.ResourceNotFoundException;
import com.PlugNPlay.www.repository.UserRepository;
import com.PlugNPlay.www.service.JWTService;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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

        String header=request.getHeader("Authorization");
        if(header!=null && header.startsWith("Bearer ")){

            String token = header.substring(7);

            try{

                if(!jwtService.isAccessToken(token)){
                    filterChain.doFilter(request,response);
                    return;
                }

                Jws<Claims> parse = jwtService.parse(token);
                Claims payload = parse.getPayload();
                String userId = payload.getSubject();
                UUID userUUID= UUID.fromString(userId);
                User user = userRepository.findById(userUUID).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

                if(user.isEnable()){
                    List<GrantedAuthority> authorities = user.getRoles()==null ? List.of() : user.getRoles().stream()
                            .map(role->new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            authorities
                    );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    if(SecurityContextHolder.getContext().getAuthentication()==null){
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }

            } catch (ExpiredJwtException e) {
                e.printStackTrace();
            } catch (MalformedJwtException e) {
                e.printStackTrace();
            } catch (JwtException e) {
                e.printStackTrace();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request,response);
    }
}
