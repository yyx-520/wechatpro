// pages/echartces/echartces.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    }
  }

  var data = [];
  var now = +new Date(1997, 9, 3);
  var oneDay = 24 * 3600 * 1000;
  var value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }

   var option = {
    title: {
      text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      }
    },
    series: [{
      name: '模拟数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: data
    }]
  };

  setInterval(function () {

    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }

    chart.setOption({
      series: [{
        type: 'line',
        data: data
      }]
    });
  }, 1000);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  }
})