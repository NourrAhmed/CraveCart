import { useNavigate } from "react-router-dom";

const AccountSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-[#424242] shadow-lg rounded-2xl p-4 h-fit">
      <nav className="space-y-4">
        <button
          onClick={() => navigate("/orders")}
          className="w-full text-left px-4 py-2 rounded-xl bg-[#800020] text-white transition"
        >
          Orders
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="w-full text-left px-4 py-2 rounded-xl bg-[#800020] text-white transition"
        >
          Cart
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;
