// This code is adapted from the code created by Daniel Shiffman in:
// http://codingtra.in
// Earthquake Data Viz 57
// Video: https://youtu.be/ZiYdOwOrGyc
// Data from the USGS by mapping the latitude


function World_PSA(){
    this.name = 'World Primary School Age';
    this.id = 'Nation-PSA';
    this.data; 
    
   // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
    this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/Nation-PSA/NationsPSA.csv', 'csv', 'header',
      function(table) {
        self.loaded = true;
      });        

    };
    
    // Setting up the code...
    this.setup=function(){ 
        stroke(173, 0, 0);
        strokeWeight(4);
        this.LabelYears=[].concat((this.data.findRow("1970","Country Name").arr));
        this.LabelYears.splice(this.LabelYears.length-49,49);
        this.years=[];
        for(var i=1970; i<=2020;i++){
            this.years.push(i);
        }
        
        // Selecting the country
        this.sel=createSelect();
        this.sel.position(width/2, 600)
        this.CountryNames=this.data.getColumn("Country Name");
        for(var i=0; i<this.CountryNames.length-2;i++){
            this.sel.option(this.CountryNames[i]);
        }
    }
    this.layout={
        xStart:70,
        yStart:505,
        
        xLength:function(){return this.xStart+910},
        yLength:function(){return this.yStart-500},
        
        psaGrowthRange:function(nationPSA){
            this.lowest=0;
            this.highest=0;
            for(var i=0; i<nationPSA.length;i++){
                if(nationPSA[i]!=""){
                    if(parseFloat(nationPSA[i])<parseFloat(this.lowest)){
                            this.lowest=nationPSA[i];
                    }
                    if(parseFloat(nationPSA[i])>parseFloat(this.highest)){
                        this.highest=nationPSA[i];
                    }
                }
            }
            this.arr=[];
            if(this.lowest>0){
                this.lowest=0;
            }else{
                this.lowest=floor(this.lowest/10)*10;
            }
            this.highest=ceil(this.highest/10)*10;
            for(var i=this.lowest;i<this.highest+1;i+=5){
                this.arr.push(i);
            }
            return this.arr;
        },
        
        drawGraph:function(years,nationPSA){
            this.numXTickLabels=years.length;
            this.numYTickLabels=this.psaGrowthRange(nationPSA).length;
            
            line(this.xStart,this.yStart,this.xLength(),this.yStart);
            line(this.xStart,this.yStart,this.xStart,this.yLength()+this.yLabelWidth());
            
            //draw the labels
            textSize(20);
            text("YEARS",(this.xStart+this.xLength())/2,this.yStart+50);
            text("%",this.xStart-50,(this.yStart+this.yLength())/2);
            textSize(18);
            for(var i=0; i<this.numXTickLabels;i++){
                textAlign(CENTER);
                text(years[i],this.xStart+this.xLabelWidth()*i,this.yStart+40);
                line(this.xStart+this.xLabelWidth()*i,this.yStart+6,this.xStart+this.xLabelWidth()*i,this.yLength()+this.yLabelWidth());               
            }
            
            for(var i=0; i<this.numYTickLabels;i++)
            {
                textAlign(BASELINE);
                text(this.psaGrowthRange(nationPSA)[i],this.xStart-30,this.yStart-abs(this.yLabelWidth())*i);
                line(this.xStart-5,this.yStart-this.yLabelWidth()*i,this.xLength(),this.yStart-this.yLabelWidth()*i);
                
            }         
            
        },
        
        xLabelWidth:function(){
            return floor(this.xLength()/(this.numXTickLabels-1))
            
        },
        yLabelWidth:function(){
            return dist(this.xStart,this.yLength(),this.xStart,this.yStart)/this.numYTickLabels
        },   
    }
    
    this.plotGraphs=function(x1,y1,x2,y2){
        stroke(173, 0, 0);
        strokeWeight(4);
        //line here
        line(x1,y1,x2,y2);

        stroke(0,0,0);
        //ellipse here
        ellipse(x1,y1,5);
            
    }
    
    this.enteractive=function(yearRange,CountryName,x,y){
        if(dist(map(mouseX,this.years[0],this.years[this.years.length-1],this.layout.xStart,this.layout.xLength()),
                map(mouseY,yearRange[0],yearRange[yearRange.length-1]+5,this.layout.yStart,this.layout.yLength()),x,y)<5){
            //console.log("test")
            Text(CountryName+"("+x+") "+y+"%",245,88)
        }
        
        
    }
    
    this.draw=function(){
        stroke(0,0,0);
        strokeWeight(1);
        textSize(25);
        text(" World Bank. % of primary school age children: "+this.sel.value(),500,20);
        this.nation=(this.data.findRow(this.sel.value(),"Country Name").arr);
        this.nationPSA=[].concat(this.nation);
        this.nationPSA.splice(0,2);
        this.layout.drawGraph(this.LabelYears,this.nationPSA);
        for(var i=0; i<this.years.length;i++){
            
            this.plottingValues={
                    x1:map(this.years[i],
                           this.years[0],
                           this.years[this.years.length-1],
                           this.layout.xStart,
                           this.layout.xLength()),
                    
                    x2:map(this.years[i+1],
                           this.years[0],
                           this.years[this.years.length-1],
                           this.layout.xStart,
                           this.layout.xLength()),
                    
                    y1:map(this.nationPSA[i],
                           this.layout.psaGrowthRange(this.nationPSA)[0],
                           this.layout.psaGrowthRange(this.nationPSA)[this.layout.psaGrowthRange(this.nationPSA).length-1]+5,
                           this.layout.yStart,
                           this.layout.yLength()),
                    
                    y2:map(this.nationPSA[i+1],
                           this.layout.psaGrowthRange(this.nationPSA)[0],
                           this.layout.psaGrowthRange(this.nationPSA)[this.layout.psaGrowthRange(this.nationPSA).length-1]+5,
                           this.layout.yStart,
                           this.layout.yLength()),
            }
           if(this.nationPSA[i]!="" && this.nationPSA[i+1]!=""){
               this.plotGraphs(this.plottingValues.x1,this.plottingValues.y1,this.plottingValues.x2,this.plottingValues.y2);
               this.enteractive(this.layout.psaGrowthRange(this.nationPSA),this.sel.value(),this.plottingValues.x1,this.plottingValues.y1);
                                                                       }
        }
        
        
        
    }
    
    this.destroy = function() {
        this.sel.remove();
        
    }
      
   
    
    
    
    
}