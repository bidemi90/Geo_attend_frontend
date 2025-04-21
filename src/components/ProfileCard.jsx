import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  featchinguser,
  featchinguserfailed,
  featchinguserSuccessful,
  fetchUpdatedUserData,
} from "../components/Redux/userdata";

const ProfileCard = ({ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  console.log(userdata.user);
  const onEdit = () => {
    console.log("Edit profile clicked");
  };
  const onUpload = () => {
    console.log("Upload photo clicked");
  };

  return (
    <div className="card p-4 shadow-sm border-0 rounded-4 bg-light col-11 col-md-7">
      <div className="d-flex flex-column align-items-center text-center">
        {/* Avatar or Icon */}
        {userdata.user.profileImage  ? (
          <img
            src={userdata.user.profileImage}
            alt="User Avatar"
            className="rounded-circle mb-3"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        ) : (
          <FaUserCircle className="text-success mb-3" size={100} />
        )}

        <h3 className="fw-bold text-capitalize">{userdata.user.full_name}</h3>

        <div className="mt-3 w-100 text-start">
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>ID:</strong>
            <span>{userdata.user.matric_number}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>Email:</strong>
            <span>{userdata.user.email}</span>
          </div>
          <div className="d-flex justify-content-between border-bottom py-2">
            <strong>Gender:</strong>
            <span>{userdata.user.gender?userdata.user.gender:"---------"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 d-flex gap-3">
          <button onClick={onEdit} className="btn btn-success">
            Update Profile
          </button>
          <button onClick={onUpload} className="btn btn-outline-success">
            {userdata.user.profileImage ? "Change Photo" : "Upload Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
