'use client'

import { useState } from "react"
import { LoanRequest } from "../types/loan"

interface LoanRequestFormProps {
    onSuccess?: (request: LoanRequest) => void;
}

interface LoanRequestFormState {
    requestedBy: string;
    department: string;
    itemRequested: string;
    reason: string;
    neededFrom: string;
    neededUntil: string;
    notes: string;
}

export function LoanRequestForm({onSuccess}: LoanRequestFormProps) {
    const [formData, setFormData] = useState<LoanRequestFormState>({
        requestedBy: "",
        department: "",
        itemRequested: "",
        reason: "",
        neededFrom: "",
        neededUntil: "",
        notes: "",
    });

    const updateField = (
        field: keyof LoanRequestFormState, 
        value: string
    ) => setFormData((prev) => ({ ...prev, [field]: value }));

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="requestedBy">Requested By</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="requestedBy" 
                            value={formData.requestedBy}
                            onChange={(e) => updateField("requestedBy", e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="department">Department</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="department" 
                            value={formData.department}
                            onChange={(e) => updateField("department", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="itemRequested">Item Requested</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="itemRequested" 
                            value={formData.itemRequested}
                            onChange={(e) => updateField("itemRequested", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="reason">Reason</label>
                        <textarea 
                            className="form-control" 
                            id="reason" 
                            value={formData.reason}
                            onChange={(e) => updateField("reason", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="neededFrom">Needed From</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="neededFrom" 
                            value={formData.neededFrom}
                            onChange={(e) => updateField("neededFrom", e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="neededUntil">Needed Until</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="neededUntil" 
                            value={formData.neededUntil}
                            onChange={(e) => updateField("neededUntil", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label htmlFor="notes">Notes&nbsp;</label>
                        <small id="notes" className="form-text text-muted">(Optional)</small>
                        <textarea 
                            className="form-control" 
                            id="notes" 
                            value={formData.notes}
                            onChange={(e) => updateField("notes", e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit"className="border rounded px-4 py-2">
                    Submit Loan Request
                </button>
            </form>
        </div>
    );
}