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
  myHeaders.append('Accept', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataToUpdate),
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
  myHeaders.append('Accept', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(dataToUpdate),
    redirect: 'follow',
  };
  return fetch(`${Server}/stripe/host/create-host`, requestOptions)
    .then(async response => {
      return await response.json();
    })
    .catch(error => console.log('error', error));
}

export async function getAllPayoutMethods(user_id) {
  return fetch(`${Server}/user/get-payout-cards/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getAllPaymentMethods(user_id) {
  return fetch(`${Server}user/get-payout-cards/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function newPaymentMethod(formdata) {
  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(formdata),
    redirect: 'follow',
  };

  return fetch(
    'https://slizzr-6a887.appspot.com/stripe/host/add-payout',
    requestOptions,
  )
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function updateEvent(event_id, dataToUpdate) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: dataToUpdate,
    redirect: 'follow',
  };
  return fetch(
    `https://slizzr-6a887.appspot.com/event/${event_id}`,
    requestOptions,
  )
    .then(async response => {
      return await response.json();
    })
    .catch(error => console.log('error', error));
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
  var config = {
    method: 'post',
    url: `${Server}/stripe/customer/charge-without-saving-card`,
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

export async function DeleteUser(user_id) {
  var config = {
    method: 'Delete',
    url: `${Server}/user/${user_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  return GetResponse;
}
