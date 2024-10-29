// src/app/api/login/route.js

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    // Forward the request to Strapi's local auth endpoint
    const strapiRes = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Check if the user is verified
      const userId = data.user.id;
      const userRes = await fetch(`http://localhost:1337/api/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.jwt}`,
          'Content-Type': 'application/json',
        },
      });

      const user = await userRes.json();

      // Check if the user is verified and add that to the response
      return new Response(
        JSON.stringify({
          jwt: data.jwt,
          user: { ...data.user, is_verified: user.is_verified },
        }),
        { status: 200 }
      );
    } else {
      // If there's an error, pass the error message back
      return new Response(JSON.stringify(data), {
        status: strapiRes.status,
      });
    }
  } catch (error) {
    console.error('Login Error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    });
  }
}
