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
  return fetch(`${Server}/user/get-payment-cards/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}


export async function getAllBlockedUsers(user_id) {
  return fetch(`${Server}/user/get-all-block-list/` + user_id)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export async function newPaymentMethod(formdata) {
  var config = {
    method: 'post',
    url: `${Server}/stripe/customer/add-payment`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: formdata,
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

export async function makeDefaultPayout(formdata) {
  var config = {
    method: 'put',
    url: `${Server}/stripe/host/default-payout-method`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: formdata,
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

export async function makeDefaultPayment(formdata) {
  var config = {
    method: 'put',
    url: `${Server}/stripe/customer/default-payment-method`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: formdata,
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

export async function getZicketDetails() {
  let user_id="3wDLplGq1oYQMO3xRnS4ZtpdK0M2"
  let event_id="074d6e00-6fbf-4eed-9884-984fd56e84e4"
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
    url: `${Server}/chatroom/messages`,
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

export async function getAllRequests(user_id) {
  return fetch(`${Server}/user/get-all-request/${user_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}


export async function getAllFriends(user_id) {
   return fetch(`${Server}/user/get-all-friends/${user_id}`)
     .then(async response => {
       return await response.json();
     })
     .catch(error => {
       console.error(error);
     });
 }
export async function findPeoplebyDistance() {
 let min_age="0"
 let max_age="0"
 let user_id= "3wDLplGq1oYQMO3xRnS4ZtpdK0M2"
  return fetch(`${Server}/user/people/find-people?min_age=${min_age}&max_age=${max_age}&user_id=${user_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export async function acceptandRejectRequest(data) {
  var config = {
    method: 'post',
    url: `${Server}/user/decide-mutual-connect-request`,
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

// export async function findPeoplebyDistance(min_age,max_age,user_id) {
//  return  axios.get(`${Server}/user/people/find-people`, {
//     params: {
//       min_age: min_age,
//       max_age: max_age,
//       user_id: user_id
//     }
//   });
// }
export async function sendMutualConnection(data) {
  var config = {
    method: 'post',
    url: `${Server}/user/send-mutual-connect-request`,
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
export async function blockUser(data) {
  var config = {
    method: 'post',
    url: `${Server}/user/block-user`,
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
export async function payAndJoin(data) {
  var config = {
    method: 'post',
    url: `${Server}/stripe/customer/charge`,
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

export async function deleteHostEvent(id, dataToSend) {
  var config = {
    method: 'delete',
    url: `${Server}/event/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataToSend,
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

export async function deleteAttendEvent(dataToSend) {
  var config = {
    method: 'delete',
    url: `${Server}/zicket`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataToSend,
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

// Make sure User Redux is updated well i see sometime its showing old data
// Amount must be Number
// Call this API for payment and Once the Payment is successfully call Attend Event API and SuccessfullyPaidViaProvider to get User in the Event and Data saved
export async function ProviderPaymentsForCustomer({cust_id, amount}) {
  var data = JSON.stringify({
    "cust_id": cust_id,
    "amount": amount
  });

  var config = {
    method: 'POST',
    url: `${Server}/stripe/customer/provider-payment`,
    headers: {
      'Content-Type': 'application/json',
    },
    data : data
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

// Call this API once Payment is successfull from the Provider only 
export async function SuccessfullyPaidViaProvider({event_id, user_id}) {
  var data = JSON.stringify({
    "event_id": event_id,
    "user_id": user_id
  });

  var config = {
    method: 'POST',
    url: `${Server}/stripe/customer/suceessfull-payment-provider`,
    headers: {
      'Content-Type': 'application/json',
    },
    data : data
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


/**
 * IMPORTANT -:
 * ALL PREPAID EVENTS ARE 2 STEPS -> GET THE PAYMENT AND IF SUCCESSFULL CALL ATTENEDEVENT API TO GET ZICKET.
 * ALL FREE EVENTS ARE 1 STEPS -> CALL ATTENEDEVENT API TO GET ZICKET.
 * ALL SCAN & PAY ARE 4 STEPS -> MAKE SURE BEFORE THEY ATTEND THERE PAYMENT METHOD IS SETUP'ED, THEN CALL ATTENEDEVENT API TO GET ZICKET, BY THE TIME OF SCAN GET THE PAYMENT FIRST IF SUCCESSFULL THEN CALL SCANNER API 
 * ALL PROVIDER PAYMENT(APPLE/GOOGLE) ARE 3 STEPS -> CALL API TO GET PAYMENTINTENDS, STRIPE PROVIDE REACT NATIVE SPECIFIC PAYMENT SHEET TO PROCESS PAYMENTS AND ONCE SUCCESSFULL DONE CALL ATTENEDEVENT API TO GET ZICKET AND SuccessfullyPaidViaProvider API TO STORE USER DATA
 */