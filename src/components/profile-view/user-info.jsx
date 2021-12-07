import React from "react";

export function UserInfo({ name, email }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>User: {name}</p>
      <p>Email: {email}</p>
    </>
  );
}
