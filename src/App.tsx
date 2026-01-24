import React from "react";
import { UserController } from "@/domains/UserController";

const App = () => {
  const onClick = () => {
    UserController.changeEmail(1, "two@customer.co.jp");
  };

  return (
    <div>
      <button onClick={onClick}>ボタン</button>
    </div>
  );
};

export default App;
