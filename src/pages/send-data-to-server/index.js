import './styles.css';
import { useState, useEffect } from 'react';

import { URL } from '../../common/constants/serverurl';

export default function SendDataToServer({ json }) {
    const [status, setStatus] = useState('idle'); // idle, pending

    useEffect(() => {
        if (status !== 'pending') return;

        // Fetch the session data from the server
        fetch('http://localhost:3000/get-session-data', {
            method: 'GET',
            body: null
        })
            .then((response) => response.json())
            .then((data) => {
                const arExperienceId = data.ar_experience_id;

                if (arExperienceId) 
                {
                    fetch(URL + arExperienceId, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            'navigation': JSON.parse(json)
                    }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert(`
                            Thank you for submitting your data
                            Your AR Experience ID: ${arExperienceId}
                            `);
                            setStatus('idle');
                        })
                        .catch((error) => {
                            alert(
                                'An error occurred while sending the data to the server. Please try again later.'
                            );
                            setStatus('idle');
                        });
                }
                else
                {
                    alert(
                        'An error occurred while fetching the AR Experience ID. Please try again later.'
                    );
                    setStatus('idle');
                }
            })
            .catch((error) => console.error('Error fetching session data:', error));

    }, [status, json]);

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
