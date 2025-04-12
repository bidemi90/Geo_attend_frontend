import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
  return (
   <>
    <div className=" profileholder d-flex  justify-content-center align-items-center">
      <ProfileCard
        name="Sodiq Abdullahi Bidemi"
        id="CSC123456"
        email="abdullahi@example.com"
        gender="Male"
        role="Student"
        avatarUrl={null} // or pass a real image URL
        onEdit={() => console.log("Edit profile clicked")}
        onUpload={() => console.log("Upload photo clicked")}
      />
    </div>
   </>
  );
};

export default ProfilePage;
