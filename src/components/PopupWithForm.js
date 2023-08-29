import "../index.css";

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  children,
}) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size">
        <h2 className="popup__title popup__title_font-size">{title}</h2>
        {name === "trash" ? (
          <button
            aria-label="Delete"
            type="submit"
            className="popup__button popup__button_size"
          >
            Да
          </button>
        ) : (
          <form className="popup__form" name={`popup-${name}`} noValidate>
            {children}
            <button
              aria-label={buttonText}
              type="submit"
              className="popup__button"
            >
              {buttonText}
            </button>
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
