// pages/huitu/huitu.
const app = getApp();
const databuffer = app.globalData.databuffer;
var recive = new Array();
var zhuanghuan = new Array();
var i = 0;
var j = 1;
var x = 0;
var z = 1;
var k = 0;
var t = 1;
var dataValue = [125, 0, -125];
var data = [0, 0.5, 1];
var arr = new Array();
var ans = new Array();
var id;
//功率谱部分
// complex methods
// 构造函数，默认为 0
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
let glpjs = (x, y, z) => { return { z: (x * x + y * y) / 256 } }
let psd = 10 * Math.log10(glpjs(rx[1].x, rx[1].y, 2))
//console.log(10*Math.log10(glpjs(rx[1].x,rx[1].y,2)))
//

//testdata
for(i=0;i<=10000;i++){
   arr[i]=i/500*10*Math.PI;
}
for (i = 0; i <=10000; i++) {
  ans[i] = Math.sin(arr[i])*10;
}
function ans() {
  for (i = 0; i < 100000; i++) {
   ans.shift();
  }
}
function cutdata2(r) {
  for (i = 0; i < r; i++) {
    data2.shift();
  }
}
function cutdata222(r) {
  for (i = 0; i < r; i++) {
    ans.shift();
  }
}
//testdata
//testdata2
var data2 = new Array();
function addData(shift) {
  data2.push(Math.sin((Math.random()*2*Math.PI))*5);
  if (shift) {
    date.shift();
    data.shift();
  }
}
for(i=0;i<=99999;i++){
  addData();
}
//去掉已经画了的数据
function cutdata22(r) {
  for (i = 0; i < r; i++) {
    getApp().globalData.databuffer.shift();
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
    getApp().globalData.e = 1;
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
      ctxf: ctx
    })
    var p = (that.data.canvasWidth) / 256;
    ctx.strokeRect(10, 20, that.data.canvasWidth, 250)
    ctx.setFontSize(12)
    ctx.fillText('幅值（μv）', 10, 10)
    ctx.fillText('25μv', 105, 10)
    ctx.fillText('0.1Hz', that.data.canvasWidth - (28 + 25 * p), 290)
    ctx.fillText('PSD/Power（dB）', that.data.canvasWidth-35, 10)
    ctx.setFontSize(12)
    ctx.moveTo(75, 10);
    ctx.lineTo(100, 10);
    ctx.moveTo(75, 5);
    ctx.lineTo(75, 10);
    ctx.moveTo(100, 5);
    ctx.lineTo(100, 10);
    ctx.moveTo(that.data.canvasWidth - 30, 295);
    ctx.lineTo(that.data.canvasWidth - 30, 300);
    ctx.moveTo(that.data.canvasWidth - (30 + 25 * p), 295);
    ctx.lineTo(that.data.canvasWidth - (30+ 25 * p), 300);
    ctx.moveTo(that.data.canvasWidth - 30, 300);
    ctx.lineTo(that.data.canvasWidth - (30 + 25 * p), 300);
    ctx.setFontSize(12)
    ctx.fillText('频率（Hz）', (that.data.canvasWidth + 10) / 2 - 20, 300)
    ctx.stroke()
    ctx.draw()
    /*画网格线
     i=45; 
     while(i!==270) {
    ctx.moveTo(10,i);
    ctx.lineTo(that.data.canvasWidth+10,i);
    ctx.stroke();
     ctx.draw(true);
    i=i+25;
      }*/
    //画上横坐标、纵坐标
    for (var i = 0; i <= 1; i += 1) {
      ctx.setFontSize(10)
      ctx.fillText(dataValue[i], 0, i * 125 + 20)
      ctx.draw(true)
    }
    for (var i = 1; i <= 2; i++) {
      ctx.setFontSize(10)
      ctx.fillText(data[i], 10 + ((that.data.canvasWidth - 4) / 2) * i, 280)
      ctx.draw(true)
    }
    //模拟数据绘制(脑电数据)) 1秒画32包——256个脑电数据
    ctx.translate(0, 145)
    //循环画图
    id = setInterval(function () {
      if (k == 16) {
        k = 0;
      }
      ctx.clearRect(10 + k * 16 * p, -125, 16 * p, 250);//值得推敲
      //ctx.draw();
      //加载新数据并且清除已画数据

      //测试
      /*for (i = 0; i <= 510; i += 2) {
        zhuanghuan[i / 2] = (-1) * ((parseInt(getApp().globalData.databuffer[i], 16)) * 256 + (parseInt(getApp().globalData.databuffer[i + 1], 16))) / (0xff * 256 + 0xff) * 125;
      }   */                //转换表现形式
      for (i = 16 * k * p; i < 16 * (k + 1) * p; i += p) {   //每次画0.5s的数据  
        //if (i !== 255 * p) {
        ctx.beginPath();
        ctx.setStrokeStyle('red');
        ctx.moveTo(10 + i, getApp().globalData.databuffer[i / p]);
        ctx.lineTo(10 + (i + p), getApp().globalData.databuffer[i / p + 1]);
        ctx.stroke();
        ctx.draw(true);
        ctx.closePath();
        //}
        //else { ; }
      }
      for (i = 16 * k * p; i < 16 * (k + 1) * p; i += p) {   //每次画0.5s的数据
        ctx.beginPath();
        ctx.setStrokeStyle('Blue')
        ctx.moveTo(10 + i, ans[i / p]);
        ctx.lineTo(10 + (i + p), ans[i / p + 1]);
        ctx.stroke();
        ctx.draw(true);
        ctx.closePath();
      }
      if (k == 15) {
        cutdata22(256);
        cutdata2(256);
        cutdata222(256);
      }
      k+= 1;
      //每次画完一次就删掉这次的数据
    }, 62.5)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(id);
    getApp().globalData.e = 0;
    getApp().globalData.databuffer.length = 0;
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(id);
    getApp().globalData.e = 0;
    getApp().globalData.databuffer.length = 0;
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
  zhanting: function () {
    console.log(z)
    if (z) {
      clearInterval(id);
      z = 0;
    }
    else {
      z = 1;
      //onShow;
    }
  },
})