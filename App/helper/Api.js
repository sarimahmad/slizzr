import Server from './Server';
const axios = require('axios');

export async function CheckEventStatus({user_id, event_id}) {
  const reqOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_id, event_id}),
  };
  const Response = await fetch(`${Server}/zicket/check-attendance`, reqOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(err => err);
  return Response;
}

export async function AtendPublicEvent({user_id, event_id}) {
  const reqOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({user_id, event_id}),
  };

  const Response = await fetch(`${Server}/zicket/create-zicket`, reqOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(err => err);
  return Response;
}

export async function getUserAttendedEvents(user_id) {
  return fetch(`${Server}/event/user-attended/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getUserEvents(user_id) {
  return fetch(`${Server}/event/user-hosted/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export async function getUserImages(user_id) {
  return fetch(`${Server}/user/pictures/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getEventDetail(event_id) {
  return fetch(`${Server}/event/` + event_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export async function getAttendeesList(event_id) {
  return fetch(`${Server}/event/get-attendees/` + event_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function updateProfile(user_id, dataToUpdate) {
  var config = {
    method: 'put',
    url: `https://slizzr-6a887.appspot.com/user/${user_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataToUpdate,
  };
  return axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

export async function uploadImage(formdata) {
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  return fetch('https://slizzr-6a887.appspot.com/upload', requestOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function createCustomerStripe(dataToUpdate) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: dataToUpdate,
    redirect: 'follow',
  };
  return fetch(`${Server}/stripe/customer/create-customer`, requestOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(error => console.log('error', error));
}

export async function createHostStripe(dataToUpdate) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: dataToUpdate,
    redirect: 'follow',
  };
  return fetch(`${Server}/stripe/host/create-host`, requestOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(error => console.log('error', error));
}
