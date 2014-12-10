# C3 Chart AngularJS Directive

## Version 0.0.1

An AngularJS Directive to allow easy inclusion of C3 style charts in an Angular template.

---

### Installation

1. Install using Bower with `bower install times/c3chart --save`

2. Include `c3.js`, `c3.css` and `c3chart.js` in your project
    
    `<link rel="stylesheet" href="bower_components/c3js-chart/c3.css" />`
    `<script src="bower_components/c3js-chart/c3.js"></script>`
    `<script src="bower_components/c3chart/c3chart.js"></script>`

3. Inject the `c3-chart` module as a depencency into your Angular app

	```angular.module('your.module', [
    	'c3-chart'
	]);```


### Usage

__Controller__

1. Setup your chart config and add it to a scope variable:

```$scope.config = {
    data: {
        columns: [
            ['Segment 1', 40],
            ['Segment 2', 120],
        ],
        type : 'donut',
    }
};```

2. Create a `<c3chart>` element in your template, referencing your scope variable set up in the previous step:

`<c3chart config="config"></c3chart>`