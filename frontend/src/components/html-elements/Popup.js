import React from "react";

function Popup({ message, onClose, onConfirm, confirmText = "OK", closeText = "Cancel" }) {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <div className="popup-message">
                    <p>{message}</p>
                </div>
                <div className="popup-actions">
                    {onConfirm && (
                        <button className="popup-button confirm" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    )}
                    <button className="popup-button cancel" onClick={onClose}>
                        {closeText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;