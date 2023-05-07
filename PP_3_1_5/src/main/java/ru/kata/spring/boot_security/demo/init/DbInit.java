package ru.kata.spring.boot_security.demo.init;


import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.entity.Role;
import ru.kata.spring.boot_security.demo.entity.User;
import ru.kata.spring.boot_security.demo.service.RoleServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DbInit {
    private final UserServiceImpl userService;
    private final RoleServiceImpl roleService;

    public DbInit(UserServiceImpl userService, RoleServiceImpl roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
    @PostConstruct
    private void postConstruct() {
        Role roleAdmin = new Role("ADMIN");
        Role roleUser = new Role("USER");
        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);

        User user = new User("user@mail.ru", "user", "user", "userov", 20, Set.of(roleUser));
        User admin = new User("admin@mail.ru", "admin", "admin", "adminov", 30, Set.of(roleAdmin, roleUser));
        userService.addUser(user);
        userService.addUser(admin);
    }
}
