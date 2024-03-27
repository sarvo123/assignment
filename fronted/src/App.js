import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import ListItem from "./ListItem";

function App() {
  const [interviewsByDay, setInterviewsByDay] = useState({});
  const [loading, setLoading] = useState(true);
  const [showMore , setShowMore] = useState(false);
  const itemToShow = 4;

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = async () => {
    try {
      const res = await axios.get("http://localhost:4000/interviews");
      const interviews = res.data.interviews;

      const interviewsGroupedByDay = {};
      interviews.forEach((interview) => {
        const { name, role, date, time, day } = interview;
        if (!interviewsGroupedByDay[day] ) {
          interviewsGroupedByDay[day] = [];
        }
        interviewsGroupedByDay[day].push({ name, role, date, time });
      });

      // Add Tomorrow key with an empty array
      interviewsGroupedByDay["Tomorrow"] = [];

      setInterviewsByDay(interviewsGroupedByDay);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore); // Toggle showMore state on button click
  };

  return (
    <div className="App">
      <Header onShowMoreClick={handleShowMore} showMore={showMore} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {Object.keys(interviewsByDay).sort((day1, day2) => { // Sort days in desired order (Today, Tomorrow, Other dates)
              if (day1 === "Today") return -1;
              if (day2 === "Today") return 1;
              if (day1 === "Tomorrow") return -1;
              if (day2 === "Tomorrow") return 1;
              return 0;
            }).slice(0, showMore ? interviewsByDay.length : 2).map((day) => (
            <div key={day}>
              <h2 style={{fontWeight : "bolder" ,textDecoration: "underline" }}>{day}</h2>
              {interviewsByDay[day].length > 0 ? (
                interviewsByDay[day].map((person, index) => (
                  <ListItem key={index} person={person} />
                ))
              ) : (
                <div>No interviews scheduled for {day}</div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
