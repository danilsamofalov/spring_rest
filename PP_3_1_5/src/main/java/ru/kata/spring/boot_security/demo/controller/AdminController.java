package ru.kata.spring.boot_security.demo.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    private final UserService userService;



    public AdminController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> showAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<User> getOneUser(@PathVariable("id") Integer id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<HttpStatus> addUser(@RequestBody UserDto userDto) {
        userService.addUser(convertToUser(userDto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") Integer id) {
        userService.removeUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PatchMapping(value = "/users/{id}")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDto userDto, @PathVariable("id") Integer oldUserId) {
        userService.updateUser(oldUserId, convertToUser(userDto));
        return new ResponseEntity<>(HttpStatus.OK);
    }


    private User convertToUser(UserDto userDto) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(userDto, User.class);
    }
}
