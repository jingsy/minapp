
var request = require('../../utils/request.js');
var audio = wx.getBackgroundAudioManager();
// pages/articleDetail/articleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail:[],
    videoCoverHidden:true,
    playing:false,
    audioCurTime:0,
    progressPercent:0,
    progressCircleLeft:0,
    progressWidth:520,
    audioCircleOriginX:0,
  },


  onLoad: function (options) {
    console.log(options.id);
    this.getData(options.id)
    

  },
  getData:function(id){
    var self = this;
    request({
      url:'/getArticleDetail/' + id,
      success:function(res){
        console.log(res);
        self.setData({
          articleDetail:res
        })
      }
    })
  },

  onVideoTap:function(){
    this.setData({
      videoCoverHidden:false
    })

    var myVideo = wx.createVideoContext('myVideo');
    myVideo.play();

  },
  
  onAudioPlayTap:function(){
    // var playing = this.data.playing;
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    // var audio =wx.createInnerAudioContext();
    // //下面这三个不写会报错
    
    // backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // // 设置了 src 之后会自动播放
    var self = this;
    var playing = this.data.playing;
    audio.title = '此时此刻'
    audio.epname = '此时此刻'
    audio.singer = '许巍'
    if(playing){
      audio.pause()
    }else{
      audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    }
    this.setData({
      playing:!playing
    })
    this.listenAudioPlay();
    this.updateAudioData();
  },
  listenAudioPlay:function(){
    var self = this;
    audio.onPause(function(){
      self.setData({
        playing:false
      })
    })
    audio.onStop(function(){
      self.setData({
        playing:false
      })
    })
    audio.onEnded(function(){
      self.setData({
        playing:false
      })
    })
    audio.onPlay(function(){
      self.setData({
        playing:true
      })
    })

  },
  
  updateAudioData:function(){
    var self =this;
    var audioDuration = this.data.articleDetail.audio.duration;

    audio.onTimeUpdate(function(){
      var audioCurTime = audio.currentTime.toFixed();
      var percent = audioCurTime/audioDuration;
      var progressPercent = percent*100;
      var progressCircleLeft = percent * self.data.progressWidth;
      // left = percent *width(520)


      self.setData({
        audioCurTime:audioCurTime,
        progressPercent:progressPercent,
        progressCircleLeft:progressCircleLeft
      })
    })
  },

  //歌曲进度条拖拽
  //1.运动
  //2.百分比该拜年
  //3.时间改变
  //4.歌曲播放
  onAudioCircleStart:function(e){
    var audioCircleOriginX = e.touches[0].pageX*this.getPhoneRadio();

    this.setData({
      audioCircleOriginX:audioCircleOriginX
    })
  },
  onAudioCircleMove:function(e){
    var audioCircleOriginX = this.data.audioCircleOriginX;
    var onAudioCircleMovex = e.touches[0].pageX*this.getPhoneRadio();

    var progressCircleLeft = onAudioCircleMovex - audioCircleOriginX;

    if(progressCircleLeft<=0){
      progressCircleLeft=0
    }else if(progressCircleLeft>=this.data.progressWidth){
      progressCircleLeft=this.data.progressWidth;
    }

    var progressPercent = progressCircleLeft / this.data.progressWidth*100;

    var audioCurTime =(progressCircleLeft / this.data.progressWidth*this.data.articleDetail.audio.duration).toFixed();
    audio.title = '此时此刻'
    audio.epname = '此时此刻'
    audio.singer = '许巍'
    audio.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    audio.seek(Number(audioCurTime));
    this.listenAudioPlay();
    this.updateAudioData();
    console.log(progressCircleLeft);
    
    this.setData({
      progressCircleLeft:progressCircleLeft,
      progressPercent:progressPercent,
      audioCurTime:audioCurTime
    })
  },

  getPhoneRadio : function(){
    var radio =0
    wx.getSystemInfo({
      success:function(res){
        var width = res.screenWidth;
        radio = 750/width;
      }
    })
    return radio
  }
    

  
  
})