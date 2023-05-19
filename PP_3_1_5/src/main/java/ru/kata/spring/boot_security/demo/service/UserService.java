package ru.kata.spring.boot_security.demo.service;


import ru.kata.spring.boot_security.demo.dto.UserDto;
import ru.kata.spring.boot_security.demo.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    User getUserById(Long id);

    void addUser(User user);

    void removeUser(Long id);

    void updateUser(User user);

    User convertToUser(UserDto userDto);
}