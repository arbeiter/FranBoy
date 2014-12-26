window.onload = function() {	
	dropObjects = [];
	dragObjects = [];
	console.log(dragObjects.length);
	addDropBehavior();
	addDragBehavior();
};

var dropObjects = [];
var dragObjects = [];
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
					var position = col.getAttribute('id');
					if(dragObjects.indexOf(position)<=-1)
						dragObjects.push(position);	
									
					var item = col.cloneNode(true);		
					if(dropObjects.indexOf(item)<=-1)
						dropObjects.push(item);

					if(event.preventDefault)
						event.preventDefault();

					return false;
				},false);	
	});
};

var addDropBehavior = function(){	
	var curColumn = null;
	var cols = document.querySelectorAll("#right_col");
	[].forEach.call(cols, function(col) { 
		console.log(col);	
		curColumn = col;
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

		//Delete dragged node
		if(dragObjects.length>0){	

			var draggedNodeId = dragObjects.pop();
			var childNode = document.getElementById(draggedNodeId);			   
			var parentNode = childNode.parentNode;

			console.log(parentNode);
			childNode.parentNode.removeChild(childNode);	

			
			//Append dragged Node to parent			
			var objectToBeAppended = dropObjects.pop();
			objectToBeAppended.style.opacity = 1;
			curColumn.appendChild(objectToBeAppended);	
			
			dropObjects = [];			
		}
		return false;
	}
};
