// pages/article/article.js

Page({

  
  data:{
    listLike:{
      0:true,
      1:false,
      2:true,
    }
  },
  //加载页面
  onLoad : function(options){ 
    this.getHomeData();
    this.getlikeData();
    //利用缓存存储数据
    // wx.setStorage({
    //   key:'name'
    // })
    // wx.getStorage({
    //   key:'name',
    //   success:function(res){
    //     console.log(res.data);
    //   }
    // })
    // wx.removeStorage({
    //   key:'name'
    // })
    // wx.clearStorage({
    // })

    //步骤
    //1.先来获取数据中的listLike的缓存
    //get 如果是没有缓存的 则--> {} 生成一个空对象
    //2.通过缓存设置数据中的listLike
    //tap事件 ==》 1. 先要知道文章的索引，listLike取出，通过索引知道是否喜欢，取反
                  //2.listLike重新赋值
                  //3.何止缓存
        
  },

  //请求页面数据
  getHomeData:function(){
    var self = this;
    //请求页面数据
    wx.request({
      url:'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      success:function(res){
        console.log(res);
        
        self.setData({
          recommend:res.data.recommend,
          markType:res.data.markType,
          articleList:res.data.articleList
        })
      }
    })

    //设置消息提示框
    // wx.showToast({
    //   title:'早上好'
    // })


    //加载中。。。 showLoading showToadst只能用一个
    // wx.showLoading({
    //   title:'loading...'
    // })


    //设置下拉选项
    // wx.showActionSheet({
    //   itemList:['a','b'],
    //   success :function(res){
    //     //显示点击的index
    //     console.log(res.tapIndex);
    //   }
    // })
  },

  onLikeType:function(e){
    var index = e.currentTarget.dataset.articleindex;
    console.log(index);
    var listLike = this.data.listLike;
    var isLike =listLike[index];
    console.log(isLike);
    listLike[index] = !isLike;
    this.setData({
      listLike:listLike
    })
    console.log(listLike);
    
    wx.setStorageSync('listLike',listLike);
  },
  //测试点击事件
  onMoreTap:function(e){

    //currentTarget是事件绑定的当前组件 target是触发事件的原组件
    //比如点击子元素冒泡到了父元素的事件，父元素的currentTarget是parent，
    //但是target就是child，因为这个事件是从child上传递过来的
    var type =e.currentTarget.dataset.articletype;
    // 设置下拉选项
    wx.showActionSheet({
      itemList:['内容过期了','内容和'+type+'不相关','不在显示来自'+type+'的内容'],
      success :function(res){
        //显示点击的index
        console.log(res.tapIndex);
      }
    })
  },
  getlikeData:function(){
    var listLikeStorage = wx.getStorageSync('listLike');
    if(!listLikeStorage){
      listLikeStorage = {}
    }
    this.setData({
      listLike:listLikeStorage
    });
    console.log(this.data.listLike);
  },
  
  onArticleTypeTap:function(e){
    var typeId = e.currentTarget.dataset.articletypeid;
    // console.log(e.currentTarget.dataset.articletypeid);
    
    wx.navigateTo({
      url:'/pages/type/type?typeId='+typeId
    })
  },

  


})

 
// 数据绑定 
//进行网络请求