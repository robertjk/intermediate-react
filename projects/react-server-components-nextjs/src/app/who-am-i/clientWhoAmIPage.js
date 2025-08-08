"use client";

import updateUsername from "./updateUsername";

export default function ClientWhoAmIPage({ children, id }) {
  return (
    <div>
      {children}
      <form action={updateUsername}>
        <label>
          Enter new username:
          <input type="text" name="username" placeholder="Username" />
        </label>
        <input type="hidden" name="id" value={id} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
