# awesomeGraph.js
awesomeGraph.js is a javascript library for creating visually appealing, animated, SVG-only bar graphs from simply formatted JSON data.

## Using awesomeGraph.js
Using this tool is very simple. All you need to do is include the .js file on the page you want the graph to appear on and pass it correctly formatted data and the element you want to contain the graph (any size works, just set the container element to the size you want the graph to be).

## Data / Options / Styling Formatting

Data should be formatted like this example (for Browser Market Share - 2012):
```
var myGraph = {
    options : {
        title : "Browser Market Share - 2012", // The title of the graph
        animation_speed : "faster", // The speed of the animations (Defaults to "normal, "fastest"/"faster"/"normal"/"slow"/"slower"/"slowest")
	total_points : 60, // The total number of data points on your graph
	highest_point : 47, // The largest value of the graph (or if desired, y-max of the graph)
	x_label : "Month", // The label for the X axis
	y_label : "Percent" // The label for the Y axis
    },
    dataset : [
            {
                label: "Internet Explorer", // The label for this group of data
		data : [20.1,19.5,18.9,18.3,18.1,16.7,16.3,16.2,16.4,16.1,15.1,14.7] // This group of data as an array
            },
            {
                label: "Firefox",
                data : [37.2,37.1,36.3,35.8,35.2,34.4,33.7,32.8,32.2,31.8,31.2,31.1]
            },
            {
                label: "Chrome",
                data : [35.3,36.3,37.3,38.3,39.3,41.7,42.9,43.7,44.1,44.9,46.3,46.9]
            },
            {
                label: "Safari",
		data : [4.3,4.5,4.4,4.5,4.3,4.1,3.9,4.0,4.2,4.3,4.4,4.2]
            },
            {
                label: "Opera",
                data : [2.1,2.0,2.0,2.1,2.2,2.1,2.2,2.2,2.3,2.3,2.3,2.4]
	    }
    ],
    style : {
	color_array : ["#d50000","#C51162","#AA00FF","#6200EA","#304FFE","#2962FF","#0091EA","#00B8D4","#00BFA5","#00C853","#64DD17","#AEEA00","#FFD600","#FFAB00","#FF6D00","#DD2C00","#3E2723","#212121","#263238"], // Colors alternate for each data point and repeat at each grouping of data
	background_color: "#FFFFFF", // The background color of the graph
	text_color: "#000000" // The text/foreground color of the graph
    }
}
```
## Displaying Your Graph
When you want your graph to be created and displayed in the page
```
	var graph = document.getElementById("first_graph");
	awesomeGraph.makeGraph(myGraph, graph);
	awesomeGraph.start(true);
```

