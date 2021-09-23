
// import React, { Component } from 'react';

// class GoogleDocsViewer extends Component {
//   render() {
//     //let iframeSrc = "https://docs.google.com/viewer?url=" + this.props.fileUrl + "&embedded=true";
//     let iframeSrc = this.props.fileUrl;

//     let style = {
//       width: this.props.width,
//       height: this.props.height,
//       border: 'none'
//     };

//     return (
//       <div>
//         <iframe src={iframeSrc}
//           style={style}></iframe>
//       </div>
//     );
//   }
// }

// export default GoogleDocsViewer;

import React from "react";

const DocIframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const src = source;

  


  return (
    <div>
      <iframe
        //src={"https://docs.google.com/viewer?url=" + src + "&embedded=true"}
        src={ src.replace('view', 'preview') }
        title="file"
        width="70%"
        height="600px"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default DocIframe;