import React from "react";

function ErrorPage() {
  return (
    <div>
      <img src={require("../assets/icons/windy.png")} />
      Oh no! This website is not working at the moment! We will be back soon!
    </div>
  );
}

export default ErrorPage;
