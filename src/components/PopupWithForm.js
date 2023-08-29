import "../index.css";

const PopupWithForm = ({ name, title, isOpen, onClose, children }) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size">
        <h2 className="popup__title popup__title_font-size">{title}</h2>
        {name === "trash" ? (
          <>{children}</>
        ) : (
          <form
            className="popup__form"
            name={`popup-${name}`}
            noValidate
          >
            {children}
          </form>
        )}
        <button
          onClick={onClose}
          aria-label="Close"
          type="button"
          className="popup__close"
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;
