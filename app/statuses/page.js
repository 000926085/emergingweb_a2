'use client'

import { useState } from "react";
import { lookupStatus } from "../actions";

export default function StatusRequests() {
    const [trackingCode, setTrackingCode] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setTrackingCode('');

        const result = await lookupStatus(trackingCode);

        if (result?.error) {
            setError(result.error);
        }
    }

    return (
        <div className='mx-3'>
            <h1>Request Status Lookup</h1>

            <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
                <div className="col-auto">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="inputTracking"
                        id="inputTracking" 
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="Enter tracking code" 
                        required
                    />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {error && (
                <div className="text-danger mt-2" role="alert">
                    {error}
                </div>
            )}
        </div>
    );
}