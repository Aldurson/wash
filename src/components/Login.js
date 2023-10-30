import img1 from "../img/logo1.png";

export const Login = () => {
  return (
    <div className="logBlock">
      <nav className="navInfo">
        <p>Welcome to Run/Cycle Tracker</p>
        <img className="logo" src={img1} alt="no pic" />
        <form className="login">
          <input className="login__input" placeholder="Just Click" />
          <input className="login__input" placeholder="Submit" />
          <button
            className="login__btn"
            onClick={(evt) => {
              evt.preventDefault();
              const log = evt.target.closest("div");
              log.style.opacity = 0;
              log.style.zIndex = 0;
            }}
          >
            &rarr;
          </button>
        </form>
      </nav>
    </div>
  );
};
