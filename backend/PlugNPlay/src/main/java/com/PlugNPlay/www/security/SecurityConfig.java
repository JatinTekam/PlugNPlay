package com.PlugNPlay.www.security;


import com.PlugNPlay.www.dto.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

   final private JwtAuthenticationFilter jwtAuthenticationFilter;

   final private AuthenticationSuccessHandler successHandler;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter, AuthenticationSuccessHandler successHandler) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.successHandler = successHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .sessionManagement(sm->
                        sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeHttpRequests ->
                authorizeHttpRequests.requestMatchers("/api/v1/auth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2->
                        oauth2.successHandler(successHandler)
                                .failureHandler(null)

                        )
                .logout(AbstractHttpConfigurer::disable)

                .exceptionHandling(exception->exception
                        .authenticationEntryPoint((request, response, authException) ->{
                           //authException.printStackTrace();
                           response.setStatus(401);
                           response.setContentType("application/json");
                            String message=authException.getMessage();
                           String errorMessage=(String)request.getAttribute("error");
                           if (errorMessage!=null){
                                message=errorMessage;
                           }

                           // Map<String,Object> errorMap=Map.of("message",message,"statusCode", 401);
                            var apiError= ApiError.of(HttpStatus.UNAUTHORIZED.value(), "Unauthorized Access",message,request.getRequestURI(),true);
                            var objectMapper=new ObjectMapper();
                            response.getWriter().write(objectMapper.writeValueAsString(apiError));
                        }))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
