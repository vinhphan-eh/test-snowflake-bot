export const mockDrawdownWageGeneralError = () => {
  return {
    "path": [
      "drawdownWage"
    ],
    "data": null,
    "errorType": "EHCoreError",
    "errorInfo": null,
    "locations": [
      {
        "line": 4,
        "column": 3,
        "sourceName": null
      }
    ],
    "message": "{\"statusCode\":400,\"timestamp\":\"2023-04-04T03:09:47.784Z\",\"path\":\"/earned-wage/drawdown-wage\",\"message\":\"missing X-EH-Session-Token header\"}"
  }
};

export const mockDrawdownWageRefuseMaxBalanceExceed = () => {
  return {
    "path": [
      "drawdownWage"
    ],
    "data": null,
    "errorType": "EHCoreError",
    "errorInfo": null,
    "locations": [
      {
        "line": 4,
        "column": 3,
        "sourceName": null
      }
    ],
    "message": "{\"messageCode\":\"REFUSED_MAX_BALANCE_EXCEEDED\",\"statusCode\":400,\"timestamp\":\"2023-04-04T03:09:47.784Z\",\"path\":\"/earned-wage/drawdown-wage\",\"message\":\"missing X-EH-Session-Token header\"}"
  }
};
