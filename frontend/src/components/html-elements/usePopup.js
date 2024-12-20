import { useState } from "react";
import Popup from "./Popup";

export default function usePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        message: "",
        onConfirm: null,
        onClose: null,
        onComplete: null,
        confirmText: "Aceptar",
        closeText: "Cancelar",
    });

    const showPopup = ({ message, onConfirm, onClose, onComplete, confirmText, closeText }) => {
        setPopupConfig({ message, onConfirm, onClose, onComplete, confirmText, closeText });
        setIsVisible(true);
    };

    const hidePopup = () => setIsVisible(false);

    const PopupComponent = isVisible ? (
        <Popup
            message={popupConfig.message}
            onClose={() => {
                if (popupConfig.onClose) popupConfig.onClose();
                if (popupConfig.onComplete) popupConfig.onComplete();
                hidePopup();
            }}
            onConfirm={() => {
                if (popupConfig.onConfirm) popupConfig.onConfirm();
                if (popupConfig.onComplete) popupConfig.onComplete();
                hidePopup();
            }}
            confirmText={popupConfig.confirmText}
            closeText={popupConfig.closeText}
        />
    ) : null;

    return [PopupComponent, showPopup];
}