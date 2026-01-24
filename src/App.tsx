import React from "react";
import { User } from "@/domains/User";

const App = () => {
  const onClick = () => {
    User.changeEmail(1, "two@aaacompany.co.jp");
  };

  return (
    <div>
      <button onClick={onClick}>ボタン</button>
    </div>
  );
};

export default App;
