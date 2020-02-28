import $ from 'jquery';
import apiConfig from '../api.config';
import './statistics-component.css';

$.get(apiConfig.statisticsApi, { key: apiConfig.statisticsApiKey }, function (data) {
  if (data.code != 200) {
    console.log('数据请求失败', data);
  } else {
    let statisticsData = data.newslist[0].desc;
    $('#currentConfirmedCount').text(statisticsData.currentConfirmedCount);
    $('#suspectedCount').text(statisticsData.suspectedCount);
    $('#seriousCount').text(statisticsData.seriousCount);
    $('#confirmedCount').text(statisticsData.confirmedCount);
    $('#curedCount').text(statisticsData.curedCount);
    $('#deadCount').text(statisticsData.deadCount);
  }
}, 'json')

export default function component() { }