// pages/kongzhims/kongzhims.js
var i;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue1: '',
    inputValue2: '',
    inputValue3: ''
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

  },
  bihuang:function(){
    let buffer = new ArrayBuffer(20)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, 170)
    dataView.setUint8(1, 85)
    dataView.setUint8(2, 1)
    for(i=3;i<=19;i++)
  {
      dataView.setUint8(i, 0)
  }
    wx.writeBLECharacteristicValue({
      deviceId: '66:55:44:33:22:11',
      serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
      characteristicId: '5A87B4EF-3BFA-76A8-E642-92933C31434F',
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res.errMsg)
      }
    })
  },
   caiji:function(){
     let buffer = new ArrayBuffer(20)
     let dataView = new DataView(buffer)
     dataView.setUint8(0, 170)
     dataView.setUint8(1, 85)
     dataView.setUint8(2, 2)
     for (i = 3; i <= 19; i++) {
       dataView.setUint8(i, 0)
     }
     wx.writeBLECharacteristicValue({
       deviceId: '66:55:44:33:22:11',
       serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
       characteristicId: '5A87B4EF-3BFA-76A8-E642-92933C31434F',
       value: buffer,
       success: function (res) {
         console.log('writeBLECharacteristicValue success', res.errMsg)
       }
     })

   },
  bindKeyInput1: function (e) {
    this.setData({
      inputValue1: e.detail.value
    })
  },
    dcji:function(){
      var  that=this;
      let buffer = new ArrayBuffer(20)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, 170)
      dataView.setUint8(1, 85)
      dataView.setUint8(2, 3)
      dataView.setUint8(3, 0)
      dataView.setUint8(4, 1)
      dataView.setUint8(5, that.data.inputValue1)
      for (i = 6; i <= 19; i++) {
        dataView.setUint8(i, 0)
      }
      wx.writeBLECharacteristicValue({
        deviceId: '66:55:44:33:22:11',
        serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
        characteristicId: '5A87B4EF-3BFA-76A8-E642-92933C31434F',
        value: buffer,
        success: function (res) {
          console.log('writeBLECharacteristicValue success', res.errMsg)
        }
      })
    },
  bindKeyInput2: function (e) {
    this.setData({
      inputValue2: e.detail.value
    })
  },
   bx:function(){
     var that=this;
     let buffer = new ArrayBuffer(20)
     let dataView = new DataView(buffer)
     dataView.setUint8(0, 170)
     dataView.setUint8(1, 85)
     dataView.setUint8(2, 3)
     dataView.setUint8(3, 0)
     dataView.setUint8(4, 2)
     dataView.setUint8(5, that.data.inputValue2)
     for (i = 6; i <= 19; i++) {
       dataView.setUint8(i, 0)
     }
     wx.writeBLECharacteristicValue({
       deviceId: '66:55:44:33:22:11',
       serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
       characteristicId: '5A87B4EF-3BFA-76A8-E642-92933C31434F',
       value: buffer,
       success: function (res) {
         console.log('writeBLECharacteristicValue success', res.errMsg)
       }
     })

   },
  bindKeyInput3: function (e) {
    this.setData({
      inputValue3: e.detail.value
    })
  },
   gcj:function(){
     var that = this;
     let buffer = new ArrayBuffer(20)
     let dataView = new DataView(buffer)
     dataView.setUint8(0, 170)
     dataView.setUint8(1, 85)
     dataView.setUint8(2, 3)
     dataView.setUint8(3, 0)
     dataView.setUint8(4, 3)
     dataView.setUint8(5,that.data.inputValue3)
     for (i = 6; i <= 19; i++) {
       dataView.setUint8(i, 0)
     }
     wx.writeBLECharacteristicValue({
       deviceId: '66:55:44:33:22:11',
       serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
       characteristicId: '5A87B4EF-3BFA-76A8-E642-92933C31434F',
       value: buffer,
       success: function (res) {
         console.log('writeBLECharacteristicValue success', res.errMsg)
       }
     })

   },
   test1:function(){
     wx.navigateTo({
       url: '../huitu/huitu'
     })

   },
    test2: function () {
    wx.navigateTo({
      url: '../huitu2/huitu2'
    })

  }
})