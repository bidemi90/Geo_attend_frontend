import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileCard = ({ name, id, email, role, gender, avatarUrl, onEdit, onUpload }) => {
  return (
    <div className="card p-4 shadow-sm border-0 rounded-4 bg-light col-11 col-md-7">
      <div className="d-flex flex-column align-items-center text-center">
        {/* Avatar or Icon */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <FaUserCircle className="text-success mb-3" size={100} />
        )}

        <h3 className="fw-bold text-capitalize">{name}</h3>
        <p className="text-muted">{role}</p>

        <div className="mt-3 w-100 text-start">
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>ID:</strong>
            <span>{id}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>Email:</strong>
            <span>{email}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>Gender:</strong>
            <span>{gender}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex gap-3">
          <button onClick={onEdit} className="btn btn-success">
            Update Profile
          </button>
          <button onClick={onUpload} className="btn btn-outline-success">
            {avatarUrl ? "Change Photo" : "Upload Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
