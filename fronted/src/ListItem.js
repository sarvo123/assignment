import React from "react";
import "./ListItem.css"; // Import your CSS file

function ListItem({ index, person }) {
  const { name, role, date, time } = person;

  return (
    <div className="list-item" key={index}>
      <div className="left">
        <p>{name}</p>
        <p>Role {role}</p>
      </div>
      <div className="right">
        <div>
          <span>
            {date}, {time}
          </span>
          <span style={{color : "blue", fontFamily: "sans-serif", fontSize: "15px"}}>View Histroy</span>
        </div>
        <button className="custom-button">Join Now</button>
      </div>
    </div>
  );
}

export default ListItem;
