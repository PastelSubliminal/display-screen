<template>
  <div class="hello">
    <el-row>
      <el-col :span="24">
        <div class="row1">
          <div class="row1p">
            欢迎光临万丰智慧工厂
          </div>
        </div>
      </el-col>  
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row2">
          <div class="location">绍兴 新昌</div>
          <div class='date'>{{currentDate}}</div>
            <div class="weather">{{this.temp.wea}} {{this.temp.win}}{{this.temp.win_speed}}</div>
            <div class="temperature">
              {{this.temp.tem_night}}~{{this.temp.tem_day}}℃
              <div class="qulity">
                <el-tag type="warning" size="medium" >{{this.temp.air}} {{this.temp.air_level}}</el-tag>
              </div>
            </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row3">
          <img src="@/img/green.jpg" alt="" class="green">
          <div class="greenWord">绿色</div>

          <div class="arrow1Word">全年已下降碳排放：</div>
          <img class="arrow1" src="@/img/downArrow.jpg" alt="" style: width="100px" height="80px">
          <div class="arrow1Data">
            {{Math.round(this.reducingCarbon)}}吨
          </div>
          <div class="arrow2Word">绿电使用：</div>
          <img class="arrow2" src="@/img/downArrow.jpg" alt="" style: width="100px" height="80px">
          <div class="arrow2Data">
            {{Math.round(this.batteryUse)}}万度
          </div>
          <div class="arrow3Word">绿色铝使用：</div>
          <img class="arrow3" src="@/img/upArrow.jpg" alt="" style: width="100px" height="80px">
          <div class="arrow3Data">
            {{Math.round(this.aluminumUse)}}吨
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row4">
          <div class="energy">能源</div>
          <div class="energyUse">今日能源使用情况：</div>
          <el-table
            :data="tableData"
            style="width: 50%; height:auto"
            class="elTable"
            align="center"
          >
            <el-table-column
              prop="name"
              label="分类"
              width="180">
            </el-table-column>
            <el-table-column
              prop="qty"
              label="用量"
              width="180">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row5">
          <div class="production">产量</div>
          <div class="goalProduct">今日目标产量：{{Math.round(this.todayTarget)}}套</div>
          <div class="realProduct">实际已完成量：{{Math.round(this.actualQty)}}套</div>
          <el-progress :text-inside="true" :stroke-width="48" :percentage="Math.round(Math.round(this.actualQty)/Math.round(this.todayTarget)*100)" status="success" stroke-linecap="square" class="progress-bar"></el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row6">
          <div class="device">设备</div>
          <div class="oeeStatus">OEE：{{Number(this.oee).toFixed(2)}}%</div>
          <div class="status1">运行中：{{Math.floor(Number(this.inOperation))}}台</div>
          <div class="status2">待料中：{{Math.floor(Number(this.inWaiting))}}台</div>
          <div class="status3">故障中：{{Math.floor(Number(this.inFault))}}台</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="row7">
          <div class="row7p">
            永恒提升价值 不断奉献社会
          </div>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/api.js"
