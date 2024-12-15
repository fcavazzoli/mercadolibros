import { useState } from "react";
import Popup from "./Popup";

export default function usePopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        message: "",
        onConfirm: null,
        confirmText: "Aceptar",
        closeText: "Cancelar",
    });

    const showPopup = ({ message, onConfirm, confirmText, closeText }) => {
        setPopupConfig({ message, onConfirm, confirmText, closeText });
        setIsVisible(true);
    };

    const hidePopup = () => setIsVisible(false);

    const PopupComponent = isVisible ? (
        <Popup
            message={popupConfig.message}
            onClose={hidePopup}
            onConfirm={() => {
                if (popupConfig.onConfirm) popupConfig.onConfirm();
                hidePopup();
            }}
            confirmText={popupConfig.confirmText}
            closeText={popupConfig.closeText}
        />
    ) : null;

    return [PopupComponent, showPopup];
}