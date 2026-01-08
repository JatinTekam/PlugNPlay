package com.PlugNPlay.www.service;

import com.PlugNPlay.www.entity.RefreshToken;
import com.PlugNPlay.www.entity.User;
import com.PlugNPlay.www.enums.Provider;
import com.PlugNPlay.www.repository.RefreshTokenRepository;
import com.PlugNPlay.www.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JWTService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    public OAuth2SuccessHandler(UserRepository userRepository, JWTService jwtService, CookieService cookieService, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.cookieService = cookieService;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println(authentication.toString());

        OAuth2User oAuth2User=(OAuth2User)authentication.getPrincipal();

        String registrationId="unknown";

        if(authentication instanceof OAuth2AuthenticationToken token){
            registrationId=token.getAuthorizedClientRegistrationId();
        }

        User user=new User();

        switch (registrationId) {
            case "google" -> {
                String googleId = oAuth2User.getAttributes().getOrDefault("sub", "").toString();

                String email = oAuth2User.getAttributes().getOrDefault("email", "").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", "").toString();
                // String picture=oAuth2User.getAttributes().getOrDefault("picture","").toString();

                user.setEmail(email);
                user.setName(name);
                user.setEnable(true);
                user.setProvider(Provider.GOOGLE);

                userRepository.findByEmail(email).ifPresentOrElse(user1 -> {
                }, () -> {
                    userRepository.save(user);
                });
            }
            default -> {
                throw new RuntimeException("Invalid Provider");
            }
        }

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


        response.getWriter().write("login successfully");

    }
}
