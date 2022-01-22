import React from "react";

export default function EmbedVideo(props) {
  const text = props.text;
  const matches = text.match(/\bhttps?:\/\/\S+/gi);
  let urlList = [];
  if (matches && matches.length >= 0) {
    for (let url of matches) {
      var regEx =
        "^(?:https?:)?//[^/]*(?:youtube(?:-nocookie)?.com|youtu.be).*[=/]([-\\w]{11})(?:\\?|=|&|$)";
      var code = url.match(regEx);
      var finalUrl =
        "https://www.youtube.com/embed/" + code[1] + "?autoplay=0&mute=1";
      urlList.push(finalUrl);
      //console.log(code[1]);
    }
  }

  let stringItem;
  if (urlList && urlList.length >= 0) {
      stringItem = urlList.map((urlList) => (
        <iframe
          id="player"
          src={urlList}
          frameborder="0"
          width="400"
          height="250"
        ></iframe>
      ));
  }

  return (
    <div>
      {stringItem}
    </div>
  );
}
