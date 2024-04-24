import './styles.css';
import { useState, useEffect } from 'react';

import { URL } from '../../common/constants/serverurl';

export default function SendDataToServer({ json }) {
    const [status, setStatus] = useState('idle'); // idle, pending

    useEffect(() => {
        if (status !== 'pending') return;

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(`
                Thank you for submitting your data
                Your AR Experience ID: ${data.api_experience_id ?? '1234567890'}
                `);
                setStatus('idle');
            })
            .catch((error) => {
                alert(
                    'An error occurred while sending the data to the server. Please try again later.'
                );
                console.error(error);
                setStatus('idle');
            });
    }, [status]);

    const submitData = (event) => {
        event.preventDefault();
        setStatus('pending');
    };

    return (
        <main className="container sendDataToServer">
            <form onSubmit={submitData} className="sendDataToServerForm">
                {status === 'pending' ? (
                    <p>Sending data to the server...</p>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <h1>Send Data to Server</h1>
                        <button type="submit" className="sendDataToServerButton">
                            Send
                        </button>
                    </div>
                )}
            </form>
        </main>
    );
}
