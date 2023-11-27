import { useEffect } from "react";
import * as echarts from "echarts";

const AcChart = () => {
  useEffect(() => {
    var myChart = echarts.init(document.getElementById("chart"));

    var app = {};

    const categories = (function () {
      let now = new Date();
      let res = [];
      let len = 10;
      while (len--) {
        res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
        now = new Date(+now - 2000);
      }
      return res;
    })();

    const data = (function () {
      let res = [];
      let len = 10;
      while (len--) {
        res.push(Math.round(Math.random() * 1000));
      }
      return res;
    })();

    myChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {},
        },
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: categories,
          axisLabel: {
            textStyle: {
              fontWeight: "bold",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
          splitLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bold",
            },
          },
        },
      ],
      series: [
        {
          name: "Air quality",
          type: "bar",
          barWidth: 30,
          data: data,
          symbolSize: "7",
          lineStyle: {
            color: "#101D42",
            width: 1,
          },
        },
      ],
      grid: {
        width: "90%",
        left: "5%",
        top: "12%",
        bottom: "10%",
      },
    });

    app.count = 11;

    setInterval(function () {
      let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
      data.shift();
      data.push(Math.round(Math.random() * 1000));
      categories.shift();
      categories.push(axisData);

      myChart.setOption({
        xAxis: [
          {
            data: categories,
          },
        ],
        series: [
          {
            data: data,
          },
        ],
      });
    }, 2100);

    window.addEventListener("resize", () => {
      myChart.resize();
    });
  }, []);

  return <div id="chart" className="w-full h-full" />;
};

export default AcChart;
