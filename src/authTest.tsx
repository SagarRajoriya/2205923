import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// This is a standalone component to test authentication
const AuthTester: React.FC = () => {
    const [status, setStatus] = React.useState<string>('Not started');
    const [token, setToken] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const testAuth = async (forceRefresh = false) => {
        try {
            setStatus(forceRefresh ? 'Regenerating token...' : 'Testing...');
            setError(null);

            // Directly make the auth request without using the service
            const requestBody = {
                clientID: "d9cbb699-6a27-44a5-8d59-8b1befa816da",
                clientSecret: "tVJaaaRBSeXcRXeM"
            };

            console.log('Making direct auth request with:', requestBody);

            const response = await axios.post(
                'http://20.244.56.144/evaluation-service/auth',
                requestBody
            );

            console.log('Raw response:', response);

            if (response.data?.access_token) {
                const fullToken = `${response.data.token_type} ${response.data.access_token}`;
                setToken(fullToken);
                setStatus(forceRefresh ? 'Token regenerated successfully' : 'Success');

                // Test a subsequent API call with this token
                try {
                    const usersResponse = await axios.get(
                        'http://20.244.56.144/evaluation-service/users',
                        {
                            headers: {
                                'Authorization': fullToken
                            }
                        }
                    );
                    console.log('Users API response:', usersResponse.data);
                    setStatus(`${forceRefresh ? 'Token regenerated' : 'Success'} - Users API responded`);
                } catch (err) {
                    console.error('Error calling users API:', err);
                    setStatus(`${forceRefresh ? 'Token regenerated' : 'Auth successful'} but users API failed`);
                }
            } else {
                setStatus('Failed - Invalid response format');
                setError('Response did not contain access_token');
            }
        } catch (err) {
            console.error('Auth test error:', err);
            setStatus('Failed');
            setError(err.response?.data?.message || err.message || 'Unknown error');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Authentication Test</h1>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => testAuth()} style={{ padding: '10px 20px' }}>
                    Test Authentication
                </button>
                <button
                    onClick={() => testAuth(true)}
                    style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: 'white', border: 'none' }}
                >
                    Regenerate Token
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Status: {status}</h2>
                {error && (
                    <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
                        {error}
                    </div>
                )}
            </div>

            {token && (
                <div style={{ marginBottom: '20px' }}>
                    <h3>Token:</h3>
                    <textarea
                        readOnly
                        value={token}
                        style={{ width: '100%', height: '100px', marginTop: '10px' }}
                    />
                </div>
            )}
        </div>
    );
};

// Render directly to test authentication
ReactDOM.render(
    <React.StrictMode>
        <AuthTester />
    </React.StrictMode>,
    document.getElementById('root')
);