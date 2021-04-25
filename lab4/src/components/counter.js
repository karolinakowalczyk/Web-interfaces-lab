import './counter.css';
const Counter = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { membersNumber } = props;
    return (
        <p className="counter"> I found {props.membersNumber} candidates.</p>
    );
  };

export default Counter;