export default {
  name: 'HelloWorld',

  mounted() {
    this.formatCurrentDate();
    this.getTem()
    api.kanban1().then(res=>{
      console.log('reskanban1', JSON.parse(res.data.d))
      const data = JSON.parse(res.data.d)
      this.reducingCarbon = data[0].qty
      this.batteryUse = data[1].qty
      this.aluminumUse = data[2].qty
      this.tableData[0] = data[3]
      this.tableData[1] = data[4]
      this.tableData[2] = data[5]
      this.tableData[3] = data[6]
      this.tableData[4] = data[7]
      this.tableData[5] = data[8]
      this.tableData[6] = data[9]
      this.tableData[7] = data[10]
      this.tableData[8] = data[11]
      this.tableData = [...this.tableData]
      this.todayTarget = data[12].qty
      this.actualQty = data[13].qty
      this.oee = data[14].qty
      this.inOperation = data[15].qty
      this.inWaiting = data[16].qty
      this.inFault = data[17].qty
      console.log('1', Math.floor(Number(this.inOperation)))
    }).catch(err=>{
      console.error(err)
    })
  },

  data() {
    return {
      tableData:[],
      currentDate: '1',
      reducingCarbon: '',
      batteryUse: '',
      aluminumUse: '',
      todayTarget: '',
      actualQty: '',
      oee:'',
      inOperation: '',
      inWaiting: '',
      inFault: '',
      temp:{
        wea: '晴',
        win: '北风',
        win_speed: '三级',
        tem_day: '',
        tem_night: '',
        air: '50',
        air_level: ''
      }
    };
  },

  methods: {
    formatCurrentDate() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var day = new Date().getDate();
      this.currentDate = year + '年' + (month < 10 ? '0' + month : month) + '月' + (day < 10 ? '0' + day : day) + '日';
    },
    getTem(){
      console.log('getTemp')
      api.temp().then(res=>{
        console.log('res', res)
        this.temp.wea = res.data.wea;
        this.temp.win = res.data.win;
        this.temp.tem_day = res.data.tem_day;
        this.temp.tem_night = res.data.tem_night;
        this.temp.air = res.data.air;
        let airValue = parseInt(res.data.air);
          if (airValue >= 0 && airValue <= 50) {
            this.temp.air_level = '优';
          } else if (airValue >= 51 && airValue <= 100) {
            this.temp.air_level = '良';
          } else if (airValue >= 101 && airValue <= 150) {
            this.temp.air_level = '轻微污染';
          } else if (airValue >= 151 && airValue <= 200) {
            this.temp.air_level = '轻度污染';
          } else if (airValue >= 201 && airValue <= 300) {
            this.temp.air_level = '中度污染';
          } else {
            this.temp.air_level = '未知';
          }
      })
    }
  }
};   

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  height: 1920px;
  width: 1080px;
  display: flex;
  flex-direction: column;
}
.el-row {
  // flex-grow: 1;
  height: auto;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
  border-radius: 4px;
}
// 60 250 430 440 430 250 60
.row1 {
  background-color: rgb(237,125,49);
  height: 60px;
  .row1p{
    color:white;
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 35%;
    top: 15%
  }
}
.row2{
  background-color: rgb(67,127,184);                                                                   
  color: white;
  height: 250px;
  position: relative;
  .location{
    position: absolute;
    top: 5%;
    left: 1%
  }
  .date{
    position: absolute;
    // font-size: 0px;
    top: 5%;
    right: 1%
  }
  .weather{
    position: absolute;
    font-size: 50px;
    top: 20%;
    left: 1%
  }
  .temperature{
    position: absolute;
    font-size: 50px;
    top: 55%;
    left: 1%
  }
  .qulity{
    position: absolute;
    display: inline-block;
    left: 130%;
    bottom: 20%
  }
}
.row3{
  background-color: rgb(197,224,180);
  height: 430px;
  position: relative;
  .green{
    position:absolute;
    left: 5%;
    top: 10%
  }
  .greenWord{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    margin-top: 230px;
    margin-left: 90px;
  }
  .arrow1Word{
    font-size: 20px;
    position:absolute;
    font-weight: bold;
    top: 10%;
    left: 30%
  }
  .arrow1{
    position:absolute;
    top: 25%;
    left: 30%
  }
  .arrow1Data{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    top: 25%;
    left: 40%
  }
  .arrow2Word{
    font-size: 20px;
    position:absolute;
    font-weight: bold;
    top: 10%;
    left: 60%
  }
  .arrow2{
    position:absolute;
    top: 25%;
    left: 60%
  }
  .arrow2Data{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    top: 25%;
    left: 70%
  }
  .arrow3Word{
    font-size: 20px;
    position:absolute;
    font-weight: bold;
    position:absolute;
    top: 55%;
    left: 30%
  }
  .arrow3{
    position:absolute;
    top: 25%;
    left: 60%;
    top: 70%;
    left: 30%
  }
  .arrow3Data{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    top: 70%;
    left: 40%
  }
}
.row4{
  background-color: rgb(251,229,214);
  position: relative;
  height: 440px;
  .energy{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    top: 40%;
    left: 5%;
  }
  .energyUse{
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 30%;
    top: 5%
  }
  .elTable{
    position:absolute;
    left: 20%;
    top: 20%
  }
}
.row5{
  background-color: rgb(255,242,204);
  position: relative;
  height: 430px;
  .production{
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 5%;
    top: 40%
  }
  .goalProduct{
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 20%;
    top: 10%
  }
  .realProduct{
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 60%;
    top: 10%
  }
  .progress-bar{
    width: 750px;
    left: 20%;
    top: 40%;
    ::v-deep .el-progress-bar__innerText{
      font-size: 30px;
    }
  }
}
.row6{
  background-color: rgb(189,215,238);
  position: relative;
  height: 250px;
  .device{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    top: 40%;
    left: 5%;
  }
  .oeeStatus{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    left: 20%;
    top: 20%
  }
  .status1{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    left: 20%;
    top: 50%
  }
  .status2{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    left:45%;
    top: 50%
  }
  .status3{
    position:absolute;
    font-weight: bold;
    font-size: 40px;
    left:70%;
    top: 50%
  }
}
.row7{
  background-color: rgb(91,155,213);
  height: 60px;
  position: relative;
  .row7p{
    color:white;
    position:absolute;
    font-weight: bold;
    font-size: 30px;
    left: 32%;
    top: 15%
  }
}
</style>
