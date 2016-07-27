'use strict';

import $ from 'jquery';

class UserService {

    constructor(baseUrl) {
        this.url = baseUrl;
    }

    getUsers() {
        return this.getJsonAsPromise(this.url);
    }

    getUserById(userId) {
        return this.getJsonAsPromise(`${this.url}/${userId}`);
    }

    addNewUser(user) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(user),
                }).done(resolve).fail(reject);
            }
        );
    }

    editUser(user) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${user.id}`,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(user),
                }).done(resolve).fail(reject);
            }
        );
    }

    deleteUser(userId) {
        let url = this.url;
        return new Promise(
            function (resolve, reject) {
                $.ajax({
                    url: `${url}/${userId}`,
                    dataType: 'json',
                    type: 'DELETE'
                }).done(resolve).fail(reject);
            }
        );
    }

    getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}

export default UserService;