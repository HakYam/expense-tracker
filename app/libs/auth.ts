export async function login (email: string, password: string) {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // body data type must match "Content-Type" header which is json
            email,
            password,
        }),
    });

    const data = await response.json(); // parses JSON response into native JavaScript objects
    return data;
}

export const register = async (email: string, password: string, name: string) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    const data = await response.json();
    return { error: data.error };
  }

  const data = await response.json();
  return { user: data.user, token: data.token };
};
