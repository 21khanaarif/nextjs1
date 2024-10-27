import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json(); // Only email and password received from the form

  try {
    // Automatically set username as email
    const username = email;

    const strapiRes = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,  // username will be the same as email
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (!strapiRes.ok) {
      const errorMessage = data.error?.message || data.message || 'Unknown error occurred';
      return NextResponse.json({ message: errorMessage }, { status: strapiRes.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}









