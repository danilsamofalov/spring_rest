const url = "http://localhost:8080/admin/users"

async function getAdminPage() {
    let page = await fetch(url);

    if(page.ok) {
        let listAllUser = await  page.json();
        loadTableData(listAllUser);
    } else {
        alert(`Error, ${page.status}`)
    }

}
async function getMyUser() {

    const res = await fetch('http://localhost:8080/admin/users')
    const resUser = await res.json();
    userNavbarDetails(resUser);
}
window.addEventListener('DOMContentLoaded', getMyUser);
function loadTableData(listAllUser) {
    const tableBody = document.getElementById('tbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.toString().replaceAll("ROLE_", ""))
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.username}</td>
    <td>${user.lastName}</td>
    <td>${user.salary}</td>
    <td>${user.email}</td>
    <td>${roles}</td>
    <td>
        <button class="btn btn-primary" data-bs-toogle="modal"
        data-bs-target="#editModal"
        onclick="editModalData(${user.id})">Edit</button>
    </td>
        <td>
        <button class="btn btn-danger" data-bs-toogle="modal"
        data-bs-target="#deleteModal"
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
</tr>`
    }
    tableBody.innerHTML = dataHtml;
}
getAdminPage();

const form_new = document.getElementById('formForNewUser');
async function newUser() {
    $('#newModal').modal('show');
    form_new.addEventListener('submit', addNewUser);
    $('#newModal').modal('hide');
}

async function addNewUser(event) {
    event.preventDefault();
    const urlNew = 'http://localhost:8080/admin/users';
    let listOfRole = [];
    // for (let i=0; i<form_new.roleSelect.options.length; i++) {
    //     if (form_new.roleSelect.options[i].selected) {
    //         listOfRole = Array.from(form_new.roleSelect.selectedOptions).map(option => ({
    //             name: option.value
    //         }));
    //     }
    // }
    for (let i=0; i<form_new.roleSelect.options.length; i++) {
        if (form_new.roleSelect.options[i].selected) {
            listOfRole.push("ROLE_" + form_new.roleSelect.options[i].value);
        }
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form_new.username.value,
            lastName: form_new.lastName.value,
            salary: form_new.salary.value,
            email: form_new.email.value,
            password: form_new.password.value,
            roles: listOfRole
        })
    }
    await fetch(urlNew,method).then(() => {
        form_new.reset();
        getAdminPage();
    });
}
const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('id_ed');
const name_ed = document.getElementById('name_ed');
const lastName_ed = document.getElementById('lastName_ed');
const age_ed = document.getElementById('age_ed');
const email_ed = document.getElementById('email_ed');
const password_ed = document.getElementById('password_ed');


async function editModalData(id) {
    $('#editModal').modal('show');
    const  urlDataEd = 'http://localhost:8080/admin/users/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        await usersPageEd.json().then(user => {
            id_ed.value = `${user.id}`;
            name_ed.value = `${user.username}`;
            lastName_ed.value = `${user.lastName}`;
            age_ed.value = `${user.salary}`;
            email_ed.value = `${user.email}`;
            password_ed.value = `${user.password}`;
        })
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}
async function editUser() {
    let urlEdit = 'http://localhost:8080/admin/users/' + id_ed.value;
    let listOfRole = [];
    for (let i=0; i<form_ed.rolesForEditing.options.length; i++) {
        if (form_ed.rolesForEditing.options[i].selected) {
            listOfRole.push("ROLE_" + form_ed.rolesForEditing.options[i].value);
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form_ed.username.value,
            lastName: form_ed.lastName.value,
            salary: form_ed.salary.value,
            email: form_ed.email.value,
            password: form_ed.password.value,
            roles: listOfRole
        })
    }
    await fetch(urlEdit,method).then(() => {
        $('#editCloseBtn').click();
        getAdminPage();
    })
}
const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const name_del = document.getElementById('name_del');
const lastName_del = document.getElementById('lastName_del');
const age_del = document.getElementById('age_del');
const email_del = document.getElementById('email_del');
const password_del = document.getElementById('password_del');


async function deleteModalData(id) {
    $('#deleteModal').modal('show');
    const  urlForDel = 'http://localhost:8080/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        await usersPageDel.json().then(user => {
            id_del.value = `${user.id}`;
            name_del.value = `${user.username}`;
            lastName_del.value = `${user.lastName}`;
            age_del.value = `${user.salary}`;
            email_del.value = `${user.email}`;
            password_del.value = `${user.password}`;
        })
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}
async function deleteUser() {
    let urlDel = 'http://localhost:8080/admin/users/' + id_del.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: form_del.username.value,
            lastName: form_del.lastName.value,
            salary: form_del.salary.value,
            email: form_del.email.value,
            password: form_del.password.value
        })
    }
    await fetch(urlDel,method).then(() => {
        $('#deleteCloseBtn').click();
        getAdminPage();
    })
}
function userNavbarDetails({username, roles}) {
    const userList = document.getElementById('myUserDetails');
    userList.insertAdjacentHTML('beforeend', `
        <b> ${username} </b> with roles: <a>${roles} </a> 
    `);
}
