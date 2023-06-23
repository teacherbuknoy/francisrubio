import Chart from 'chart.js/auto'
import { AnalyticStats } from './library/analytics-stats'


const stats = new AnalyticStats()
async function loadData() {
  const response = await stats.getNext()
  render(response.data.map(record => record.data))
}

/**
 * @description Renders Fauna data into a chart
 * @author Francis Rubio
 * @param {AnalyticRecord[]} data
 */
function render(data) {
  const datasets = {
    byBrowser: AnalyticStats.byBrowser(data),
    byPageView: AnalyticStats.byPageVisit(data)
  }

  const configs = {
    byBrowser: {
      type: 'bar',
      data: {
        labels: datasets.byBrowser.labels,
        datasets: [
          {
            label: 'Browser',
            data: datasets.byBrowser.stats
          }
        ]
      },
      options: {
        animation: true
      }
    },
    byPageView: {
      type: 'bar',
      data: {
        labels: datasets.byPageView.labels,
        datasets: [
          {
            label: 'Page view',
            data: datasets.byPageView.stats
          }
        ]
      },
      options: {
        animation: true
      }
    }
  }

  const charts = {
    byBrowser: new Chart(document.getElementById('browser-use'), configs.byBrowser),
    byPageView: new Chart(document.getElementById('most-viewed'), configs.byPageView)
  }
}

window.onJSLoadCallbacks.push(loadData)