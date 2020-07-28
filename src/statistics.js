import Chart from 'chart.js';
import axios from "axios";

class ChartCreate {
    constructor() {
        this.diagramArea = document.querySelector('.js-diagram-area');
        //this.initStats();

        this.details = document.getElementById('details-select');
        this.filtersBlock = document.getElementById('filters');
        // this.details.addEventListener('click', this.changeDetails.bind(this));

        this.form = document.getElementById('statistics-form');
        this.submit = document.querySelector('.js-apply-filters');

        this.filterFrom = document.querySelector('.js-filter-from');
        this.filterTo = document.querySelector('.js-filter-to');
        this.getToday();
        this.filterFrom.value = this.from;
        this.filterTo.value = this.to;

        this.tabsList = [...document.querySelectorAll('.js-details')];
        this.tabsList.forEach((item) => item.addEventListener('click', this.changeDate.bind(this)));

        if(this.submit) {
            this.submit.addEventListener('click', this.sendData.bind(this));
        }
    }

    initStats() {
        var th = this,
            chartCanvasEl = document.getElementById('statistics-chart');
        if(chartCanvasEl) {
            this.chartCanvas = chartCanvasEl.getContext('2d');
        }

        this.chartWrap = document.querySelector('.js-chart-wrap');

        this.allOrigins = document.getElementById('all-origins');
        this.originsList = [...document.getElementsByName('origin-spot')];
        this.originsTable = document.querySelector('.js-statistics-table');
        this.locationsTable = document.querySelector('.js-locations-table');

        if(this.allOrigins) {
            this.allOrigins.addEventListener('click', this.useAllOrigins.bind(this));
        }
        if(this.originsTable) {
            this.originsTable.addEventListener('change', this.useCustomOrigins.bind(this));
        }

        $(document).on('click', '.js-remove-filter', th.removeFilter.bind(th));
    }

    removeFilter(event) {
        var btn = $(event.target.closest('button'));

        $('[name="' + btn.attr('data-filter') + '"]').each(function() {
            if($(this).prop('checked') === true) {
                $(this).prop('checked', false);
            } else {
                $(this).val('');
            }
        });
        $(this.submit).trigger('click');
    }

    // Смена периода выборки

    changeDate(evt) {
        this.tabsList.forEach((tab) => {
            tab.classList.remove('active');
        })
        evt.target.classList.add('active');
        this.currentTab = evt.target;
        this.getPeriod();
    }

    // Смена периода детализации

    changeDetails() {
        this.selectedDetail = this.details.options[this.details.selectedIndex].value;
        // if (this.selectedDetail == 'weekly-details') {
        //     // console.log('Недельная выборка');
        //     // this.getWeeklySummary();
        // } else if (this.selectedDetail == 'monthly-details') {
        //     console.log('Выборка за месяц');
        //     this.getMonthlySummary();
        // }
    }

    getWeeklySummary() {
        // console.log(this.diagram);
        // console.log(this.dates);
        let weeklySum = [];
        let size = 7;
        let weeklyObj = {};
        this.weeklyData = [];
        let datesByWeeks = [];
        let firstOne;
        let lastOne;
        let weekPeriod;
        this.weeklyDates = [];
        let reducer = (accumulator, currentValue) => accumulator + currentValue;

        for (let i = 0; i <Math.ceil(this.dates.length/size); i++){
            datesByWeeks[i] = this.dates.slice((i*size), (i*size) + size);
            firstOne = datesByWeeks[i][0];
            lastOne = datesByWeeks[i].slice(-1)[0];
            weekPeriod = String(firstOne + ' / ' + lastOne);
            this.weeklyDates.push(weekPeriod);
            // console.log(this.weeklyDates);
        }
        //
        // this.weeklyDates.push(weekPeriod);

        // console.log(this.weeklyDates);

        this.diagram.forEach((item) => {
            for (let i = 0; i <Math.ceil(item.data.length/size); i++){
                weeklySum[i] = item.data.slice((i*size), (i*size) + size);
                weeklySum[i] = weeklySum[i].reduce(reducer);
                // console.log(weeklySum);

            }
            weeklyObj = {
                label: item.label,
                data: weeklySum
            }
            this.weeklyData.push(weeklyObj);
            // console.log(weeklySum);
            console.log(this.weeklyData);
        });
    }

    getMonthlySummary() {

    }

    // Отправка данных формы

