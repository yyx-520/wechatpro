//全局变量
var pj =new Array();
var tl = new Array();
var arr = new Array();
var ans = new Array();  
var bianh=new Array();
var i = 0;
//console.log(0xff*256+0xff);
//var lala=['ff25']
//console.log(parseInt(lala[0],16))
//testdata
for (i = 0; i <= 500; i++) {
  arr[i] = i / 500 * 10 * Math.PI;
}
Page({
  data: {
    
  },
  onLoad: function () {
 wx.onBluetoothAdapterStateChange(function (res) {
 console.log('adapterState changed, now is', res)})
},
//打开蓝牙适配器
openadapter: function () {
  wx.openBluetoothAdapter({
  success: function (res) {
console.log(res, "success")  
},
fail: function (res) {
 console.log(res, "fail")
},
})
},
//关闭蓝牙适配器
closeadapter: function () {
 wx.closeBluetoothAdapter({
success: function (res) {
console.log(res, "success")
 },
 fail: function (res) {
  console.log(res, "fail")
},
})
 },
//开始搜索设备
  opendiscovery: function () {
    wx.startBluetoothDevicesDiscovery({
      services: [],
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res, "fail")
      },
    })
  },

//关闭搜索
  closediscovery: function () {
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res, "fail")
      },
    })
  },
//获得搜索到的设备
  getdevice: function () {
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
    wx.getBluetoothDevices({
      success: function (res) {
        console.log(res)
        i = 0;
        while (res.devices[i]) {
          console.log(i);
          console.log(res.devices[i].name, res.devices[i].deviceId);
          if (res.devices[i].name == 'xiaochao123') {
            deviceId = res.devices[i].deviceId;
            console.log(deviceId);
          }
          i++;
        }
      }
    })
  },
  //获得已连接的蓝牙设备
getconnecteddevice: function () {
wx.getConnectedBluetoothDevices({
success: function (res) {
console.log(res)
}})
},
//连接目标设备
connecteddevice: function () {
 wx.createBLEConnection({
   deviceId: '66:55:44:33:22:11',
 success: function (res) {
console.log(res);
},
})
},
//进行数据读数
startread: function () {
    wx.readBLECharacteristicValue({
      deviceId: '66:55:44:33:22:11',
      serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
      characteristicId: '6EB675AB-8BD1-1B9A-7444-621E52EC6823',
      success: function (res) {
        console.log('readBLECharacteristicValue:', res.errCode)
      }
    })
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }
  wx.onBLECharacteristicValueChange(function (res) {
 console.log('characteristic value comed:', ab2hex(res.value))
    })
  },
  //开启数据广播功能 连续接收脑电数据
  startnotify: function () {
    wx.notifyBLECharacteristicValueChange({
      state: true,
      deviceId: '66:55:44:33:22:11',
      serviceId: 'EDFEC62E-9910-0BAC-5241-D8BDA6932A2F',
      characteristicId: '6EB675AB-8BD1-1B9A-7444-621E52EC6823',
      //success: function (res) {
      // console.log('notifyBLECharacteristicValueChange success', res.errMsg)
  //    }
    })
    function ab2hex(buffer) {
      var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )
      return hexArr.join('');
    }                                               
    wx.onBLECharacteristicValueChange(function (res) { 
        //for (i = 0; i <= 500; i++) {
        //ans[i] = Math.cos(arr[i]) * //50*Math.random();
      //}  
      var ndsj =ab2hex(res.value);
      //console.log(ab2hex(res.value));
     // console.log(parseInt(ndsj[2],16));
         console.log(ndsj[7]*2)
       if(ndsj[7]!='1')                    //存储脑电数据
      { for(i=8;i<=38;i+=2)
        {  
           bianh[(i-8)/2]=ndsj[i]+ndsj[i+1];
        }
        //接收2s的数据发一次 也就是发送512个脑电数据 保险起见
      if (pj.length < 512 ) {  
       
               pj=pj.concat(bianh);
               //console.log(pj.length)
             // console.log(pj[0])
          }
          else {
            wx.setStorage({   
              key: "naodiant",
              data:pj
            })
               pj.length=0;//发完就清空
          }
      }
       else                        //储存陀螺仪数据（暂定）                      
         {
         for (i = 8; i <= 22; i+= 2) {
           bianh[(i - 8) / 2] = ndsj[i] + ndsj[i + 1];
         }
         //需要2min的数据存储时间
         if (tl.length < 512) {

           tl.concat(bianh);

         }
         else {
           wx.setStorage({
             key: "tuoluo",
             data: tl
           })
           tl.length = 0;//发完就清空
         } 
       }
          // console.log(ans[50]);

 })
},
  //向设备发送指令
  startwrite: function () {
    let buffer = new ArrayBuffer(3)
    let dataView = new DataView(buffer)
       dataView.setUint8(0, 170)
       dataView.setUint8(1,85)
        dataView.setUint8(2,0)
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
//跳转页面
  bindViewTap: function () {
    var  that=this;
    wx.navigateTo({
      url: '../kongzhims/kongzhims'
    })
  }

})