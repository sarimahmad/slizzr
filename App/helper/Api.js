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

export async function ScanZicket({EventID, ZicketID}) {
  var data = JSON.stringify({
    event_id: EventID,
  });

  var config = {
    method: 'POST',
    url: `${Server}/zicket/scan-zicket/` + ZicketID,
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

export async function AtendPublicEvent({user_id, event_id}) {
  console.log(user_id);
  console.log(event_id);

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
// export async function getEventDetail(formdata, event_id) {
//   var config = {

//     url: `${Server}/event/${event_id}`,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: formdata,
//   };

//   const GetResponse = await axios(config)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   return GetResponse;
// }
export async function getEventDetail(data, event_id) {
  return fetch(
    `${Server}/event/` + event_id + '?Lat=' + data.Lat + '&Long=' + data.Long,
  )
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
      return await response;
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
export async function getAllNotifications(user_id) {
  return fetch(`${Server}/notifications/` + user_id)
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
export async function contactUs(formdata, user_id) {
  var config = {
    method: 'post',
    url: `${Server}/contact-us/${user_id}`,
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
export async function newPayoutMethod(formdata) {
  var config = {
    method: 'post',
    url: `${Server}/stripe/host/add-payout`,
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
      return response;
    })
    .catch(function (error) {
      return error;
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

export async function getZicketDetails({user_id, event_id}) {
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
export async function sendMessageToAttendees(data) {
  var dataJson = JSON.stringify(data);
  // conso/le.log(data);

  var config = {
    method: 'post',
    url: `${Server}/chatroom/send-message-to-attendees`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: dataJson,
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

export async function removePayoutMethod(dataToSend) {
  var config = {
    method: 'delete',
    url: `${Server}/stripe/host/remove-card`,
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
      return error;
    });
  return GetResponse;
}

export async function disInviteAttendee(dataToSend) {
  var config = {
    method: 'delete',
    url: `${Server}/zicket/disinvite`,
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
      return error;
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
export async function findPeoplebyDistance(
  min_age,
  max_age,
  user_id,
  lat,
  long,
) {
  // let min_age = '0';
  // let max_age = '0';
  // let user_id = '3wDLplGq1oYQMO3xRnS4ZtpdK0M2';
  return fetch(
    `${Server}/user/people/find-people?min_age=${min_age}&max_age=${max_age}&user_id=${user_id}&lat=${lat}&long=${long}`,
  )
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
export async function getMutualConnections(user_id) {
  return fetch(`${Server}/user/get-mutual-connections/${user_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function acceptandRejectRequest(data) {
  // "current_user_id": "This should be current user id",
  // "mutual_connection_id" : "mutual connection id",
  // "status": "ACCEPTED" OR ""REJECTED
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
export async function findRelation(user_id, otheruser_id) {
  const data = {
    current_user_id: user_id,
    opposite_user_id: otheruser_id,
  };
  var config = {
    method: 'post',
    url: `${Server}/user/find-relationship-between-users`,
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
  // "user_id": "This should be Current User ID",
  // "friend_user_id" : "This should be the User ID which you are sending request"
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
  let formData = JSON.stringify(data);
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

export async function shareEventRequest(data) {
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

export async function removePaymentMethod(dataToSend) {
  var config = {
    method: 'delete',
    url: `${Server}/stripe/customer/remove-card`,
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
      return error;
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
    cust_id: cust_id,
    amount: amount,
  });

  var config = {
    method: 'POST',
    url: `${Server}/stripe/customer/provider-payment`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
    event_id: event_id,
    user_id: user_id,
  });

  var config = {
    method: 'POST',
    url: `${Server}/stripe/customer/suceessfull-payment-provider`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

export async function removeSharedHostRequest(sharedHostID) {
  var data = JSON.stringify({
    ACCEPTED: 'FALSE',
  });

  var config = {
    method: 'DELETE',
    url: `${Server}/event/remove-sharedhost-request/${sharedHostID}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
//
export async function approveSharedHostRequest(sharedHostID) {
  var data = JSON.stringify({
    ACCEPTED: 'TRUE',
  });
  var config = {
    method: 'POST',
    url: `${Server}/event/decide-sharedhost-request/${sharedHostID}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
export async function inviteSharedHost(data, id) {
  var config = {
    method: 'POST',
    url: `${Server}/event/send-sharedhost-request/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

export async function getDefaultCustomerCard(cust_stripe_id) {
  return fetch(`${Server}/stripe/customer/default-card/${cust_stripe_id}`)
    .then(async response => {
      return await response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

export async function getAllSharedRequests(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-request/${user_id}`,
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
export async function getAllPendingSharedHostsforEvent(event_id) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-pending-event/${event_id}`,
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

export async function getAllSharedEvents(user_id) {
  console.log(`${Server}/event/get-all-sharedevents/${user_id}`);
  var config = {
    method: 'GET',
    url: `${Server}/event/get-all-sharedevents/${user_id}`,
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

export async function getAllSharedHostsforEventAccepted(event_id) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-event/${event_id}`,
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
export async function getAllSharedHostsforEvent(event_id) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-event/${event_id}`,
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

// New API's

// Notify Attendees After Edit event
export async function EditEventNotify({event_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/event/notify-edit-event/${event_id}`,
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

// Notify User for new message's
export async function UserNotifyForMessage({current_user_id, host_id}) {
  var data = JSON.stringify({
    current_user_id: current_user_id,
    host_id: host_id,
  });

  var config = {
    method: 'POST',
    url: `${Server}/user/notify-send-message`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

// Welcome Email when user signup first time
export async function WelcomeEmail({name, email}) {
  var data = JSON.stringify({
    name: name,
    email: email,
  });

  var config = {
    method: 'POST',
    url: `${Server}/send-email/welcome`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

// Email Change confirmation
export async function EmailChangeConfirmation({name, email}) {
  var data = JSON.stringify({
    name: name,
    email: email,
  });

  var config = {
    method: 'POST',
    url: `${Server}/send-email/email-change-confirmation`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

// Password Change confirmation
export async function PasswordChangeConfirmation({name, email}) {
  var data = JSON.stringify({
    name: name,
    email: email,
  });

  var config = {
    method: 'POST',
    url: `${Server}/send-email/password-change-confirmation`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

// Get All User Notifications
//There are 3 types of notification 1 -> MESSAGE, 2 -> MUTUAL, 3 -> SHARED
export async function GetUserNotification({current_user_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/notifications/${current_user_id}`,
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

// Shared HOST STARTS HERE

// Send Shared Host request
export async function SendSharedHostRequest({
  current_user_id,
  host_id,
  event_id,
}) {
  var data = JSON.stringify({
    host_id: host_id,
    event_id: event_id,
  });

  var config = {
    method: 'POST',
    url: `${Server}/event/send-sharedhost-request/${current_user_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

// Decide Shared host Request
// ACCEPTED can be either TRUE or FALSE
export async function DecideSharedHostRequest({ACCEPTED, shared_host_id}) {
  var data = JSON.stringify({
    ACCEPTED: ACCEPTED,
  });

  var config = {
    method: 'POST',
    url: `${Server}/event/decide-sharedhost-request/${shared_host_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

//Get All Shared Host request for user
export async function GetUserSharedHostRequest({current_user_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-request/${current_user_id}`,
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

//Get All Shared event for user
export async function GetSharedEventsForUser({current_user_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-all-sharedevents/${current_user_id}`,
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

// REMOVE Shared HOST can be used for self remove or can be user by host to remove
//self_removed can be TRUE or FALSE
export async function RemoveSharedHost(self_removed, shared_host_id) {
  var data = JSON.stringify({
    self_removed: self_removed,
  });

  var config = {
    method: 'DELETE',
    url: `${Server}/event/remove-shared-host/${shared_host_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: self_removed,
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

//Get All Shared HOST for EVENT
export async function GetSharedHostForEvents({event_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-event/${event_id}`,
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

//Get All Shared Pending Request for EVENT
export async function GetSharedHostForPendingEvents({event_id}) {
  var config = {
    method: 'GET',
    url: `${Server}/event/get-sharedhost-pending-event/${event_id}`,
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

//Delete Shared Host request
export async function DeleteSharedHostRequest({shared_host_id}) {
  var config = {
    method: 'DELETE',
    url: `${Server}/event/remove-sharedhost-request/${shared_host_id}`,
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

//Get All Payout for users
export async function GetAllPayoutStatusForEvents({user_id}) {
  console.log(`${Server}/event/get-all-payout-events/${user_id}`);
  var config = {
    method: 'GET',
    url: `${Server}/event/get-all-payout-events/${user_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
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

//Get Payout status for event
export async function GetAllPayoutStatusEvents({event_id}) {
  console.log(`${Server}/event/get-payout-status/${event_id}`);
  var config = {
    method: 'GET',
    url: `${Server}/event/get-payout-status/${event_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
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

//Delete Block user Or Unblock user
export async function UnblockUser(user_id, mutual_connection_id) {
  var data = JSON.stringify({
    user_id: user_id,
    mutual_connection_id: mutual_connection_id,
  });

  var config = {
    method: 'POST',
    url: `${Server}/user/unblock-user`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
//
export async function sendDirectInvite(data) {
  //  let dataSend = JSON.stringify({data})
  var config = {
    method: 'POST',
    url: `${Server}/direct-invite`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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

//Setting -> Contact Us
export async function ContactUs({
  current_user_id,
  name,
  email,
  number,
  message,
}) {
  var data = JSON.stringify({
    name: name,
    email: email,
    number: number,
    message: message,
  });

  var config = {
    method: 'POST',
    url: `${Server}/contact-us/${current_user_id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
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
