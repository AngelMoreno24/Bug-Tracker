import { Outlet } from "react-router-dom";

export default function EntryLayout() {
  return (
    <div>
      <h1>Entry Layout</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}