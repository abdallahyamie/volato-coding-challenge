import DataModel from "../lib/DataModel";

export const averagesCalculatorModel= new DataModel("Stats Calculator",
   {
    "num1": {
      "label": "Number 1",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num2": {
      "label": "Number 2",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num3": {
      "label": "Number 3",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num4": {
      "label": "Number 4",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num5": {
      "label": "Number 5",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num6": {
      "label": "Number 6",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num7": {
      "label": "Number 7",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num8": {
      "label": "Number 8",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num9": {
      "label": "Number 9",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "num10": {
      "label": "Number 10",
      "type": "number",
      "readOnly": false,
      "calculate": null
    },
    "mean": {
      "label": "Mean",
      "type": "float",
      "readOnly": true,
      // "calculate": "divide(sum(num1, num2, num3), count(num1, num2, num3))"
      "calculate": "divide(sum(num1, num2, num3, num4, num5, num6, num7, num8, num9, num10), 10)"
    },
    "median": {
      "label": "Median",
      "type": "float",
      "readOnly": true,
      // "calculate": "median(num1, num2, num3)"
      "calculate": "median(num1, num2, num3, num4, num5, num6, num7, num8, num9, num10)"
    },
    "stdDev": {
      "label": "Standard Deviation",
      "type": "float",
      "readOnly": true,
      // "calculate": "standardDev(num1, num2, num3)"
      "calculate": "standardDev(num1, num2, num3, num4, num5, num6, num7, num8, num9, num10)"
    }
  }
)