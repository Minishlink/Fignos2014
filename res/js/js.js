// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
	document.getElementById(elmId).innerHTML = value;
}

// --- YouTube Player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var ytplayer;
function onYouTubeIframeAPIReady() {
	ytplayer = new YT.Player('videoDiv', {
	  height: '480',
	  width: '853',
	  videoId: '2UFyl9LLNNA', // vieux teaser H8avFfGFjY8
	  playerVars: { 
		'autoplay': 0, 
		'autohide': 1,
		'rel': 0,
		'modestbranding': 1,
		'wmode': 'transparent'
	},
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
}

var ready = false;
var doItWhenReady = false;
function onPlayerReady(event) {
	ytplayer.setPlaybackQuality("large");
	ready = true;
	if(doItWhenReady) ytplayer.playVideo();
}

var done = false;
function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED) {
		$("#global").fadeOut(3000, function()
		{
			top.location.href = "http://bordeaux.grand-gala.org";
		});
	}
	else if(event.data == YT.PlayerState.PLAYING && !done)
	{
		$('#date').fadeIn(1000*2);
		$('#liensite').fadeIn(1000*2);
		done = true;
	}
}

// --- fin YouTube Player

var timeOut;

function timeOutVideo() {
  timeOut = window.setTimeout(showVideo, 1000*3);
}

function showVideo() {
	$(".logo,#date").fadeOut(250, function()
	{
		$('#video').show().hide().fadeIn(1000*2, function () 
		{ 
			if(!ready) 
				doItWhenReady = true; 
			else ytplayer.playVideo(); 
		});
	});
}

$(document).ready(function()
{	
	$(".logo").hide();
	$("#liensite").hide();
	$("#date").hide();
	$("#video").hide();
	$("#footer").hide();

	$('.out').click(function()
	{
		var toLoad = $(this).attr('href');
		
		$("#global").fadeOut(1000*2, function()
		{
			top.location.href = toLoad;
		});
		
		return false;
    });
	
	$('#logo').click(function()
	{
		window.clearTimeout(timeOut); // annuler timeOut
		showVideo();
	});
	
	$("#footer img").mouseover(function()
	{
		grayscale.reset($(this));
	});

	$("#footer img").mouseout(function() {
		grayscale($(this));
	});
	

});

$(window).load(function()
{
	grayscale.prepare($('#footer img'));
	grayscale($('#footer img'));
	$('.logo,#date').fadeIn(3000);
	$('#footer').fadeIn(5000);
	
	timeOutVideo();
});
