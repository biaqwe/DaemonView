'use client';

import styled, {keyframes} from 'styled-components';
import { useEffect } from 'react';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Orbitron', sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/images/background.png');
    background-size: cover;
    background-position: center;
    opacity: 0.15; /* Lower = more faded */
    pointer-events: none;
    z-index: 0;
  }

    > * {
    position: relative;
    z-index: 1;
  }
`;

const FormWrapper = styled.div`
  width: 400px;
  background: linear-gradient(#212121,rgb(33, 33, 33)) padding-box,
              linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  height: auto;

  /* Add subtle glowing effect */
  box-shadow:
    0 0 8px rgba(190, 75, 243, 0.4),
    0 0 16px rgba(91, 57, 182, 0.2),
    0 0 24px rgba(237, 73, 255, 0.15);
`;


const Title = styled.h2`
  text-align: center;
  color: white;
  font-size: 30px;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 1.3rem;
  font-size: 1rem;
  margin-bottom: 2rem;
  background-color: rgb(51, 50, 51);
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgb(210, 206, 224);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  }

  &:-webkit-autofill {
    background-color: rgb(51, 50, 51) !important;
    -webkit-box-shadow: 0 0 0px 1000px rgb(51, 50, 51) inset;
    -webkit-text-fill-color: white !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const Button = styled.button`
  width: 30%;
  justify-content: center;
  margin-top: 1rem;
  align-items: center;
  padding: 0.75rem;
  margin-left: 35%;
  background-color: #6b18ab;
  color: white;
  border: none;
  border-radius: 3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #7b1bc4;
    transform: scale(1.05);
    box-shadow:
      0 0 8px rgba(104, 0, 255, 0.4),
      0 0 16px rgba(64, 201, 255, 0.2),
      0 0 24px rgba(232, 28, 255, 0.15);
  }
`;

const Links = styled.div`
  margin-top: 1rem;
  text-align: center;

  a {
    color: rgb(62, 147, 245);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      text-decoration: underline;
      text-shadow: 0 0 10px rgba(62, 147, 245, 0.8);
      transform: scale(1.05);
    }
  }
`;

const LoginForm: React.FC = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/check-auth', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          router.push('/dashboard'); // Already logged in
        }
      });
  }, []);

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send POST request to the Express backend
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
      credentials: 'include'
    });

    const data = await response.json();

    if (response.status === 200) {
      // Redirect user on successful login
      router.push('/dashboard'); // Redirect to the dashboard or other page
    } else {
      setError(data.message); // Display error message from the backend
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Login</Button>
        </form>
        <Links>
          <a href="/login/forgot-password">Forgot Password?</a> | {' '}
          <a href="/register">Register</a>
        </Links>
      </FormWrapper>
    </Container>
  );
};

export default LoginForm;
