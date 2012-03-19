/* Author:
	Lior Hakim , www.0i0.io
*/

/* Templates */

var descriptionMarkup = [''
,'<div id="legend-<%= id %>" class="legend">'
,'    <a href="" class="ll-legend-label"><%= title %></a>'
,'    <p><strong>Started:<%= start.toDateString() %></strong></p>'
,'    <p><strong>Ended:<%= end.toDateString() %></strong></p>'
,'    <p><strong>Description:<%= descrition %></strong></p>'
,'</div>'
,''].join('')

var milestoneMarkup = [''
,'<div class="ll-milestone" id="milestone-<%= id %>">'
,'	<div class="ll-milestone-pop">'
,'		<h3><%= title %></h3>'
,'		<p><%= descrition %></p>'
,'	</div>'
,'</div>'
,''].join('')


window.LL = function(){

	this.elements = {}
	this.projects = []
	this.milestones = []

	this.init = function(){
		this.elements = {baseLine:$('.ll-baseline')
										,descriptions:$('.ll-legend-ph')
										}
	}
	this.init()
	this.getLength = function(start,end){
		var diff = new Date(end - start);
		return (diff.getFullYear() - 1970)*60*12 + diff.getMonth()*60 + (diff.getDate() - 1)*60/30
	}
	this.getPosition = function(date){
		return (date.getFullYear() - 2009)*60*12 + date.getMonth()*60 + (date.getDate() - 1)*60/30
	}
}

window.ll = new window.LL

ll.init()

$(function(){
	$('input[name="add"]').click(function(e){
		var data =  {id: ll.projects.length +1
								,title:$('input[name="title"]').val()
								,projectLevel: $('input[name="project-level"]').val()
								,start: new Date($('input[name="start-month"]').val())
								,end: new Date($('input[name="end-month"]').val())
								,descrition:$('textarea[name="desciption"]').val()
								}
		ll.projects.push(data)
		ll.elements.descriptions.append($(_.template(descriptionMarkup,data)))

		var $project = $('<div class="ll-project level-'+
			data.projectLevel+
			'" id="project'+
			ll.projects.length+
		'"></div>')

		$project.html(data.title)
		$project.css({
			width:(ll.getLength(data.start,data.end)) +'px'
			,left:(ll.getPosition(data.start)) +'px'
		})
		ll.elements.baseLine.append($project)
	})

	$('input[name="add-milestone"]').click(function(e){
			var data =  {id: ll.milestones.length +1
									,title:$('input[name="milestone-title"]').val()
									,date: new Date($('input[name="milestone-date"]').val())
									,descrition:$('textarea[name="milestone-desciption"]').val()
									}
			ll.milestones.push(data)
			var $milestone = $(_.template(milestoneMarkup,data))
			$milestone.css({left:ll.getPosition(data.date) +'px'})
			ll.elements.baseLine.append($milestone)
		})

})




