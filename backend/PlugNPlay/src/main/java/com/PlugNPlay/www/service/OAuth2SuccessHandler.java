package com.PlugNPlay.www.service;

import com.PlugNPlay.www.entity.RefreshToken;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.enums.Provider;
import com.PlugNPlay.www.repository.RefreshTokenRepository;
import com.PlugNPlay.www.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final OAuth2AuthorizedClientService auth2AuthorizedClientService;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontEndSuccessUrl;

    @Value("${app.auth.frontend.failure-redirect}")
    private String frontEndFailureUrl;

    public OAuth2SuccessHandler(UserRepository userRepository, JWTService jwtService, CookieService cookieService, RefreshTokenRepository refreshTokenRepository, OAuth2AuthorizedClientService auth2AuthorizedClientService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.auth2AuthorizedClientService = auth2AuthorizedClientService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication.toString());

        OAuth2AuthenticationToken authToken= (OAuth2AuthenticationToken) authentication;

        OAuth2AuthorizedClient client=auth2AuthorizedClientService.loadAuthorizedClient(
                authToken.getAuthorizedClientRegistrationId(),
                authToken.getName()
        );

        String token=client.getAccessToken().getTokenValue();

        OAuth2User oAuth2User=(OAuth2User)authentication.getPrincipal();

        String registrationId=authToken.getAuthorizedClientRegistrationId();


        User newUser=new User();
        User user;

        switch (registrationId) {
            case "google" -> {
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();

                String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
                // String picture=oAuth2User.getAttributes().getOrDefault("picture","").toString();

                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setEnable(true);
                newUser.setProvider(Provider.GOOGLE);
                newUser.setProviderId(googleId);

                user = userRepository.findByEmail(email).orElseGet(() -> userRepository.save(newUser));

            }
            case "github" -> {
                String githubId=oAuth2User.getAttributes().getOrDefault("id","").toString();
                String login = oAuth2User.getAttributes().getOrDefault("login","").toString();

                String email = (String) oAuth2User.getAttributes().getOrDefault("email","");
                System.out.println(email);

                if (email == null || email.isBlank()) {
                    email = fetchGithubEmail(token);
                }

                if(email==null){
                    throw new OAuth2AuthenticationException("GitHub account has no verified email");
                }

                String finalEmail = email;
                user = userRepository.findByEmail(email)
                        .orElseGet(() -> {
                            User user1 = new User();
                            user1.setEmail(finalEmail);
                            user1.setEnable(true);
                            user1.setProvider(Provider.GITHUB);
                            user1.setProviderId(githubId);
                            return userRepository.save(user1);
                        });
            }
            default -> {
                throw new RuntimeException("Invalid Provider");
            }
        }

        System.out.println(user.getName());


        String jti = UUID.randomUUID().toString();
        RefreshToken refreshToken=new RefreshToken();
        refreshToken.setJti(jti);
        refreshToken.setUser(user);
        refreshToken.setRevoked(false);
        refreshToken.setCreatedAt(Instant.now());
        refreshToken.setExpiredAt(Instant.now().plusSeconds(jwtService.getRefreshTTLSecond()));
        
        refreshTokenRepository.save(refreshToken);

        String newAccessToken = jwtService.generateAccessToken(user);
        String newRefreshToken = jwtService.generateRefreshToken(user, refreshToken.getJti());

        cookieService.attachRefreshCookie(response,newRefreshToken,(int)jwtService.getRefreshTTLSecond());


        //response.getWriter().write("login successfully");
        response.sendRedirect(frontEndSuccessUrl);

    }

    private String fetchGithubEmail(String token) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<List<Map<String, Object>>> response =
                restTemplate.exchange(
                        "https://api.github.com/user/emails",
                        HttpMethod.GET,
                        entity,
                        new ParameterizedTypeReference<>() {});

        List<Map<String, Object>> emails = response.getBody();

        if (emails == null) return null;

        return emails.stream()
                .filter(e -> Boolean.TRUE.equals(e.get("primary")))
                .filter(e -> Boolean.TRUE.equals(e.get("verified")))
                .map(e -> e.get("email").toString())
                .findFirst()
                .orElse(null);
    }

}
