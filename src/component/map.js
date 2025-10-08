import React from "react";


const Map = () => {
   
    
      return (
        // Important! Always set the container height explicitly
        <div className="mapouter" id="gmapres">
  <div className="gmap_canvas" >
    <iframe
      className="gmap_iframe"
      width="100%"
      frameBorder={0}
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
      src="https://maps.google.com/maps?width=480&height=300&hl=en&q=Sarjapura Road Bengaluru &t=&z=14&ie=UTF8&iwloc=B&output=embed"
    />
    <a href="https://piratebay-proxys.com/">Piratebay</a>
  </div>
  <style
    dangerouslySetInnerHTML={{
      __html:
        ".mapouter{position:relative;text-align:right;width:100%;height:300px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:360px;}.gmap_iframe {height:400px!important;}"
    }}
  />
</div>
      );
}

export default Map
