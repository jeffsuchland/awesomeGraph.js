			var awesomeGraph = {};
var anim;
awesomeGraph.makeGraph = function (data, id) {
	var svgns = "http://www.w3.org/2000/svg";
	var ele = document.createElementNS (svgns, "svg");
	var tmp_percent, graph_data;
	ele.setAttribute("xmlns","http://www.w3.org/2000/svg");
	id.appendChild(ele);
	var anims;
	this.determineType = function (anim_true) {
		anims = anim_true;
		draw_multi_bar(anims);
	}
	function draw_multi_bar () {
		var graph_data,width_perc,cur_bar,tot_bar,cur_point,color_count;
		graph_data = data.dataset;
		draw_container_background();
		cur_bar = 0;
		tot_bar = data.options.total_points;
		for (var i=0;i<graph_data.length;i++) {
			color_count = 0;
			for (var j=0;j<graph_data[i].data.length;j++) {
				cur_point = graph_data[i].data[j];
				cur_bar++;
				calc_partial_perc(cur_point,cur_bar,tot_bar,color_count);
				color_count++;
			}
			var graph_dataset_legend,legend_spacing;
			legend_spacing = (80 / graph_data.length) * i + 20 + "%";
			graph_dataset_legend = document.createElementNS(svgns, "text");
			graph_dataset_legend.setAttribute("text-anchor","middle");
			graph_dataset_legend.setAttribute("fill",data.style.text_color);
			graph_dataset_legend.setAttribute("font-size","80%");
			graph_dataset_legend.setAttribute("x",legend_spacing);
			graph_dataset_legend.setAttribute("y","95%");
			graph_dataset_legend.innerHTML = graph_data[i].label;
			ele.appendChild(graph_dataset_legend);
		}
		create_title();
		create_legends();
		draw_x_axis();
		draw_y_axis();
		draw_y_max();
		create_color_legend();
	}
	function calc_partial_perc (point,cur,tot,color) {
		var bar_width,bar_height,bar_pos;
		bar_width = 80 / tot;
		bar_height = 80 * (point / data.options.highest_point);
		bar_pos = (bar_width * cur) + bar_width + 8;

		draw_partial_perc (bar_width,bar_height,bar_pos,color,cur,point);
	}
	function draw_partial_perc (width,height,pos,color,num,point) {
		var graph_percent, mult, calc_mult, y_calc, anim_speed;
		graph_percent = document.createElementNS(svgns, "rect");
		mult = height + "%";
		calc_mult = height + "%";
		y_calc = 90 - height + "%";
		if (data.options.animation_speed === "fastest") {
			anim_speed = (num / data.options.total_points) * 1 + "s";
		}
		if (data.options.animation_speed === "faster") {
			anim_speed = (num / data.options.total_points) * 2 + "s";
		}
		if (data.options.animation_speed === "slow") {
			anim_speed = (num / data.options.total_points) * 5 + "s";
		}
		if (data.options.animation_speed === "slower") {
			anim_speed = (num / data.options.total_points) * 10 + "s";
		}
		if (data.options.animation_speed === "slowest") {
			anim_speed = (num / data.options.total_points) * 20 + "s";
		}
		else {
			anim_speed = (num / data.options.total_points) * 3 + "s";
		}
		graph_percent.setAttribute('x', pos + "%");
		graph_percent.setAttribute('y', y_calc);
		graph_percent.setAttribute("fill", data.style.color_array[color]);
		graph_percent.setAttribute("height", calc_mult);
		graph_percent.setAttribute("width", width + "%");
		graph_percent.setAttribute("stroke", data.style.background_color);
		graph_percent.setAttribute("id", "data_point_" + (num - 1));
		graph_percent.setAttribute("class", "graph_bar");
		var graph_percent_title = document.createElementNS(svgns,"title");
		graph_percent_title.innerHTML = point;
		graph_percent.appendChild(graph_percent_title);
		// Animation height
		if (anims === true) {
			var graph_percent_anim = document.createElementNS(svgns,"animate");
			graph_percent_anim.setAttribute("attributeName", "height");
			graph_percent_anim.setAttribute("from", "0%");
			graph_percent_anim.setAttribute("to", calc_mult);
			graph_percent_anim.setAttribute("dur", anim_speed);
			graph_percent.appendChild(graph_percent_anim);
			var graph_percent_anim_y = document.createElementNS(svgns,"animate");
			graph_percent_anim_y.setAttribute("attributeName", "y");
			graph_percent_anim_y.setAttribute("from", "90%");
			graph_percent_anim_y.setAttribute("to", y_calc);
			graph_percent_anim_y.setAttribute("dur", anim_speed);
			graph_percent.appendChild(graph_percent_anim_y);
		}
		ele.appendChild(graph_percent);
	}
	function create_title() {
		var graph_title;
		graph_title = document.createElementNS(svgns, "text");
		graph_title.setAttribute("text-anchor","middle");
		graph_title.setAttribute("dominant-baseline","bottom");
		graph_title.setAttribute("fill",data.style.text_color);
		graph_title.setAttribute("style","font-weight:bold;font-size:90%");
		graph_title.setAttribute("x","50%");
		graph_title.setAttribute("y","4%");
		graph_title.innerHTML = data.options.title;
		ele.appendChild(graph_title);
	}
	function create_legends () {
		var graph_x_legend,graph_y_legend;
		//X Legend
		graph_x_legend = document.createElementNS(svgns, "text");
		graph_x_legend.setAttribute("text-anchor","middle");
		graph_x_legend.setAttribute("fill",data.style.text_color);
		graph_x_legend.setAttribute("style","font-weight:bold;");
		graph_x_legend.setAttribute("x","50%");
		graph_x_legend.setAttribute("y","100%");
		graph_x_legend.innerHTML = data.options.x_label;
		//Y Legend
		graph_y_legend = document.createElementNS(svgns, "text");
		graph_y_legend.setAttribute("text-anchor","left");
		graph_y_legend.setAttribute("fill",data.style.text_color);
		graph_y_legend.setAttribute("style","font-weight:bold;");
		graph_y_legend.setAttribute("x","0%");
		graph_y_legend.setAttribute("y","50%");
		graph_y_legend.setAttribute("dominant-baseline","bottom");
		graph_y_legend.setAttribute("transform","");
		graph_y_legend.innerHTML = data.options.y_label;
		ele.appendChild(graph_x_legend);
		ele.appendChild(graph_y_legend);
	}
	function create_color_legend () {
		var graph_color_legend,graph_color_legend_circle,tSpacing,tCur;
		tCur = 0;
		tSpacing = 80 / data.options.data_labels.length;
		for (var i=0;i<data.options.data_labels.length;i++) {
			tCur = i * tSpacing + 10;
			console.log("Mo: ",data.options.data_labels[i]," Color: ",data.style.color_array[i]);
			graph_color_legend_circle = document.createElementNS(svgns, "circle");
			graph_color_legend_circle.setAttribute("cx",tCur + "%");
			graph_color_legend_circle.setAttribute("cy","7%");
			graph_color_legend_circle.setAttribute("r","1%");
			graph_color_legend_circle.setAttribute("fill",data.style.color_array[i]);
			graph_color_legend = document.createElementNS(svgns, "text");
			graph_color_legend.setAttribute("x",tCur + 3 + "%" );
			graph_color_legend.setAttribute("y","7.5%");
			graph_color_legend.setAttribute("text-anchor","middle");
			graph_color_legend.setAttribute("font-size","60%");
			graph_color_legend.setAttribute("fill",data.style.text_color);
			graph_color_legend.innerHTML = data.options.data_labels[i];
			ele.appendChild(graph_color_legend_circle);
			ele.appendChild(graph_color_legend);
		}
	}
	function draw_container_background () {
		var graph_bkg;
		graph_bkg = document.createElementNS(svgns, "rect");
		graph_bkg.setAttribute("x", "0");
		graph_bkg.setAttribute("y", "0%");
		graph_bkg.setAttribute("fill", data.style.background_color);
		graph_bkg.setAttribute("height", "100%");
		graph_bkg.setAttribute("width", "100%");
		ele.appendChild(graph_bkg);
	}
	function draw_x_axis () {
		var graph_x_axis;
		graph_x_axis = document.createElementNS(svgns, "line");
		graph_x_axis.setAttribute("x1","10%");
		graph_x_axis.setAttribute("y1","10%");
		graph_x_axis.setAttribute("x2","10%");
		graph_x_axis.setAttribute("y2","90%");
		graph_x_axis.setAttribute("id","graph_x_axis");
		graph_x_axis.setAttribute("stroke",data.style.text_color);
		ele.appendChild(graph_x_axis);
	}
	function draw_y_axis () {
		var graph_y_axis;
		graph_y_axis = document.createElementNS(svgns, "line");
		graph_y_axis.setAttribute("x1","10%");
		graph_y_axis.setAttribute("y1","90%");
		graph_y_axis.setAttribute("x2","90%");
		graph_y_axis.setAttribute("y2","90%");
		graph_y_axis.setAttribute("id","graph_y_axis");
		graph_y_axis.setAttribute("stroke",data.style.text_color);
		ele.appendChild(graph_y_axis);
	}
	function draw_y_max () {
		var graph_y_max;
		graph_y_max = document.createElementNS(svgns, "text");
		graph_y_max.setAttribute("x", "5%");
		graph_y_max.setAttribute("y", "10%");
		graph_y_max.setAttribute("text-anchor","middle");
		graph_y_max.setAttribute("dominant-baseline","central");
		graph_y_max.setAttribute("fill", data.style.text_color);
		graph_y_max.innerHTML = data.options.highest_point;
		ele.appendChild(graph_y_max);
	}
	this.clear = function () {
		ele.innerHTML = "";
		//clear event handlers / animations as well when they are added
	}
	this.restart = function () {
		this.clear();
	}
	this.refresh = function () {
		this.clear();
	}
	this.start = function (anims) {
		this.determineType(anims);
	}
	this.startAnims = function () {
		this.addAnimations();
		// Start animations here
	}
	this.startNoAnims = function () {
		This.start(anims);		
	}
}
