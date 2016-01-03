export default function Level(state){
  if ( !(this instanceof Level) ) { return new Level(state); }

  var level = this;
  this.setupComplete = function(){
    level.logger.info("Setup Complete");
  };

  this.closeSplashScreen = function(){
    level.logger.info("Close Splash Screen");
  };

  this.showMenu = function(){
    level.logger.info("Show Menu");
  };

  this.hideMenu = function(){
    level.logger.info("Hide Menu");
  };

  this.selectTheme = function(){
    level.logger.info("Select Theme");
  };

  this.newReading = function(){
    level.logger.info("New Reading");
  };
}
