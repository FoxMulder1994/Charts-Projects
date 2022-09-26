function Venezuela_VitaminA() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Venezuela Vitamin A ingestion: 1980-2005';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Vitamin-A-Venezuela';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/Venezuela/Venezuela_Vitamin_A.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
     this.select = createSelect();

    // Set select position.
    this.select.position(450, 65);
     
      
    // Fill the options with all food names.
     
      var foodSelect = this.data.columns;
      
      for(var i = 0; i < this.data.getColumnCount() ; i++) {

    // Fill the options with all food names.
          this.select.option(foodSelect[i]);
          this.select.value(foodSelect[i-8]);
           
};
    
  };

    this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the food we're interested in from the
    // select item.
    // Use a temporary hard-code example for now.
    
      var food_item = this.select.value();
     
     

    // Get the column of raw data for food_item.
    var col = this.data.getColumn(food_item);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow', '#00ff00'];

    // Make a title.
    var title = 'Venezuela Vitamin A ingestion. Year: ' + food_item;
    textSize(15);
    var source = text("Source: ABLAN, Elvira  y  ABREU OLIVO, Edgar. Venezuela: Efectos nutricionales de los cambios alimentarios, 1980-2005.", 
                      500, 520);
    var int_address = text("<Agroalim online. 2007, vol.12, n.24 [citado  2021-07-09], pp. 11-31. ",
                          500, 540);
    // Draw the pie chart!
    this.pie.draw(col, labels, colours, title);
  };
    
    
}