    async sendData(evt) {
        evt.preventDefault();
        let resp = new FormData(this.form);

        //Получаем форму

        let request = $(this.form).serializeArray();
        let newData = resp;

        // console.log(request);

        // for (var [key, value] of newData.entries()) {
            // console.log(key, value);
        // }

        let url = '/pages/diagram';
        this.dataset;
        this.diagramArea.innerHTML = '<div class="block content block-bordered text-center p-5"><img src="/images/loading_circle.gif" alt="loading"></div>';

        let json = {
            "table": [
                {
                    "location": "Домодедово",
                    "mac": 2475,
                    "phone": 2475,
                    "email": 2474
                },
                {
                    "location": "Коломна",
                    "mac": 2530,
                    "phone": 2530,
                    "email": 2527
                }
            ],
            "diagram": [
                {
                    "label": [
                        "Домодедово"
                    ],
                    "data": [
                        496,
                        493,
                        491,
                        507,
                        488,
                        576,
                        342,
                        235,
                        566,
                        665
                    ]
                },
                {
                    "label": [
                        "Коломна"
                    ],
                    "data": [
                        510,
                        494,
                        508,
                        513,
                        505,
                        494,
                        508,
                        513,
                        494,
                        508,
                        513,
                        494,
                        508,
                        513
                    ]
                }
            ],
            "dates": [
                "2020-07-01",
                "2020-07-02",
                "2020-07-03",
                "2020-07-04",
                "2020-07-05",
                "2020-07-06",
                "2020-07-07",
                "2020-07-08",
                "2020-07-09",
                "2020-07-10",
            ],
            "template":"<div class=\"statistics__chart content visually-hidden js-chart-wrap\" id=\"statistics-diagram\">\n    <button form=\"statistics-form\" type=\"submit\" class=\"btn btn-primary mb-5\" formaction=\"http:\/\/scanwifi.local\/pages\/segments\/add\">\u0421\u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0441\u0435\u0433\u043c\u0435\u043d\u0442<\/button>\n            <div class=\"applied-filters d-flex flex-row flex-wrap\">\n                                                <button class=\"btn btn-sm btn-outline-dark btn-rounded bg-white mb-3 mr-3 js-remove-filter\" data-filter=\"filter[type]\" type=\"button\">\n                        \u0422\u0438\u043f \u0434\u0430\u043d\u043d\u044b\u0445 <i class=\"fa fa-times\"><\/i>\n                    <\/button>                \n                                                                                                                                                                                <button class=\"btn btn-sm btn-outline-dark btn-rounded bg-white mb-3 mr-3 js-remove-filter\" data-filter=\"filter[min]\" type=\"button\">\n                        \u0412\u0438\u0437\u0438\u0442\u043e\u0432 \u043e\u0442 <i class=\"fa fa-times\"><\/i>\n                    <\/button>                \n                                                                <button class=\"btn btn-sm btn-outline-dark btn-rounded bg-white mb-3 mr-3 js-remove-filter\" data-filter=\"filter[max]\" type=\"button\">\n                        \u0412\u0438\u0437\u0438\u0442\u043e\u0432 \u0434\u043e <i class=\"fa fa-times\"><\/i>\n                    <\/button>                \n                                                                                                                        <\/div>\n        <canvas class=\"js-chartjs-bars chartjs-render-monitor\" id=\"statistics-chart\" width=\"734\" height=\"367\"><\/canvas>\n<\/div>\n\n<div class=\"content\">\n    <table class=\"table table-bordered block statistics-table col-md-10 js-locations-table visually-hidden\">\n        <thead class=\"thead-light\">\n            <tr>\n                <th class=\"d-sm-table-cell statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"all-origins\" class=\"form-check-input\" data-type=\"all-origins\">\n                        <label for=\"all-origins\" class=\"form-check-label statistics__label\">\u0412\u0441\u0435 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u0438<\/label>\n                    <\/div>\n                <\/th>\n                <th class=\"d-sm-table-cell statistics-table__cell\">\n                    <div class=\"form-check statistics-table__wrap\">\n                        <input type=\"radio\" name=\"origin\" id=\"origin-id-1\" class=\"form-check-input statistics-table__radio\" data-type=\"origin-id-1\" checked>\n                        <label for=\"origin-id-1\" class=\"form-check-label statistics__label\">MAC<\/label>\n                        <i class=\"far fa-chart-bar statistics-table__icon\"><\/i>\n                    <\/div>\n                <\/th>\n                <th class=\"d-sm-table-cell statistics-table__cell\">\n                    <div class=\"form-check statistics-table__wrap\">\n                        <input type=\"radio\" name=\"origin\" id=\"origin-id-2\" class=\"form-check-input statistics-table__radio\" data-type=\"origin-id-2\">\n                        <label for=\"origin-id-2\" class=\"form-check-label statistics__label\">\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u044b<\/label>\n                        <i class=\"far fa-chart-bar statistics-table__icon\"><\/i>\n                    <\/div>\n                <\/th>\n                <th class=\"d-sm-table-cell statistics-table__cell\">\n                    <div class=\"form-check statistics-table__wrap\">\n                        <input type=\"radio\" name=\"origin\" id=\"origin-id-3\" class=\"form-check-input statistics-table__radio\" data-type=\"origin-id-3\">\n                        <label for=\"origin-id-3\" class=\"form-check-label statistics__label\">E-mail<\/label>\n                        <i class=\"far fa-chart-bar statistics-table__icon\"><\/i>\n                    <\/div>\n                <\/th>\n            <\/tr>\n        <\/thead>\n        <tbody class=\"js-statistics-table\">\n            <!-- <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-1\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-1\" checked>\n                        <label for=\"spot-id-1\" class=\"form-check-label statistics__label js-origin\">\u0411\u043e\u043b\u044c\u043d\u0438\u0446\u0430 \u0421\u043a\u043b\u0438\u0444\u043e\u0441\u043e\u0432\u0441\u043a\u043e\u0433\u043e<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">121<\/td>\n                <td class=\"statistics-table__cell\">105<\/td>\n                <td class=\"statistics-table__cell\">134<\/td>\n            <\/tr>\n            <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-2\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-2\" checked>\n                        <label for=\"spot-id-2\" class=\"form-check-label statistics__label js-origin\">\u0421\u043a\u0430\u043d\u0435\u0440 MAC<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n            <\/tr>\n            <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-3\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-3\" checked>\n                        <label for=\"spot-id-3\" class=\"form-check-label statistics__label js-origin\">\u0411\u043e\u043b\u044c\u043d\u0438\u0446\u0430 \u0421\u043a\u043b\u0438\u0444\u043e\u0441\u043e\u0432\u0441\u043a\u043e\u0433\u043e<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">121<\/td>\n                <td class=\"statistics-table__cell\">105<\/td>\n                <td class=\"statistics-table__cell\">134<\/td>\n            <\/tr>\n            <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-4\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-4\" checked>\n                        <label for=\"spot-id-4\" class=\"form-check-label statistics__label js-origin\">\u0421\u043a\u0430\u043d\u0435\u0440 MAC<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n            <\/tr>\n            <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-5\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-5\" checked>\n                        <label for=\"spot-id-5\" class=\"form-check-label statistics__label js-origin\">\u0411\u043e\u043b\u044c\u043d\u0438\u0446\u0430 \u0421\u043a\u043b\u0438\u0444\u043e\u0441\u043e\u0432\u0441\u043a\u043e\u0433\u043e<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">121<\/td>\n                <td class=\"statistics-table__cell\">105<\/td>\n                <td class=\"statistics-table__cell\">134<\/td>\n            <\/tr>\n            <tr>\n                <td class=\"statistics-table__cell\">\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" id=\"spot-id-6\" class=\"form-check-input js-origin\" name=\"origin-spot\" data-type=\"spot-id-6\">\n                        <label for=\"spot-id-6\" class=\"form-check-label statistics__label js-origin\">\u0421\u043a\u0430\u043d\u0435\u0440 MAC<\/label>\n                    <\/div>\n                <\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n                <td class=\"statistics-table__cell\">60<\/td>\n            <\/tr> -->\n        <\/tbody>\n    <\/table>\n<\/div>\n"
        };

        //Забираем данные с фильтром
        axios.post(url, request).then(response => {
            this.getData(response.data);
            // this.getData(json);
            // console.log(json);
            // console.log(response.data);
        });
    }

