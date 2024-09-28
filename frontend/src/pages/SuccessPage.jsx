import React from 'react';

function SuccessPage() {
    return (
        <div className="success-container">
            <h1>Registration Successful!</h1>
            <p>Thank you for registering. You can now <a href="/login">log in</a>.</p>
        </div>
    );
}

export default SuccessPage;
