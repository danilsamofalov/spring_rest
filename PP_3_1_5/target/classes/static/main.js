const url = "http://localhost:8080/admin/users"

async function getAdminPage() {
    let page = await fetch(url);
    if (page.ok) {
        let listAllUser = await page.json();
        loadTableData(listAllUser);
    } else {
        alert(`Error, ${page.status}`)
    }
}

async function getUserPage() {
    let page = await fetch(url);
    if (page.ok) {
        let listAllUser = await page.json();
        loadUserTable(listAllUser);
    } else {
        alert(`Error, ${page.status}`)
    }
}

const pills = document.querySelectorAll('.pill');
const pillsContent = document.querySelectorAll('.pillContent');
pills.forEach((clickedPill) => {
    clickedPill.addEventListener('click', async () => {
        pills.forEach((pill) => {
            pill.classList.remove('active');
        });
        clickedPill.classList.add('active');
        let tabId = clickedPill.getAttribute('id');
        await activeTabContent(tabId);
    });
});

async function activeTabContent(tabId) {
    pillsContent.forEach((clickedPillContent) => {
        clickedPillContent.classList.contains(tabId) ?
            clickedPillContent.classList.add('active') :
            clickedPillContent.classList.remove('active');
    })
}

async function setCurrentUser() {
    let currentUserUsername = document.getElementById('login-username').value;
    alert(currentUserUsername)
}

async function getMyUser() {
    let res = await fetch('http://localhost:8080/admin/users');
    let resUser = await res.json();
    userNavbarDetails(resUser);
}

window.addEventListener('DOMContentLoaded', getMyUser);

function userNavbarDetails(resUser) {
    let userList = document.getElementById('myUserDetails');
    let roles = ''
    for (let role of resUser[1].roles) {
        roles += role.name + ' '
    }
    userList.insertAdjacentHTML('beforeend', `
        <b> ${resUser[1].username} </b> with roles: <a>${roles} </a>`);
}

function loadTableData(listAllUser) {
    let tableBody = document.getElementById('tbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name)
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.age}</td>
    <td>${user.username}</td>
    <td>${roles}</td>
    <td>
        <button class="btn blue-background" data-bs-toogle="modal"
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

function loadUserTable(listAllUser) {
    let tableBody = document.getElementById('tableUser');
    let dataHtml = '';
    let roles = [];
    for (let role of listAllUser[1].roles) {
        roles.push(" " + role.name)
    }
    dataHtml +=
        `<tr>
    <td>${listAllUser[1].id}</td>
    <td>${listAllUser[1].firstName}</td>
    <td>${listAllUser[1].lastName}</td>
    <td>${listAllUser[1].age}</td>
    <td>${listAllUser[1].username}</td>
    <td>${roles}</td>
</tr>`
    tableBody.innerHTML = dataHtml;
}

getUserPage();

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
    for (let i = 0; i < form_new.roleSelect.options.length; i++) {
        if (form_new.roleSelect.options[i].selected) {
            listOfRole.push(form_new.roleSelect.options[i].value);
        }
    }
    let method = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: form_new.firstName.value,
            lastName: form_new.lastName.value,
            age: form_new.age.value,
            username: form_new.username.value,
            password: form_new.password.value,
            roles: listOfRole
        })
    }
    await fetch(urlNew, method).then(() => {
        form_new.reset();
        getAdminPage();
    });
}

const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('id_ed');
const firstName_ed = document.getElementById('firstName_ed');
const lastName_ed = document.getElementById('lastName_ed');
const age_ed = document.getElementById('age_ed');
const username_ed = document.getElementById('username_ed');
const password_ed = document.getElementById('password_ed');


async function editModalData(id) {
    $('#editModal').modal('show');
    const urlDataEd = 'http://localhost:8080/admin/users/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        await usersPageEd.json().then(user => {
            id_ed.value = `${user.id}`;
            firstName_ed.value = `${user.firstName}`;
            lastName_ed.value = `${user.lastName}`;
            age_ed.value = `${user.age}`;
            username_ed.value = `${user.username}`;
            password_ed.value = `${user.password}`;
        })
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}

async function editUser() {
    let urlEdit = 'http://localhost:8080/admin/users/' + id_ed.value;
    let listOfRole = [];
    for (let i = 0; i < form_ed.rolesForEditing.options.length; i++) {
        if (form_ed.rolesForEditing.options[i].selected) {
            listOfRole.push(form_ed.rolesForEditing.options[i].value);
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: form_ed.firstName.value,
            lastName: form_ed.lastName.value,
            age: form_ed.age.value,
            username: form_ed.username.value,
            password: form_ed.password.value,
            roles: listOfRole
        })
    }
    await fetch(urlEdit, method).then(() => {
        $('#editCloseBtn').click();
        getAdminPage();
    })
}

const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const firstName_del = document.getElementById(`firstName_del`);
const lastName_del = document.getElementById('lastName_del');
const age_del = document.getElementById('age_del');
const username_del = document.getElementById('username_del');
const password_del = document.getElementById('password_del');


async function deleteModalData(id) {
    $('#deleteModal').modal('show');
    const urlForDel = 'http://localhost:8080/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        await usersPageDel.json().then(user => {
            id_del.value = `${user.id}`;
            firstName_del.value = `${user.firstName}`;
            lastName_del.value = `${user.lastName}`;
            age_del.value = `${user.age}`;
            username_del.value = `${user.username}`;
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
            firstName: form_del.firstName.value,
            lastName: form_del.lastName.value,
            age: form_del.age.value,
            username: form_del.username.value,
            password: form_del.password.value
        })
    }
    await fetch(urlDel, method).then(() => {
        $('#deleteCloseBtn').click();
        getAdminPage();
    })
}



