var charts = {};

function renderChart (selectedChartType, currentlyActiveElement, dataArray) {
	charts[selectedChartType].render(currentlyActiveElement, dataArray);
}