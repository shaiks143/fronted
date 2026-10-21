
import { useState } from "react";

function BidForm({ project, onClose, onSubmit }) {
    const [amount, setAmount] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [document, setDocument] = useState(null);
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const quotationAmount = Number(amount);
        const completionDays = Number(duration);

        if (!Number.isFinite(quotationAmount) || quotationAmount <= 0) {
            setError("Please enter a valid quotation amount.");
            return;
        }

        if (
            !Number.isInteger(completionDays) ||
            completionDays <= 0
        ) {
            setError("Please enter a valid completion time in days.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter your proposal description.");
            return;
        }

        onSubmit({
            projectId: project.id,
            amount: quotationAmount,
            duration: completionDays,
            description: description.trim(),
            document,
        });
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <section
                className="project-modal bid-form-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="bid-form-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="Close quotation form"
                >
                    ×
                </button>

                <span className="eyebrow">BUILDWISE QUOTATION</span>
                <h2 id="bid-form-title">Submit Your Bid</h2>
                <p className="project-location">{project.title}</p>

                <form className="bid-form" onSubmit={handleSubmit}>
                    <label htmlFor="bid-amount">
                        Quotation Amount (₹)
                    </label>
                    <input
                        id="bid-amount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        placeholder="Enter proposed amount"
                        required
                    />

                    <label htmlFor="bid-duration">
                        Estimated Completion Time (Days)
                    </label>
                    <input
                        id="bid-duration"
                        type="number"
                        min="1"
                        step="1"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                        placeholder="Example: 120"
                        required
                    />

                    <label htmlFor="bid-description">
                        Proposal Description
                    </label>
                    <textarea
                        id="bid-description"
                        rows="5"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Describe your proposed work, materials and timeline..."
                        required
                    />

                    <label htmlFor="bid-document">
                        Supporting Document (Optional)
                    </label>
                    <input
                        id="bid-document"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) =>
                            setDocument(event.target.files?.[0] ?? null)
                        }
                    />

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    <button type="submit" className="primary-action">
                        Submit Quotation
                    </button>
                </form>
            </section>
        </div>
    );
}

export default BidForm;
