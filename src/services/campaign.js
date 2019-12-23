export async function loadInvite(invite) {
  const response = await fetch(`/api/campaign/${invite}`, {
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}

export async function join(body) {
  const response = await fetch(`/api/campaign`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    }
  })
  return await response.json()
}