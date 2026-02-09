package com.PlugNPlay.www.dto;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        long  expiresIn,
        String tokenType,
        UserRequest user
) {
    public static TokenResponse of(String accessToken, String refreshToken, long expiresIn, UserRequest user) {
       return new TokenResponse(accessToken, refreshToken, expiresIn, "Bearer", user);
    }
}
