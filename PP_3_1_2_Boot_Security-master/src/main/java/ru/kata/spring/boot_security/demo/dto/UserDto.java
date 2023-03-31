package ru.kata.spring.boot_security.demo.dto;

import ru.kata.spring.boot_security.demo.entity.Role;

import java.util.Collection;
import java.util.Objects;

public class UserDto {
    private long id;
    private String username;
    private String email;
    private String lastName;
    private String password;
    private int salary;
    private Collection<Role> roles;

    public UserDto() {
    }

    public UserDto(long id, String username, String email, String lastName, String password, int salary, Collection<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.lastName = lastName;
        this.password = password;
        this.salary = salary;
        this.roles = roles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return id == userDto.id && salary == userDto.salary && Objects.equals(username, userDto.username) && Objects.equals(email, userDto.email) && Objects.equals(lastName, userDto.lastName) && Objects.equals(password, userDto.password) && Objects.equals(roles, userDto.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, lastName, password, salary, roles);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", salary=" + salary +
                ", roles=" + roles +
                '}';
    }
}
