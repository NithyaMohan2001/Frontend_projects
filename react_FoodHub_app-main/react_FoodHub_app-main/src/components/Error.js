import { useRouteError } from "react-router-dom";

const Error = () => {
  let errorResponse = useRouteError();
  console.error(errorResponse);
  return (
    <div className="error_page">
      <p>
        {errorResponse.status} {errorResponse.statusText}
      </p>
      <p>{errorResponse.error.message}</p>
    </div>
  );
};

export default Error;
