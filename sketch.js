var positionListX =[]  //X軸位置，List串列，array陣列
var positionListY =[]
var sizeList =[]  //所有大小


let handpose;
let video; //攝影機取得影像，放影像資料
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16




function setup() {
  createCanvas(windowWidth,windowHeight);
  
  for(var j=0;j<10;j++){  //
    //紀錄資料
    positionListX.push(random(width)) //把X位置存入到positionListX list資料內
    positionListY.push(random(height))
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //原點移到視窗的中心點
      drawFlower(sizeList[j]) 
    pop()
    }
 

    video = createCapture(VIDEO);
    video.size(width, height);
  
    handpose = ml5.handpose(video, modelReady);
  
    // This sets up an event that fills the global variable "predictions"
    // with an array every time new hand poses are detected
    handpose.on("predict", (results) => {
        predictions = results;
    });
  
    // Hide the video element, and just show the canvas
    video.hide();
}


function modelReady() {
  console.log("Model ready!");
}





function draw() {
  translate(width, 0);
  scale(-1, 1);
	
  background(255); 
	
	image(video,0,0,width, height)
	 
	d= dist(pointerX8,pointerY8,pointerX4,pointerY4) //算出大拇指與食指的距

     for(var j=0;j<positionListX.length;j++){  
    r_Flower(sizeList[j],positionListX[j],positionListY[j])
  }
  

	{
    }

	drawKeypoints(); //取得手指位置
   

 
  }

  function drawFlower(size=1){ 
 
  push()
  translate(width/3)
    scale(size)
    //最左邊的海豹
     fill("#FF1E6")
     stroke("#E5E5E5")
     strokeWeight(2)
     ellipse(220,580,100,50)//D taill
     ellipse(210,575,80,30)//U taill
      
     fill("#FF1E6")
     noStroke()
     ellipse(220,400,200)//head
     ellipse(250,460,300,250)//body
     ellipse(125,380,45,40)//mouth
   
     stroke("#E5E5E5")
     strokeWeight(2)
     fill("#fffcf2")
     ellipse(121,379,15)//nouse R
     ellipse(108,379,15)//nouse L
     
     fill(0)
     noStroke()
     ellipse(155+map(0,0,width,-3,5),350+map(0,0,height,-3,8),10,8)//eye
     ellipse(153+map(0,0,width,-3,5),340+map(0,0,height,-2,4),5,3)//眉毛
  
     fill("#fff0f3")
     ellipse(165,373,20,15)//腮紅R
     
  
      beginShape() //nose           
        fill(0)
        strokeWeight(2)
        curveVertex(110,370) 
        curveVertex(114,371)
        curveVertex(118,370)  
        curveVertex(114,375)
      endShape(CLOSE)
  
    pop()
  }
  function mousePressed(){
    
    //紀錄資料
    positionListX.push(mouseX) //把滑鼠按下的位置當作X位置，存入到positionListX list資料內
    positionListY.push(mouseY)
    sizeList.push(random(0.5,1.5))
    let data_length = positionListX.length
    //畫圖
    push() 
      translate(positionListX[data_length-1],positionListY[data_length-1]) //原點移到視窗的中心點
      drawFlower(sizeList[data_length-1]) 
    pop()

        
    }
    function drawKeypoints() {
      for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
          const keypoint = prediction.landmarks[j];
          fill(0, 255, 0);
          // noStroke();
          if (j == 8) {				
            pointerX8 = map(keypoint[0],0,640,0,width)
            pointerY8 = map(keypoint[1],0,480,0,height)
            pointerZ8 = keypoint[2]
            console.log(pointerZ8)
            if(pointerZ8<-40)
            {
              R_draw(pointerX8,pointerY8)
            }
            
            ellipse(pointerX8, pointerY8, 30, 30);
          } else
          if (j == 4) {   
        fill(255,0,0)
            pointerX4 = map(keypoint[0],0,640,0,width)
            pointerY4 = map(keypoint[1],0,480,0,height)
            // pointerZ = keypoint[2]
            // print(pointerZ)
            ellipse(pointerX4, pointerY4, 30, 30);
        
          } else
          if (j == 14) {
            pointerX14 = keypoint[0];
            pointerY14 =  keypoint[1];
          } else
          if (j == 16) {
            pointerX16 = keypoint[0];
            pointerY16 =  keypoint[1];
          }
          
        }
      
      }
    }
    
    
    function r_Flower(F_size,F_x,F_y){
      push()
        translate(F_x,F_y);
      if(pointerY14<pointerY16){
        drawFlower(map(d,0,600,F_size-0.2,F_size+0.6))
      }else
      {
        //無名指沒有彎曲，張開無名指，花旋轉
        rotate(frameCount/20)
        drawFlower(F_size)
          
      }
      pop()
    }
    
    function R_draw(handX,handY)
    {
    positionListX.push(handX) //把滑鼠按下的位置當作X位置，存入到positionListX list資料內
    positionListY.push(handY)
    sizeList.push(random(0.5,1.5))
    let data_length = positionListX.length
    //畫圖
    push() 
      translate(positionListX[data_length-1],positionListY[data_length-1]) //原點移到視窗的中心點
      drawFlower(sizeList[data_length-1]) 
    pop()
    
    }