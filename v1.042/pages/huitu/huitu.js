// pages/huitu/huitu.
const app = getApp();
var recive=new Array();  
var glptu=new Array();
var glptue = new Array();
var zhuanghuan = new Array();
var x1 = new Array();
var i=0;
var j=1;
var x=0;
var z=1;
var k=0;
var dataValue = [125,0,-125]; 
var dataValue1 = [125, 0, -125];
var data= [0,1,2];
var id;
var fs = 128;
var n = 128;
var glpx = new Array();
let complex = (x, y) => { return { x: x || 0, y: y || 0 }; };
// 从弧度构造单位复数
complex.fromAngle = (angle) => complex(Math.cos(angle), Math.sin(angle));
// 复数加复数
complex.add = (a, b) => complex(a.x + b.x, a.y + b.y);
// 复数乘复数
complex.mul = (a, b) => complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
// 数乘复数
complex.numMul = (n, c) => complex(n * c.x, n * c.y);
// 复数减复数
complex.minus = (a, b) => complex(a.x - b.x, a.y - b.y);

// array restructuring
let flatten = (matrix) => matrix.reduce((pre, cur) => pre.concat(cur), []);
let partition = (array, n) => array.reduce((pre, cur, i) => (pre[i % n] = pre[i % n] || []).push(cur) && pre, []);
let transpose = (matrix) => partition(flatten(matrix), matrix[0].length);
//DFT
let recursiveDFT = (a, inverse) => a.length == 1 ? a : flatten(transpose(transpose(a.reduce((pre, cur, i) => pre[i & 1].push(cur) && pre, [[], []]).map(v => recursiveDFT(v))).map((v, i) => [complex.add(v[0], complex.mul(complex.fromAngle(i * (inverse ? -2 * Math.PI / a.length : 2 * Math.PI / a.length)), v[1])), complex.minus(v[0], complex.mul(complex.fromAngle(i * (inverse ? -2 * Math.PI / a.length : 2 * Math.PI / a.length)), v[1]))]))).map(v => inverse ? complex.numMul(1 / a.length, v) : v);
//test
var x = [complex(1), complex(2), complex(0), complex(0)]; // 1 + 2x
//console.log(x);
var y = [complex(3), complex(4), complex(0), complex(0)]; // 3 + 4x
//console.log(y);
var rx = recursiveDFT(x);
var rrx = recursiveDFT(rx, true); // almost same as x
//console.log(rrx);
var ry = recursiveDFT(y);
var ryy = recursiveDFT(ry, true); // almost same as y
//console.log(ry);
var rc = rx.map((v, i) => complex.mul(v, ry[i]));
var rcc = recursiveDFT(rc, true);
//console.log(rcc); // almost same as [complex(3), complex
//计算PSD
let glpjs = (x, y, z) => { return { z: (x * x + y * y) / 128 } }
let psd = 10 * Math.log10(glpjs(rx[1].x, rx[1].y, 2))
for (var i = 0; i < n; i++) {
  glpx[i + 1] = i * (fs / n)
}
//console.log(10*Math.log10(glpjs(rx[1].x,rx[1].y,2)))
//

//testdata
//testdata2
//减去已经画的数据
function cutdata22(r)
  {      for(i=0;i<r;i++)
         {
      recive.shift();}
  }
