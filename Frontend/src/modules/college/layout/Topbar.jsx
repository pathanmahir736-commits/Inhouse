export default function CollegeTopbar({ onMenuClick }) {
  return (
    <header className="h-14 bg-white border-b flex items-center px-4 justify-between">
      <button
        onClick={onMenuClick}
        className="md:hidden text-xl"
      >
        ☰
      </button>

      <h1 className="font-medium">College Dashboard</h1>

      <div className="text-sm text-gray-600">
        College Admin
      </div>
    </header>
  );
}
