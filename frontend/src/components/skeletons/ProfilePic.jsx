import React from 'react'
import ContentLoader from "react-content-loader";

const ProfilePic = () => {
  return (
    <ContentLoader
    speed={2}
    width={100}
    height={100}
    viewBox="0 0 100 100"
    backgroundColor="#e0e0e0" // Light grey background
    foregroundColor="#bdbdbd" // Dark grey foreground
    uniqueKey="profile-pic-loader"
  >
    <circle cx="200" cy="200" r="40" />
  </ContentLoader>
  )
}

export default ProfilePic