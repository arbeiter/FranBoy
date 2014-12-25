window.onload = function() {	
	addDropBehavior();
	addDragBehavior();
};

var addDragBehavior = function(){
	var cols = document.querySelectorAll("#left_col");	
	[].forEach.call(cols, function(col) { 	
		console.log(col);
		
		var dragged;	
		col.addEventListener("drag",function(event){
			console.log("Drag");
		},false);

		col.addEventListener("dragstart", function (event)
			{
				this.style.opacity='0.4';				
				console.log("dragstart event invoked");
			},false);

		col.addEventListener("dragenter", function (event)
			{		
				console.log("dragenter");	
			},false);

		col.addEventListener("dragover", function(event)
				{	
					if(event.preventDefault)
						event.preventDefault();
					return false;
				},false);	
	});
};

var addDropBehavior = function(){	
	var cols = document.querySelectorAll("#right_col");
	[].forEach.call(cols, function(col) { 
		console.log(col);	
		col.addEventListener("dragenter", cancelDefault, false);
		col.addEventListener("dragover", cancelDefault, false);
		col.addEventListener("drop", handleDrop, false);
		col.addEventListener("dragend", handleDragEnd, false);
	});

	function cancelDefault(event) {	
			if(event.preventDefault())
				event.preventDefault();
	}

	function handleDragEnd(e){
		console.log("Handle Drag End");
	}

	function handleDrop(e) { 
		console.log("handleDrop");
		if (e.stopPropagation)
		{
			e.stopPropagation(); // Stops some browsers from redirecting.
		}
		return false;
	}
};
