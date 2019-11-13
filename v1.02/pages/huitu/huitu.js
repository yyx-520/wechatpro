// pages/huitu/huitu.
var recive=new Array();  
var zhuanghuan = new Array();
var i=0;
var j=1;
var x=0;
var z=1;
var k=0;
var dataValue = [125,0,-125]; 
var data= [0,0.5,1];
var arr = new Array();  
var ans = new Array();  
var id;
for(i=0;i<=10000;i++){
   arr[i]=i/500*10*Math.PI;
}

for (i = 0; i <=10000; i++) {
  ans[i] = Math.sin(arr[i])*10;
}
function ans() {

  for (i = 0; i < 100; i++) {
   ans.shift();
  }

}
function cutdata2() {

  for (i = 0; i < 500; i++) {
   data2.shift();
  }

}
//testdata
//testdata2
var data2 = new Array();
function addData(shift) {
  data2.push(Math.sin((Math.random()*2*Math.PI))*20);

  if (shift) {
    date.shift();
    data.shift();
  }
}
for(i=0;i<=99999;i++){
  addData();
}
//减去已经画的数据
function cutdata22(r)
  {      for(i=0;i<r;i++)
         {
      recive.shift();}
  }
Page({
  canvasIdErrorCallback: function (e) {
    console.error(e);
  }, 
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          canvasWidth: res.windowWidth - 35,
          })
        }
    }) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    const ctx = wx.createCanvasContext('naodian')
    that.setData({
          ctxf:ctx
    })
    var p = (that.data.canvasWidth) / 256;
    ctx.strokeRect(10, 20, that.data.canvasWidth, 250)
    ctx.setFontSize(12)
    ctx.fillText('幅值（μv）', 10, 10)
    ctx.setFontSize(12)
    ctx.fillText('25μv', 105, 10)
    ctx.fillText('0.1s', that.data.canvasWidth - (48 + 25 * p), 290)
    ctx.setFontSize(12)
    ctx.moveTo(75, 10);
    ctx.lineTo(100, 10);
    ctx.moveTo(75, 5);
    ctx.lineTo(75, 10);
    ctx.moveTo(100,5);
    ctx.lineTo(100, 10);
    ctx.moveTo(that.data.canvasWidth - 50, 295);
    ctx.lineTo(that.data.canvasWidth - 50, 300);
    ctx.moveTo(that.data.canvasWidth - (50 + 25 * p), 295);
    ctx.lineTo(that.data.canvasWidth - (50 + 25 * p), 300);
    ctx.moveTo(that.data.canvasWidth - 50, 300);
    ctx.lineTo(that.data.canvasWidth - (50 + 25 * p), 300);
    ctx.setFontSize(12)
    ctx.fillText('时间（s）', (that.data.canvasWidth + 10) / 2 - 20, 300)
    ctx.stroke()
    ctx.draw()
    //画上横坐标、纵坐标
    for (var i = 0; i <= 1; i += 1) {
      ctx.setFontSize(10)
      ctx.fillText(dataValue[i], 0, i * 125 + 20)
      ctx.draw(true)
    }
    for (var i = 1; i <= 2; i++) {
      ctx.setFontSize(10)
      ctx.fillText(data[i], 10 + ((that.data.canvasWidth - 14) / 2) * i, 280)
      ctx.draw(true)
    }
    //模拟数据绘制(脑电数据)) 1秒画32包——256个脑电数据
    ctx.translate(0, 145)
//循环画图
    id = setInterval(function () {
      if (k == 16) {
        wx.getStorage({
          key: 'naodiant',
          success(res) {
            recive = recive.concat(res.data);//缓存2s发来的数据 （思考会不会漏数据？）
           // console.log(recive.length);
          }
        })
        k = 0;
      }
    ctx.clearRect(10+k*16*p, -125, 16*p, 250); //值得推敲
         //测试
     for(i=0;i<=510;i+=2)
      {
       zhuanghuan[i / 2] = (-1) * ((parseInt(recive[i], 16)) * 256 + (parseInt(recive[i+1], 16)))/(0xff*256+0xff)*125;
      }                   //转换表现形式   
      for (i = 16*k*p; i <16*(k+1)*p; i+=p) {  //每次画1s的数据
        ctx.moveTo(10 + i ,zhuanghuan[i/p]);
        ctx.lineTo(10 + (i + p), zhuanghuan[i/p+1]);
        ctx.stroke();
        ctx.draw(true);
      }
      if(k==15)
      {
        cutdata22(256);
      }
      k+=1;//每次画完一次就删掉这次的数据
    },125)
    /*模拟数据处理过程 
    wx.getStorage({
          key: 'naodian',
          success(res) {
          recive) //缓存
          }
        })
        cutrecive();
        画图

        
    */
      









      //实时画出波形函数
     /* while(j)
      {
        wx.getStorage({
          key: 'naodian',
          success(res) {
            console.log(res.data)
            ans = res.data
          }
        })
        console.log(ans[50]);
        //sets
        ctx.setLineJoin('round')
        ctx.setLineWidth(2)
        ctx.setLineCap('round'
        )
        if(ans[2]=='01') //闭环模式——刺激一分钟发送1024个脑电数据再刺激一分钟，如此反复
          { 
          ctx.moveTo(10, -25);
          ctx.lineTo(that.data.canvasWidth+10,-25);
          ctx.stroke();
          ctx.draw(true);
         }
         else if(ans[2]=='03')   //处于电刺激状态——不发送数据
         {
            ctx.moveTo(10, 25);
            ctx.lineTo(10+that.data.canvasWidth, 25);
            ctx.stroke();
            ctx.draw(true);
         }
        else
         { 
          if(ans[3]=='00')  //脑电数据8个一包
          {
            for (i = 0; i <= 499; i++) 
            {  
            ctx.moveTo(10 + i * p, ans[i]);
           ctx.lineTo(10 + (i + 1) * p, ans[i + 1]);
           ctx.stroke();
           ctx.draw(true);
        }
          }
          else   //陀螺仪四个数据一包
          {
            for (i = 0; i <= 499; i++) { 
              ctx.moveTo(10 + i * p, ans[i]);
              ctx.lineTo(10 + (i + 1) * p, ans[i + 1]);
              ctx.stroke();
              ctx.draw(true);
             }

          }
        }
     

  }*/
   /*id = setInterval(
      function () {
        wx.getStorage({
          key: 'naodian',
          success(res) {
            console.log(res.data)
            ans = res.data
          }
        })
        
        for (i = 0; i <= 499; i++) {
          ctx.moveTo(10 + i * p, ans[i]);
          ctx.lineTo(10 + (i + 1) * p, ans[i + 1]);
          ctx.stroke();
          ctx.draw(true);
        }
    }
      ,1000);   */
      //停止执行setInterval循环。
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(id);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {  
    clearInterval(id);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  zhanting:function(){
    console.log(z)
    if(z){
    clearInterval(id);
    z=0;}
    else{
      z=1;
      //onShow;
    }
  },
  jietu:function(){
    var that=this;
    const ctx = wx.createCanvasContext('naodian')
     ctx.draw(true,wx.canvasToTempFilePath({
       x:10,
       y:20,
       width:that.data.canvasWidth,
       height:250,
       destHeight:250,
       destWidth: that.data.canvasWidth,
       fileType: 'png',
       quality:1,
       canvasId: 'naodian',
       success:function(res){
         wx.saveImageToPhotosAlbum({
           filePath: res.tempFilePath,
         })
       }
     }, this))
  },
kongzhi:function(){
    var that = this;
    wx.navigateTo({
      url: '../kongzhims/kongzhims'
    })
  }
  
})