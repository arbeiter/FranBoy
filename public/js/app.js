window.onload = function() {	
	var cols = document.querySelectorAll("button.column");
	[].forEach.call(cols, function(col) { 
		col.addEventListener("click", onClick, false);
		col.setAttribute("draggable", true);
		console.log("window load");	
		col.ondragstart = 
		function()
	{console.log("Draggable"); };

	var dragged;	
	col.addEventListener("drag",function(event){
		console.log("Drag");
	},false);

	col.addEventListener("dragstart", function (event)
		{
			//vent.originalEvent.dataTransfer.setData('text/plain', 'anything');
			console.log("dragstart");
			dragged = event.target;
		});

	col.addEventListener("dragover", function(event)
		{
			event.preventDefault();
			console.log("dragover");
		});
	col.addEventListener("dragend", function(event)
			{
				console.log("dragend");
				console.log(event.target);
				col.innerHtml+="<p>punk</p>";
			});


	var bin = document.querySelector('#right_col');	
	addEvent(bin, 'drop', function (e) {
		if (e.stopPropagation) e.stopPropagation();
		console.log("DragEvent");
		var el = document.getElementById(e.dataTransfer.getData('Text'));
		el.parentNode.removeChild(el);
	});

	//Chrome doesn't receive drop event
	col.addEvent("drop", function(event){
		console.log("drop finished");
		if(e.stopPropagation) e.stopPropagation();
		if(event.target.className==="Second")
	{
		dragged.parentNode.removeChild( dragged );
		event.target.innerHtml = ( dragged );		 
		console.log(event.target);
		var tempNode = dragged.cloneNode(true);
		event.target.appendChild(tempNode);
	}
	},false);

	});
};
function onClick(e) {
	console.log("This happens");
}

var addEvent = (function () {
	if (document.addEventListener) {
		return function (el, type, fn) {
			if (el && el.nodeName || el === window) {
				el.addEventListener(type, fn, false);
			} else if (el && el.length) {
				for (var i = 0; i < el.length; i++) {
					addEvent(el[i], type, fn);
				}
			}
		};
	} else {
		return function (el, type, fn) {
			if (el && el.nodeName || el === window) {
				el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
			} else if (el && el.length) {
				for (var i = 0; i < el.length; i++) {
					addEvent(el[i], type, fn);
				}
			}
		};
	}
})();
