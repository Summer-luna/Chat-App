import { Button } from "../form/button";
import { Link } from "react-router-dom";

export const ErrorElement = () => {
  return (
    <div>
      <h1>There must be something wrong, Go back home page.</h1>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};
