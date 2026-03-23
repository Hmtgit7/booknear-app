'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type AuthMode = 'login' | 'register';
type PublicRole = 'CUSTOMER' | 'SALON_OWNER';

interface AuthResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: PublicRole;
  accessToken: string;
  expiresIn: number;
}

interface ProfileResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: PublicRole;
}

const ACCESS_TOKEN_KEY = 'booknear.access_token';

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3001/api/v1';
}

export default function Home() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [profile, setProfile] = useState<ProfileResponse | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<PublicRole>('CUSTOMER');

  const apiBaseUrl = useMemo(() => getApiBaseUrl(), []);

  useEffect(() => {
    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return;
    }

    void loadProfile(token);
  }, []);

  async function requestJson<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });

    const payload = (await response.json()) as
      | TResponse
      | {
          message?: string | string[];
        };

    if (!response.ok) {
      const serverMessage =
        typeof payload === 'object' && payload !== null && 'message' in payload
          ? payload.message
          : undefined;
      const normalizedMessage = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : serverMessage;

      throw new Error(normalizedMessage ?? 'Request failed. Please try again.');
    }

    return payload as TResponse;
  }

  async function loadProfile(token: string): Promise<void> {
    try {
      setIsBusy(true);
      setError('');
      const currentProfile = await requestJson<ProfileResponse>('/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(currentProfile);
      setMessage(`Welcome back, ${currentProfile.firstName}.`);
    } catch {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      setProfile(null);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsBusy(true);
    setError('');
    setMessage('');

    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const body =
        mode === 'login'
          ? { email, password }
          : {
              email,
              password,
              firstName,
              lastName,
              phone,
              role,
            };

      const auth = await requestJson<AuthResponse>(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
      });

      window.localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
      setProfile({
        id: auth.id,
        email: auth.email,
        firstName: auth.firstName,
        lastName: auth.lastName,
        phone: auth.phone,
        role: auth.role,
      });

      setMessage(
        mode === 'login'
          ? `Signed in as ${auth.firstName} ${auth.lastName}.`
          : `Account created for ${auth.firstName} ${auth.lastName}.`,
      );
      setPassword('');
    } catch (submitError) {
      const parsedError =
        submitError instanceof Error ? submitError.message : 'Unable to complete the request.';
      setError(parsedError);
    } finally {
      setIsBusy(false);
    }
  }

  function logout(): void {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    setProfile(null);
    setMessage('You are now signed out.');
    setError('');
  }

  return (
    <div className="page-shell">
      <main className="auth-stage">
        <section className="auth-intro">
          <p className="eyebrow">Salon | Spa | Parlour</p>
          <h1>BookNear Access</h1>
          <p>
            Manage customer bookings, staff schedules, and salon operations with one secure sign-in.
          </p>
          <div className="status-row">
            <span>API</span>
            <code>{apiBaseUrl}</code>
          </div>
        </section>

        <section className="auth-card" aria-live="polite">
          {profile ? (
            <div className="profile-panel">
              <h2>Signed In</h2>
              <p>
                {profile.firstName} {profile.lastName}
              </p>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <p>{profile.role}</p>
              <button type="button" onClick={logout} className="secondary-btn">
                Logout
              </button>
            </div>
          ) : (
            <>
              <div className="mode-switch" role="tablist" aria-label="Auth mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'login'}
                  className={mode === 'login' ? 'active' : ''}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'register'}
                  className={mode === 'register' ? 'active' : ''}
                  onClick={() => setMode('register')}
                >
                  Register
                </button>
              </div>

              <form className="auth-form" onSubmit={(event) => void handleSubmit(event)}>
                {mode === 'register' ? (
                  <>
                    <label>
                      First Name
                      <input
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                        autoComplete="given-name"
                      />
                    </label>
                    <label>
                      Last Name
                      <input
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                        autoComplete="family-name"
                      />
                    </label>
                    <label>
                      Phone
                      <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                        autoComplete="tel"
                      />
                    </label>
                    <label>
                      Account Role
                      <select
                        value={role}
                        onChange={(event) => setRole(event.target.value as PublicRole)}
                      >
                        <option value="CUSTOMER">Customer</option>
                        <option value="SALON_OWNER">Salon Owner</option>
                      </select>
                    </label>
                  </>
                ) : null}

                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                  />
                </label>

                <label>
                  Password
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={8}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                </label>

                <button className="primary-btn" type="submit" disabled={isBusy}>
                  {isBusy ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>
            </>
          )}

          {error ? <p className="notice error">{error}</p> : null}
          {message ? <p className="notice success">{message}</p> : null}
        </section>
      </main>
    </div>
  );
}
