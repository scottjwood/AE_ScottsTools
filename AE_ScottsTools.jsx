{
function scottPanel(thisObj) {

	function scottPanel_buildUI(thisObj) {
		var woodysPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Woody's Panel", [00, 100, 400, 280]);//

		// add buttons
		var buttonOne = woodysPanel.add("button", [10,10,100,30], "Curves");
		var buttonTwo = woodysPanel.add("button", [105,10,200,30], "Optical Flares");
		var buttonThree = woodysPanel.add("button", [205,10,300,30], "Element3D");
		var buttonFour = woodysPanel.add("button", [305,10,400,30], "Particular");

		var buttonFive = woodysPanel.add("button", [10,35,100,55], "Ramp");
		var buttonSix = woodysPanel.add("button", [105,35,200,55], "Fast Blur");
		var buttonSeven = woodysPanel.add("button", [205,35,300,55], "Turbulent Displace");
		var buttonEight = woodysPanel.add("button", [305,35,400,55], "Light Wrap");

		buttonOne.onClick = function() {addCustomEffect("Curves");}
		buttonTwo.onClick = opticalFlares;
		buttonThree.onClick = element3D;
		buttonFour.onClick = particularSolid;

		buttonFive.onClick = function() {addCustomEffect("Gradient Ramp");}
		buttonSix.onClick = function() {addCustomEffect("Fast Blur");}
		buttonSeven.onClick = function() {addCustomEffect("Turbulent Displace");}
		buttonEight.onClick = function() {addCustomEffect("Light Wrap");}

		return woodysPanel;
	} // End of panel creation

	// Effect function
	function addCustomEffect(effectName) {
		var activeComp = app.project.activeItem;
		if(activeComp){
		  var selLayers = activeComp.selectedLayers;
		  if(selLayers.length > 0){ // is a layer selected?
			  for(var i = 0; i< selLayers.length; i++){
			  	selLayers[i]("Effects").addProperty(effectName); 
			  }
			} else {
		    var adjLayer = app.project.activeItem.layers.addSolid([0,0,0], "Adjustment Layer", app.project.activeItem.width, app.project.activeItem.height, app.project.activeItem.pixelAspect, app.project.activeItem.duration);
		    adjLayer.adjustmentLayer = true;
		    adjLayer.effect.addProperty(effectName);
		    }
		}

	}

	// Add a solid with Optical Flares
	function opticalFlares() {
		myComp = app.project.activeItem;
		app.beginUndoGroup("Add Optical Flare");
		mySolid = myComp.layers.addSolid([0,.5,.8], "Optical Flares",
		myComp.width, myComp.height,1);mySolid.startTime = 0
		myEffect = mySolid.property("Effects").addProperty("Optical Flares");
		mySolid.blendingMode = BlendingMode.ADD;
		app.endUndoGroup();
	}

	// Add a solid with Element 3d
	function element3D() {
		myComp = app.project.activeItem;
		app.beginUndoGroup("Add Element 3D");
		mySolid = myComp.layers.addSolid([0,.8,.4], "Element", myComp.width, myComp.height,1);
		mySolid.startTime = 0
		myEffect = mySolid.property("Effects").addProperty("Element");app.endUndoGroup();
	}

	// Add a solid with particular
	function particularSolid() {
		myComp = app.project.activeItem;
		app.beginUndoGroup("Add Particular");
		mySolid = myComp.layers.addSolid([.8,.3,.1], "Particular", myComp.width, myComp.height,1);
		mySolid.startTime = 0
		myEffect = mySolid.property("Effects").addProperty("Particular");
		app.endUndoGroup();
	}


///  Check if panel is floating window or dockable
	var scriptPal = scottPanel_buildUI(thisObj);
	if ((scriptPal != null) && (scriptPal instanceof Window)) {
		scriptPal.center();
		scriptPal.show();
		}
	}
	scottPanel(this);
}
