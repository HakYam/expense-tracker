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

export async function register(username: string, email: string, password: string) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Failed to register:', data);
        throw new Error(data.error || 'Failed to register');
      }
  
      return data;
    } catch (error) {
      console.error('Error in register function:', error);
      throw error;
    }
  }
  