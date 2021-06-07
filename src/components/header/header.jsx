import React from "react";
import { PageHeader } from "antd";

const Header = () => {
  return (
    <header>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
      />
    </header>
  );
};

export default Header;
