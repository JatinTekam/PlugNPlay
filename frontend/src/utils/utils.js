import image1 from "../utils/images/open-source.png"
import image2 from "../utils/images/code.png"
import image3 from "../utils/images/easy-installation.png"

export const DemoCodes = [
  {
    code: `// 1. Require Mongoose
    const mongoose = require('mongoose');
    // 2. Define the schema
    const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: String, // Shorthand for { type: String }
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        votes: Number,
        favs: Number
    }
    });`,
    language: "javascript",
    extension:"js"
  },
  {
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Defines the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorizeRequests ->
                authorizeRequests
                    .requestMatchers("/", "/home").permitAll() // Allow access to home and root
                    .anyRequest().authenticated() // Require authentication for all other requests
            )
            .formLogin(formLogin ->
                formLogin
                    .loginPage("/login") // Specify custom login page (you must create the controller/view)
                    .permitAll() // Allow everyone to access the login page
            )
            .logout(logout ->
                logout
                    .permitAll() // Allow everyone to access the logout functionality
            )
            .httpBasic(withDefaults()); // Enable HTTP Basic authentication

        return http.build();
    }

    // Configures an in-memory user for demonstration purposes
    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails user = User.builder()
            .username("user")
            .password(passwordEncoder.encode("password"))
            .roles("USER")
            .build();
        return new InMemoryUserDetailsManager(user);
    }

    // Specifies the password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for secure password hashing
    }
}`,
language: "java",
extension:"java"
  },
  {

    code:` from fastapi import APIRouter

    router = APIRouter(prefix="/users", tags=["Users"])

    @router.get("/")
    async def read_users():
        return [{"username": "foo"}, {"username": "bar"}]

    app.include_router(router)`,
    language: "python",
    extension:"py"
  },
];


export const CardsImg=[
   {
    img:image1,
    title:"Open Source",
    desc:"A fully open-source template you can use and modify freely."
   },
   {
    img:image2,
    title:"10+ Template's",
    desc:"More than 10 reusable templates to speed up your development."
   },
   {
    img:image3,
    title:"Developer Friendly",
    desc:"Clean code structure with reusable and maintainable components."
   }

]
