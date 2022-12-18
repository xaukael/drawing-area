Hooks.on('hoverDrawing', (drawing, hovered)=>{
  if (!hovered) return $('#hud').find('span.area').remove();
  var total = 0;
  var pixels = canvas.scene.grid.size;
  var units = canvas.scene.grid.distance;
  switch (drawing.document.shape.type) {
    case 'f':
    case 'p':
      vertices = drawing.document.shape.points.reduce((a,p,i)=> {
                if(i%2) a[Math.floor(i/2)].y = p/pixels;
                else a.push({x:p/pixels});
                return a;
              }, []);
      for (var i = 0, l = vertices.length; i < l; i++) {
        var addX = vertices[i].x;
        var addY = vertices[i == vertices.length - 1 ? 0 : i + 1].y;
        var subX = vertices[i == vertices.length - 1 ? 0 : i + 1].x;
        var subY = vertices[i].y;

        total += (addX * addY * 0.5);
        total -= (subX * subY * 0.5);
      }
      total = Math.abs(total)*(units**2);
      break;
    case 'e':
      total = (Math.PI * drawing.document.shape.width/pixels/2*drawing.document.shape.height/pixels/2)*units**2;
      break;
    case 'r':
      total = drawing.document.shape.width/pixels*drawing.document.shape.height/pixels*units**2;
      break;
  }
  $('#hud').append($(`<span class="area" 
  style="position: absolute; white-space:nowrap;pointer-events: none; color: white;position: absolute; transform: translate(-50%, 0%); text-shadow: 0 0 10px black;
  left: ${drawing.center.x}px; top: ${drawing.center.y-canvas.scene.dimensions.size/3}px; font-size: ${canvas.scene.dimensions.size/2}px;">
  ${Math.round(total*100)/100} ${canvas.scene.grid.units}<sup>2</sup></span>`))
    
});