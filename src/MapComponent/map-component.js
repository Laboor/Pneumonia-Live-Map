import echarts from 'echarts/lib/echarts';
import chinaJson from 'echarts/map/json/china.json'
import $ from 'jquery';
import apiConfig from '../api.config';
import 'echarts/lib/chart/map';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/visualMap';
import './map-component.css';

// echarts初始化
let el = $('#map')[0];
let myChart = echarts.init(el);
echarts.registerMap('china', chinaJson);
myChart.setOption({
  backgroundColor: '#f8f9fa',
  tooltip: {
    trigger: 'item',
    triggerOn: 'click',
    alwaysShowContent: true,
    confine: true,
    position: function (point) {
      return [point[0] + 15, point[1] + 15];
    },
    formatter: '地区：{b}<br/>确诊：{c}人'
  },
  visualMap: {
    left: 'left',
    pieces: [
      { value: 0, color: 'white' },
      { gte: 1, lt: 9, color: '#ffaa85' },
      { gte: 10, lt: 99, color: '#ff7b69' },
      { gte: 100, lt: 999, color: '#cb2929' },
      { gte: 1000, lt: 9999, color: '#8c0d0e' },
      { gte: 10000, color: '#650208' },
    ],
    itemWidth: 12,
    itemHeight: 12,
    itemGap: 3,
    textGap: 7,
    textStyle: {
      color: '#666666'
    },
  },
  series: {
    name: '中国肺炎实时疫情地图',
    type: 'map',
    mapType: 'china',
    selectedMode: 'single',
    width: 700,
    height: 525,
    bottom: 0,
    label: {
      show: true,
      fontSize: 9,
      fontWeight: 'bold'
    },
    itemStyle: {
      areaColor: '#FFFFFF',
      borderWidth: 0.4
    },
    emphasis: {
      itemStyle: {
        areaColor: '#c7fffd'
      }
    },
    data: []
  }
})

// 取消选中后删除toolTip(官网API无效)
let myChartDom = myChart.getDom();
let tipElem = myChartDom.lastElementChild;
let selectedStatus = false;
myChart.on('mapselectchanged', function (params) {
  let cityName = params.batch[0].name;
  if (params.batch[0].selected[cityName]) {
    selectedStatus = true;
    myChartDom.appendChild(tipElem);
  } else {
    selectedStatus = false;
    myChartDom.removeChild(tipElem);
  }
});

// ajax请求数据
let mapCurrentData = [{ name: '南海诸岛', value: 0 }]; // 当前确诊数
let mapTotalData = [{ name: '南海诸岛', value: 0 }];  //累计确诊数
$.get(apiConfig.cityApi, { key: apiConfig.cityApiKey }, function (data) {
  if (data.code != 200) {
    console.log('数据请求失败', data);
  } else {
    for (let item of data.newslist) {
      mapCurrentData.push({
        name: item.provinceShortName,
        value: item.currentConfirmedCount
      });
      mapTotalData.push({
        name: item.provinceShortName,
        value: item.confirmedCount
      });
    }
    myChart.setOption({
      series: {
        data: mapCurrentData
      }
    });
  }
}, 'json');

$('#tab-toggle').change(function (e) {
  let totalNum;
  let provinceName
  if (e.target.checked) {
    myChart.setOption({
      series: {
        data: mapTotalData
      }
    });
    if (selectedStatus) {
      provinceName = tipElem.innerHTML.slice(3, tipElem.innerHTML.indexOf('<br>'));
      mapTotalData.forEach(function (item) {
        if (item.name == provinceName) {
          totalNum = item.value;
        }
      })
      tipElem.innerHTML = `地区：${provinceName}<br>确诊：${totalNum}人`;
      myChart.dispatchAction({
        type: 'mapSelect',
        name: provinceName
      });
    }
  } else {
    myChart.setOption({
      series: {
        data: mapCurrentData
      }
    });
    if (selectedStatus) {
      provinceName = tipElem.innerHTML.slice(3, tipElem.innerHTML.indexOf('<br>'));
      mapCurrentData.forEach(function (item) {
        if (item.name == provinceName) {
          totalNum = item.value;
        }
      })
      tipElem.innerHTML = `地区：${provinceName}<br>确诊：${totalNum}人`;
      myChart.dispatchAction({
        type: 'mapSelect',
        name: provinceName
      });
    }
  }
})

export default function component() {

}
