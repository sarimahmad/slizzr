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

  return fetch(`${Server}/event/user-attended/`+user_id)
    .then(async (response) => {
     return await response.json()
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
export async function getUserEvents(user_id) {

  return fetch(`${Server}/event/user-hosted/`+user_id)
    .then(async (response) => {
     return await response.json()
    })
    .catch((error) => {
      console.error(error);
    });
  }
  export async function getEventDetail(event_id) {

    return fetch(`${Server}/event/`+event_id)
      .then(async (response) => {
       return await response.json()
      })
      .catch((error) => {
        console.error(error);
      });
    }
    export async function getAttendeesList(event_id) {

      return fetch(`${Server}/event/get-attendees/`+event_id)
        .then(async (response) => {
         return await response.json()
        })
        .catch((error) => {
          console.error(error);
        });
      }
       