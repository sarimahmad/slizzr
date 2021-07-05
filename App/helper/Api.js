import axios from 'axios';
import Server from './Server';

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
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: dataToUpdate,
    redirect: 'follow',
  };
  return fetch(
    `https://slizzr-6a887.appspot.com/user/${user_id}`,
    requestOptions,
  )
    .then(async response => {
      return await response.json();
    })
    .catch(error => console.log('error', error));
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

export async function getZicketDetails({event_id, user_id}) {
  return fetch(`${Server}/zicket?user_id=${user_id}&event_id=${event_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getUserProfile(user_id) {
  return fetch(`${Server}/user/${user_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getAllMessages({event_id, user_id}) {
  var data = JSON.stringify({event_id, user_id});
  console.log(data);
  var config = {
    method: 'post',
    url: `${Server}/chatroom/get-all-message`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return GetResponse;
}
export async function CustomerCharge(data) {
  // DATA = {
  //   number: '4242 4242 4242 4242',
  //   exp_month: 2,
  //   exp_year: 2024,
  //   cvc: '212',
  //   user_id: '3wDLplGq1oYQMO3xRnS4ZtpdK0M2',
  //   event_id: '074d6e00-6fbf-4eed-9884-984fd56e84e4',
  // };
  var config = {
    method: 'post',
    url: `${Server}/stripe/customer/charge-without-saving-card`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return GetResponse;
}
