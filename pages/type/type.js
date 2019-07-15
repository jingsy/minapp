// pages/type/type.js
var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var typeId = options.typeId;
    this.getData(typeId);

    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/'+typeId,
    //   success:function(res){
    //     console.log(res);
    //     self.setData({
    //       titleInfo: res.data.data
    //     })
    //   }
    // });
    // wx.request({
    //   url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/'+typeId,
    //   success:function(res){
    //     console.log(res);
    //     self.setData({
    //       ArticleTypeList: res.data.data
    //     })
    //   }
    // })
  },

  getData: function (typeId) {
    var self = this;
    request({
      url: '/getArticleTypeTitleInfo/' + typeId,
      success: function (res) {
        self.setData({
          titleInfo: res
        })
      }
    })

    request({
      url: '/getArticleTypeList/' + typeId,
      success: function (res) {
        self.setData({
          ArticleTypeList: res
        })
      }
    })
  },
  onTap:function(e){
    // console.log(e);
    
    // console.log(e.currentTarget.dataset.articleid);
    var id = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url:'/pages/articleDetail/articleDetail?id='+ id
    })



  }

  
})