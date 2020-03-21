import $ from 'jquery';

export const signUp = user => (
    $.ajax({
        method: 'POST',
        url: 'api/users',
        data: user
    })
);

export const searchUser = (id) => (
    $.ajax({
        method: 'GET',
        url: `api/users/${id}`,
    })
);