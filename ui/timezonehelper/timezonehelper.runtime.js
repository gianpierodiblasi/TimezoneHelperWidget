/* global TW, Intl */
TW.Runtime.Widgets.timezonehelper = function () {
  var thisWidget = this;

  this.runtimeProperties = function () {
    return {
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-timezonehelper" style="display:none;"></div>';
    return html;
  };

  this.afterRender = function () {
    var debugMode = thisWidget.getProperty('debugMode');

    var offset = new Date().getTimezoneOffset();
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (debugMode) {
      console.log("TimeZoneHelper - browserTimeZoneOffset = " + offset + ", browserTimeZone = " + timezone);
    }
    thisWidget.setProperty('browserTimeZoneOffset', offset);
    thisWidget.setProperty('browserTimeZone', timezone);
  };

  this.serviceInvoked = function (serviceName) {
    if (serviceName.toLowerCase().startsWith("date")) {
      var dateN = parseInt(serviceName.replace("Date", "").replace("Evaluate", ""), 10);

      var debugMode = thisWidget.getProperty('debugMode');
      var externalTimeZoneOffset = thisWidget.getProperty('externalTimeZoneOffset');
      if (debugMode) {
        console.log("TimeZoneHelper - externalTimeZoneOffset = " + externalTimeZoneOffset);
      }

      var date = thisWidget.getProperty('date' + dateN);
      var dateTimeZoneType = thisWidget.getProperty('date' + dateN + 'TimeZoneType');
      var dateAddDays = thisWidget.getProperty('date' + dateN + 'AddDays');
      var dateIfUndefined = thisWidget.getProperty('date' + dateN + 'IfUndefined');

      if (debugMode) {
        console.log("TimeZoneHelper - date = " + date + ", dateTimeZoneType = " + dateTimeZoneType + ", dateAddDays = " + dateAddDays + ", dateIfUndefined = " + dateIfUndefined);
      }

      if (date) {
        date = new Date(date.getTime());
      } else {
        switch (dateIfUndefined) {
          case 'nothing':
            dateTimeZoneType = "";
            break;
          case 'create':
            date = new Date();
            dateAddDays = 0;
            break;
          case 'create_add':
            date = new Date();
            break;
        }
      }

      switch (dateTimeZoneType) {
        case "b2t":
          date.setTime(date.getTime() + (date.getTimezoneOffset() + externalTimeZoneOffset + 60 * 24 * dateAddDays) * 60 * 1000);
          break;
        case "t2b":
          date.setTime(date.getTime() - (date.getTimezoneOffset() + externalTimeZoneOffset) * 60 * 1000);
          break;
      }

      if (debugMode) {
        console.log("TimeZoneHelper - new date = " + date);
      }

      thisWidget.setProperty('date' + dateN + 'Evaluated', date);
      thisWidget.jqElement.triggerHandler('Date' + dateN + 'Evaluated');
    }
  };

  this.updateProperty = function (updatePropertyInfo) {
    this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawSinglePropertyValue);
  };
};