function cutdata222(r) {
  for (i = 0; i < r; i++) {
    glptu.shift();
  }
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
    //getApp().globalData.e = 1;
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
    const ctx2 = wx.createCanvasContext('glp')
    that.setData({
          ctxf:ctx
    })
    var p = (that.data.canvasWidth) / 128;
    ctx.strokeRect(10, 30, that.data.canvasWidth, 250)
    ctx.setFontSize(12)
    ctx.fillText('幅值（μv）', 10, 10)
    ctx.fillText('25μv', 80, 15)
    ctx.fillText('0.2s', that.data.canvasWidth - (10 + 25 * p/2), 300)
    ctx.setFontSize(12)
    ctx.moveTo(75, 0);
    ctx.lineTo(75, 20);
    ctx.moveTo(75, 0);
    ctx.lineTo(80, 0);
    ctx.moveTo(75, 20);
    ctx.lineTo(80, 20);
    ctx.moveTo(that.data.canvasWidth - 10, 305);
    ctx.lineTo(that.data.canvasWidth - 10, 310);
    ctx.moveTo(that.data.canvasWidth - (10 + 25 * p/2), 305);
    ctx.lineTo(that.data.canvasWidth - (10 + 25 * p/2), 310);
    ctx.moveTo(that.data.canvasWidth - 10, 310);
    ctx.lineTo(that.data.canvasWidth - (10 + 25 * p/2), 310);
    ctx.setFontSize(12)
    ctx.fillText('时间（s）', (that.data.canvasWidth + 10) / 2 - 20, 310)
    ctx.stroke()
    ctx.draw()

    for (var i = 0; i <= 1; i += 1) {
      ctx.setFontSize(10)
      ctx.fillText(dataValue[i], 0, i * 125 + 30)
      ctx.draw(true)
    } 
    //画上横坐标、纵坐标
 
    for (var i = 1; i <= 2; i++) {
      ctx.setFontSize(10)
      ctx.fillText(data[i], 10 + ((that.data.canvasWidth - 4) / 2) * i, 290)
      ctx.draw(true)
    }
    //功率谱设置
    ctx2.strokeRect(10, 30, that.data.canvasWidth, 250)
    ctx2.setFontSize(12)
    ctx2.fillText('PSD/Power(dB)', 10, 10)
    ctx2.fillText('25dB', 110, 15)
    ctx2.fillText('12Hz', that.data.canvasWidth - (10 + 25 * p/2), 300)
    ctx2.setFontSize(12)
    ctx2.moveTo(105, 0);
    ctx2.lineTo(105, 20);
    ctx2.moveTo(105, 0);
    ctx2.lineTo(110, 0);
    ctx2.moveTo(105, 20);
    ctx2.lineTo(110, 20);
    ctx2.moveTo(that.data.canvasWidth - 10, 305);
    ctx2.lineTo(that.data.canvasWidth - 10, 310);
    ctx2.moveTo(that.data.canvasWidth - (10 + 25 * p/2), 305);
    ctx2.lineTo(that.data.canvasWidth - (10 + 25 * p/2), 310);
    ctx2.moveTo(that.data.canvasWidth - 10, 310);
    ctx2.lineTo(that.data.canvasWidth - (10 + 25 * p/2), 310);
    ctx2.setFontSize(12)
    ctx2.fillText('频率（Hz）', (that.data.canvasWidth + 10) / 2 - 30, 310)
    ctx2.stroke()
    ctx2.draw()
    ctx2.setFontSize(10)
    ctx2.fillText(dataValue1[0], 0, 30)
    ctx2.fillText(dataValue1[1], 0, 155)
    ctx2.draw(true)
    for (var i = 1; i <= 2; i++) {
      ctx2.setFontSize(10)
      var l = i * (1 / 2) * n;
      ctx2.fillText(glpx[l], 10 + ((that.data.canvasWidth - 8) / 2) * i, 290)
      ctx2.draw(true)
    }
    //模拟数据绘制(脑电数据)) 1秒画32包——256个脑电数据
//循环画图
    ctx.translate(0, 155)
    ctx2.translate(0, 155) 
    //id = setInterval(function () {
  while((getApp().globalData.e))
// while(1)

      {
   wx.getStorage({
     key: 'naodiant',
     success(res) {
       recive = res.data;//缓存2s发来的数据 （思考会不会漏数据？）
       // console.log(recive.length)
     }
   })
      if (k == 16) {
     
        console.log(recive.length)

        for(var i=0;i<128;i+=1)
        { 
          x1=x1.concat(complex(recive[i]));
        }
        //console.log(x1.length);
        glptu = recursiveDFT(x1);
        for (var i = 0; i < 128; i++) 
        { var x,y;
        glptue = glptue.concat((-1)*10 * Math.log10(glpjs(glptu[i].x, glptu[i].y, 2).z));
          
        }
     // console.log(glptue);
        k = 0;
      }
      //console.log(glptue[10]);
      ctx.clearRect(10 + k * 8 * p, -125, 8* p, 250);
      ctx2.clearRect(10 + k * 8 * p,-125, 8 * p, 250);
   // ctx.clearRect(10+k*16*p, -125, 16*p, 250); //值得推敲
         //测试
    /* for(i=0;i<=510;i+=2)
      {
       zhuanghuan[i / 2] = (-1) * ((parseInt(recive[i], 16)) * 256 + (parseInt(recive[i+1], 16)))/(0xff*256+0xff)*125;
      }   */  
             //转换表现形式   
      for (i = 8*k*p; i <8*(k+1)*p; i+=p) {  //每次画1s的数据
        ctx.beginPath();
        ctx.setStrokeStyle('red');
        ctx.moveTo(10 + i,recive[i / p]);
        ctx.lineTo(10 + (i + p), recive[i / p + 1]);
        ctx.stroke();
        ctx.draw(true);
        ctx.closePath();
      }

      // //功率谱
      if(k==0){
      for (i = 0; i < 8* 16* p; i += p) {   //每次画0.5s的数据
        ctx2.beginPath();
        ctx2.setStrokeStyle('Blue');
        ctx2.moveTo(10 + i, glptue[i / p]);
        ctx2.lineTo(10 + (i + p), glptue[i / p + 1]);
        ctx2.stroke();
        ctx2.draw(true);
        ctx2.closePath();
      }}
       if(k==15)
       {
         x1.length=0;
         glptue.length=0;
         recive.length=0;
    //    cutdata22(128);
    //  cutdata222(128);
    //     //cutdata222(128);
      }
      k+=1;
  }
     // data[0]=data[0]+1;//每次画完一次就删掉这次的数据
    //},62.5)
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
    getApp().globalData.e = 0;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {  
    clearInterval(id);
    getApp().globalData.e = 0;
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