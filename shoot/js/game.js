
const canvas = document.getElementById("main");
const ctx=canvas.getContext('2d');
let cd =0;
const ground= 300;
const w = canvas.width;
const h = canvas.height;
const ml = new Image();
const mr = new Image();
ml.src="image/man_left.png";
mr.src="image/man_right.png";
ctx.fillStyle='#000';

document.addEventListener('keydown', function(event) {
	switch(event.which){
		case 37: 
			if(!controllor.left_arrow){controllor.left_arrow=true;}
			break;
		case 39: 
			if(!controllor.right_arrow){controllor.right_arrow=true;}
			break;
		case 38: 
			if(!controllor.up_arrow){controllor.up_arrow=true;}
			break;	
		case 32: 
			if(!controllor.space){controllor.space=true;}
			break;
	
	}

});
document.addEventListener('keyup', function(event) {
	switch(event.which){
		case 37: 
			controllor.left_arrow=false;
			break;
		case 39: 
			controllor.right_arrow=false;
			break;
		case 38: 
			controllor.up_arrow=false;
			break;
		case 32: 
			controllor.space=false;
			break;

	}
});
let controllor={
	left_arrow:false,
	right_arrow:false,
	up_arrow:false,
	space:false
}


let object =function(x=0,y=0,sx=0,sy=0,width,height){
	this.x=x;
	this.y=y;
	this.sx=sx;
	this.sy=sy;
	this.dir=1;
	this.fs=0.8;
	this.fg=1;
	this.isjump=false;
	this.w=width;
	this.h=height;
	this.isfg=true;
}
let danny=new object(300,300,0,0,0);
let bullets=new Array();
object.prototype.move=function(dx=this.sx,dy=this.sy){
	this.x+=dx;
	this.y+=dy;
	if(this.isfg){
		if(this.y<ground){
			this.sy+=this.fg;
		}else{
			this.sy=0;
			this.y=ground;
			this.isjump=false;
		}
	}
	
}
object.prototype.jump=function(){
	this.isjump=true;
	this.sy=-20;	
}
function shoot(shooter){
	if(cd==0){
		cd=15;
		var bullet=new object(shooter.x,shooter.y,0,0,10,10);
		bullet.sx=70*shooter.dir;
		bullet.isfg=false;
		bullets.push(bullet);
		console.log("sadsa");
	}
}
function draw(){
	ctx.fillStyle='#fff';
	ctx.fillRect(0,0,w,h);
	if(danny.dir==1){
		ctx.drawImage(mr,danny.x,danny.y,50,50);
	}else if(danny.dir==-1){
		ctx.drawImage(ml,danny.x,danny.y,50,50);
	}
	if(bullets.length!=0){
		for(let i=0;i<bullets.length;i++){
			ctx.fillStyle="red";
			ctx.fillRect(bullets[i].x,bullets[i].y,bullets[i].w,bullets[i].h)
		}
	}
	
	ctx.fillStyle='#000';
	ctx.fillRect(0,350,w,100);
}
function game(){
	if(cd>0){cd--;}
	controll(controllor);
	danny.move();
	if(bullets.length!=0){
		for(let i=0;i<bullets.length;i++){
			var b = bullets[i];
			b.move();
			if(b.x<0||b.x>w){bullets.splice(i,1);}
		}
	}

}
function controll(controllor){
	if(!(controllor.left_arrow==controllor.right_arrow)){
		if(controllor.right_arrow){danny.x+=10;danny.dir=1;}
		if(controllor.left_arrow){danny.x+=-10;danny.dir=-1;}
	}
	
	if(controllor.up_arrow){
		if(!danny.isjump){danny.jump()};
	}
	if(controllor.space){
		shoot(danny);
	}
}
function update(){
	game();
	draw();
	console.log(bullets.length);
}
function Animate(time=0){
	requestAnimationFrame(Animate);
	update();
}
Animate();