// 改变滚动条样式
.scroll-area::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scroll-area::-webkit-scrollbar-thumb {/*滚动条方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px #ff2323;
  background: #ff2323;
}
.scroll-area::-webkit-scrollbar-track {/*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  /* border-radius: 10px; */
  /* background: #EDEDED; */
  border: none;
  background: none;
}