import mapComponent from './MapComponent/map-component.js';
import statisticsComponent from './StatisticsComponent/statistics-component.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

mapComponent();
statisticsComponent();

console.log(process.env.NODE_ENV);
