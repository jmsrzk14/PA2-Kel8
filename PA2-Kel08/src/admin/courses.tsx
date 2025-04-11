
const CoursesContent = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Courses</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Dashboard cards */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Students</h3>
        <p className="text-3xl font-bold text-indigo-600">1,234</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Courses</h3>
        <p className="text-3xl font-bold text-indigo-600">12</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Assignments</h3>
        <p className="text-3xl font-bold text-indigo-600">48</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Messages</h3>
        <p className="text-3xl font-bold text-indigo-600">15</p>
      </div>
    </div>
  </div>
);

export default CoursesContent;