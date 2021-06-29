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
