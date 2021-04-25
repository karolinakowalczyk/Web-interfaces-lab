import { createUUID } from "../utils/createUUID";
import './members.css';


const Members = ({ name, description, email, tags }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h4 class="card-title">{name}</h4>
        <p class="card-text">{description}</p>
        <p class="card-text">{email}</p>
        <ul>
          {tags.map((tag) => (
            <li key={createUUID(tag)}>#{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Members;
