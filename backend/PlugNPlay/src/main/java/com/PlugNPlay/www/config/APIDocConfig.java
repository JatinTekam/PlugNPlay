package com.PlugNPlay.www.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Auth Application",
                description = "Generic Auth App",
                contact = @Contact(
                        name = "Jatin Tekam",
                        url = "http://PlugAndPlay.com",
                        email = "support@PlugAndPlay.com"
                ),
                version = "1.0"
        ),
       security = {
                @SecurityRequirement(
                        name = "BearerAuth"
                )
       }
)
@SecurityScheme(
        name = "BearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class APIDocConfig {


}
