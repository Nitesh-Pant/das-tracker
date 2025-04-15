import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setTopics(res.data.progress);
      } catch (err) {
        console.error("Failed to load progress", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // or however you store auth
    navigate("/"); // redirect to login
  };

  const handleCheckboxChange = async (topicId, problemIndex) => {
    try {
      await API.put(`/topics/mark/${topicId}/${problemIndex}`);
      setTopics((prev) =>
        prev.map((topic) =>
          topic._id === topicId
            ? {
              ...topic,
              problems: topic.problems.map((p, i) =>
                i === problemIndex ? { ...p, isCompleted: !p.isCompleted } : p
              )
            }
            : topic
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name} 👋
        </h1>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>
      {topics.length === 0 ? (
        <p>No DSA topics assigned yet.</p>
      ) : (
        topics.map((topic) => (
          <div key={topic._id} className="mb-6 p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">{topic.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topic.problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={problem.isCompleted}
                    onChange={() => handleCheckboxChange(topic._id, index)}
                  />
                  <div>
                    <p className="font-medium">{problem.title} -
                      <span className={`ml-2 text-sm font-semibold ${problem.level === "Easy" ? "text-green-600" : problem.level === "Medium" ? "text-yellow-600" : "text-red-600"}`}>
                        {problem.level}
                      </span>
                    </p>
                    <div className="text-sm text-blue-700 space-x-4 mt-1">
                      {problem.youtubeLink && <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer">YouTube</a>}
                      {problem.codeLink && <a href={problem.codeLink} target="_blank" rel="noopener noreferrer">Leetcode</a>}
                      {problem.articleLink && <a href={problem.articleLink} target="_blank" rel="noopener noreferrer">Article</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))

      )}
    </div>
  );
};

export default Dashboard;
