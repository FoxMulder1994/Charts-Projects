
// This code has been inspired by the work develop by Daniel Shiffman in the website
// http://codingtra.in
// Earthquake Data Viz
// Video: https://youtu.be/ZiYdOwOrGyc

function World_Earthquakes() {
    
    
    this.name = 'World Earthquakes'
    this.id = 'earthquake'
    
    var c;
    var myMap;
    
    const options = {
      lat: 0,
      lng: 0,
      zoom: 0.75,
      style: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
       
    }

    this.preload = function()  {

        //Loading data from all the earthquakes in August 2021
        this.earthquakes= loadStrings('./data/Earthquakes/all_month.csv');
    }

    //Transforming lat & lon to x & y 
  
    const mappa=new Mappa('Leaflet');
    
    this.setup=function()
    {
        canvasContainer = select('#app');
        c = createCanvas(1025, 545);
        c.parent('app');
        myMap=mappa.tileMap(options);
        myMap.overlay(c);
        
    // Zoom options
    // This code was adapted from leaflet library documentation
               
      this.setInterval = (function()
     {
      this.map.setView([0, 0]);
      this.setTimeout(function(){
      this.map.setView([0, 0]);
        }, 2000);
      }, 4000);   
    }
    
    this.draw = function() {

        clear();
    
// The below code was taken (copied) from the code created by Daniel Shiffman in:
// http://codingtra.in
// Earthquake Data Viz 57
// Video: https://youtu.be/ZiYdOwOrGyc
        
        // Retrieving data from the Earthquake csv and slipt for every comma
        for (var i = 1; i < this.earthquakes.length; i++){
            var data  = this.earthquakes[i].split(/,/);
            this.lat  = data[1];
            this.lon  = data[2];
            this.magn = data[4]; // magn = Earthquake's magnitude
           
            if(this.lat!=undefined){
                this.location = myMap.latLngToPixel(this.lat, this.lon);                 
                this.magn=pow(this.magn,10);
                this.magn=sqrt(this.magn);
                this.magnmax=sqrt(pow(10,10));
                var d=map(this.magn,0,this.magnmax,0,180);               
                
                fill(150, 5, 5);
                noStroke();
                ellipse(this.location.x,this.location.y,d,d);
                              
            }
 
        }              

    }
    this.destroy=function(){
    }
    
}
