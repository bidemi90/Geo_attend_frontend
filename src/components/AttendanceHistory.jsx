import { useEffect } from "react";
import { ListGroup, Badge, Spinner } from "react-bootstrap";
import { FcApproval } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpdatedUserData,
  featchinguser,
  featchinguserfailed,
  featchinguserSuccessful,
} from "./Redux/userdata";

const AttendanceHistory = () => {
  const dispatch = useDispatch();
  const { isFetchinguser, userdata, isFeatchinguserfailed } = useSelector(
    (state) => state.userdata
  );

  useEffect(() => {
    // Optional: prevent refetch if already fetched
    if (!userdata.user?.markedAttendances) {
      dispatch(fetchUpdatedUserData());
    }
  }, [dispatch, userdata.user]);

  const attendanceHistory = userdata?.user?.markedAttendances || [];

  return (
    <div>
      <h4 className="text-success fw-bold mb-3">Attendance Timeline</h4>

      {isFetchinguser ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : isFeatchinguserfailed ? (
        <p className="text-danger">Failed to load attendance history.</p>
      ) : attendanceHistory.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <ListGroup>
          {attendanceHistory.map((entry, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="text-start">
                <p className=" text-capitalize fw-bold">code: {entry.name}</p>
                <hr className="my-1" />
                <p className="m-0 fw-normal">
                  <span className="fw-semibold">Marked:</span>{" "}
                  {new Date(entry.markedAt).toLocaleString()}
                </p>
              </div>
              <Badge bg="success" pill>
                <FcApproval className="fs-4" />
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default AttendanceHistory;