    // Передача периода детализации в форму

    getPeriod() {
        this.period = this.currentTab.dataset.period;


        switch (this.period) {
            case 'today':
                this.getToday();
            break;
            case 'yesterday':
                this.getYesterday();
            break;
            case 'week':
                this.getWeek();
            break;
            case 'month':
                this.getMonth();
            break;
            case 'year':
                this.getYear();
            break;
            default:
                this.getToday();
            break;
        }

        this.filterFrom.value = this.from;
        this.filterTo.value = this.to;
    }

    // Получение периода

    getToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        this.from = today;
        this.to = today;
    }

    getYesterday() {
        let today = new Date();
        let yesterday = new Date(today - 864e5);
        let bd = String(yesterday.getDate()).padStart(2, '0');
        let bm = String(yesterday.getMonth() + 1).padStart(2, '0');
        let byyy = yesterday.getFullYear();

        yesterday = byyy + '-' + bm + '-' + bd;
        this.from = yesterday;
        this.to = yesterday;
    }

    getWeek() {
        let today = new Date();

        let first = today.getDate() - today.getDay() + 1;
        let last = first + 6;

        let firstday = new Date(today.setDate(first));
        let lastday = new Date(today.setDate(last));

        let fd = String(firstday.getDate()).padStart(2, '0');
        let fm = String(firstday.getMonth() + 1).padStart(2, '0');
        let fyyy = firstday.getFullYear();

        let ld = String(lastday.getDate()).padStart(2, '0');
        let lm = String(lastday.getMonth() + 1).padStart(2, '0');
        let lyyy = lastday.getFullYear();

        first = fyyy + '-' + fm + '-' + fd;
        last = lyyy + '-' + lm + '-' + ld;

        this.from = first;
        this.to = last;

        // если обе даты в одном месяце
    }

    getMonth() {
        let today = new Date();

        let firstday = new Date(today.getFullYear(), today.getMonth(), 1);

        let lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        let fd = String(firstday.getDate()).padStart(2, '0');
        let fm = String(firstday.getMonth() + 1).padStart(2, '0');
        let fyyy = firstday.getFullYear();

        let ld = String(lastday.getDate()).padStart(2, '0');
        let lm = String(lastday.getMonth() + 1).padStart(2, '0');
        let lyyy = lastday.getFullYear();

        let first = fyyy + '-' + fm + '-' + fd;
        let last = lyyy + '-' + lm + '-' + ld;

        this.from = first;
        this.to = last;
    }

    getYear() {
        let today = new Date();
        let year = String(today.getFullYear());

        this.from = year + '-01-01';
        this.to = year + '-12-31';
    }

    // Отрисовка данных статистики

    async getData(obj) {

        let valuesObj = obj;

        let diagram = [];
        let table = [];

        for (let i in valuesObj) {
            if (i === 'table') {
                table = valuesObj[i];
            } else if (i === 'diagram') {
                diagram = valuesObj[i];
            }
        }

        // console.log(diagram);
        //console.log(obj);

        if(obj.template) {
            this.dates = valuesObj.dates;
            this.diagram = diagram;
            this.changeDetails();
            this.diagramArea.innerHTML = obj.template;
            this.initStats();
        }

        switch(this.selectedDetail) {
            case 'daily-details':
                this.createChart(diagram, obj['dates'], obj['diagram']);
                this.fillTable(table);
            break;
            case 'weekly-details':
                this.getWeeklySummary();
                this.weeklyChart();
            break;
            case 'monthly-details':
                this.getMonthlySummary();
            break;
            default:
                this.createChart(diagram, obj['dates'], obj['diagram']);
            break;
        }

        this.fillTable(table);
    }

    // Заполнение таблицы

    fillTable(table) {
        let i;
        let tmp;
        for (let key in table) {
            i = table[key];
            tmp = `
                <tr>
                    <td class="statistics-table__cell">
                        <div class="form-check">
                            <input type="checkbox" id="${i.location}" class="form-check-input js-origin" name="origin-spot" data-type="${i.location}" checked>
                            <label for="${i.location}" class="form-check-label statistics__label js-origin">${i.location}</label>
                        </div>
                    </td>
                    <td class="statistics-table__cell">${i.mac}</td>
                    <td class="statistics-table__cell">${i.phone}</td>
                    <td class="statistics-table__cell">${i.email}</td>
                </tr>
            `;
            this.originsTable.insertAdjacentHTML('beforeend', tmp);
        };
        this.locationsTable.classList.remove('visually-hidden');

        this.filterType = document.querySelector('.js-filter-type:checked').dataset.type;
        this.tableRadio = document.querySelector('.js-table-radio[data-type=' + this.filterType + ']');
        if (this.tableRadio) {
            this.tableRadio.checked = true;
        }
        this.filtersBlock.classList.add('block-mode-hidden');
    }

    // Выбор цвета для набора данных

    getRandomColor() {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Использовать все источники данных

    useAllOrigins() {
        if (this.allOrigins.checked == true) {
            this.originsList.forEach((origin) => {
                origin.checked = false;
            });
        }
    }

    // Выбор источников

    useCustomOrigins(evt) {
        let checkedOrigins = [...document.querySelectorAll('input.js-origin:checked')];
        if (evt.target.classList.contains('js-origin') && checkedOrigins.length !== 0) {
            this.allOrigins.checked = false;
        } else if (evt.target.classList.contains('js-origin') && checkedOrigins.length == 0) {
            this.allOrigins.checked = true;
        }
    }

    // Недельный график

    weeklyChart() {
        let options = {
            type: 'bar',
            data: {
                labels: this.weeklyDates,
                datasets: this.weeklyData
            }
        }
        // console.log(this.weeklyData);
        new Chart(this.chartCanvas, options);
        this.chartWrap.classList.remove('visually-hidden');

    }

    // Отрисовка графика

    createChart(obj, dates, diagram) {
        let options = {
            type: 'bar',
            data: {
                labels: dates,
                datasets: diagram
            },
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    formatter: function (value, context) {
                        return context.dataset.labels[context.dataIndex];
                    }
                }
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            reverse: false
                        }
                    }]
                }
            }
        }

        new Chart(this.chartCanvas, options);
        this.chartWrap.classList.remove('visually-hidden');
    }
}

new ChartCreate();
