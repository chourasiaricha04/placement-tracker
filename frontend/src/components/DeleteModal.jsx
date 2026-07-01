import "../styles/DeleteModal.css";



function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
}) {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Delete Company?</h2>

        <p>
          Are you sure you want to delete this company?
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;