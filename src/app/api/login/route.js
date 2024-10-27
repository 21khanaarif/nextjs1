// src/app/api/login/route.js

export async function POST(req) {
    const { email, password } = await req.json();
  
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
      // If successful, return the response to the client
      return new Response(JSON.stringify(data), {
        status: 200,
      });
    } else {
      // If there's an error, pass the error message back
      return new Response(JSON.stringify(data), {
        status: strapiRes.status,
      });
    }
  }
  














