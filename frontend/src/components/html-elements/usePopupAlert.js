import { useState } from "react";
import Popup from "./Popup";

export default function usePopupAlert() {
    const [isVisible, setIsVisible] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        message: "",
        onConfirm: null,
        confirmText: "Aceptar",
        closeText: "Cancelar",
    });

    const popupAlert = (message) => {
        setPopupConfig({ message });
        setIsVisible(true);
    }

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

    return [PopupComponent, popupAlert];
}