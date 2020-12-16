$(document).ready(function() {
	const canvas = $("#main");
	const screen = $('#screen');
	const ctx = canvas[0].getContext('2d');
	ctx.fillStyle = "#fff";
	ctx.fillRect(0,0,canvas[0].width,canvas[0].height);

	const image = new Image();
	
	image.onload =function(){
			ctx.drawImage(image,player.pos.x,player.pos.y,50,50);
		}
	image.src = "image/chrome.png";
	
	const w = canvas[0].width-50;
	const h = canvas[0].height-50;
	const player={
		pos: {x:0,y:h },
		dx: 0,
		dy: 0
	}
	$(document).on('keydown', function(event) {
		switch(event.which){
			case 37: 
				player.dx-=20;
				break;
			case 39: 
				player.dx+=20;
				break;
			case 38: 
				playerJump();
				break;			

		}
	});



	Animate();
	function move(){
		if(player.dx!=0)
			player.dx+=(player.dx>0?-2:2);
		player.dy+=1;
		player.pos.x += player.dx;
		player.pos.y += player.dy;
		collideX(player);
		collideY(player);
		
	}
	function playerJump(){
		player.dy-= 20;
	}
	function collideX(player){
		if(player.pos.x<0){
			player.pos.x=0;
			player.dx=0;
		}
		if(player.pos.x>w){
			player.pos.x=w;
			player.dx=0;
		}
	}
	function collideY(player){
		if(player.pos.y>h){
			player.pos.y=h;
			player.dy=0;
		}
	}
	function reflect(dir){

	}
	function update(){
		ctx.fillStyle = "#fff";
		ctx.fillRect(0,0,canvas[0].width,canvas[0].height);
		move();
		image.onload(); 
		screen.html("("+player.pos.x+","+player.pos.y+")");
	}
	function Animate(time=0){
		update();
		requestAnimationFrame(Animate);
	}


});