package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.LoadUserSecurity;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@RestController
public class UserController {

    private final LoadUserSecurity loadUserSecurity;

    public UserController(LoadUserSecurity loadUserSecurity) {
        this.loadUserSecurity = loadUserSecurity;
    }

    @GetMapping(path = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getAuthUser(@CurrentSecurityContext(expression = "authentication") Principal principal) {
        User user = loadUserSecurity.findByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }
}
