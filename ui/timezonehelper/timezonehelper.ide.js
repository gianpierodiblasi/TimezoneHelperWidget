/* global TW */
TW.IDE.Widgets.timezonehelper = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/TimezoneHelperWidget/ui/timezonehelper/timezone.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'TimeZoneHelper',
      'description': 'Widget to manage timezones in dates',
      'category': ['Common'],
      'iconImage': 'timezone.png',
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'browserTimeZoneOffset': {
          'isEditable': false,
          description: "The browser timezone offset (in minutes)",
          isBindingSource: true,
          defaultValue: '',
          baseType: 'NUMBER'
        },
        'browserTimeZone': {
          'isEditable': false,
          description: "The browser timezone",
          isBindingSource: true,
          defaultValue: '',
          baseType: 'STRING'
        },
        'numberOfDates': {
          'description': 'The number of dates to manage',
          'baseType': 'INTEGER',
          'defaultValue': 1
        },
        'externalTimeZoneOffset': {
          'isEditable': true,
          description: "The offset of an external timezone (in minutes)",
          isBindingTarget: true,
          baseType: "NUMBER",
          defaultValue: 0,
          isVisible: true
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        }
      }
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-timezonehelper">' + '<span class="timezonehelper-property">TimeZone Helper</span>' + '</div>';
  };

  this.afterRender = function () {
    this.addNewEventParameters(this.getProperty('numberOfDates'));
  };

  this.afterSetProperty = function (name, value) {
    if (name === 'numberOfDates') {
      this.deleteOldEventParameters();
      this.addNewEventParameters(value);
    }

    return false;
  };

  this.deleteOldEventParameters = function () {
    var properties = this.allWidgetProperties().properties;

    for (var key in properties) {
      if (key.toLowerCase().startsWith("date")) {
        delete properties[key];
      }
    }
  };

  this.addNewEventParameters = function (numberOfDates) {
    var properties = this.allWidgetProperties().properties;

    for (var dateN = 1; dateN <= numberOfDates; dateN++) {
      properties['date' + dateN] = {
        isBaseProperty: false,
        name: 'date' + dateN,
        type: 'property',
        description: 'The date N. ' + dateN,
        isBindingTarget: true,
        baseType: "DATETIME",
        defaultValue: new Date(),
        isEditable: true,
        isVisible: true
      };

      properties['date' + dateN + 'TimeZoneType'] = {
        isBaseProperty: false,
        name: 'date' + dateN + 'TimeZoneType',
        type: 'property',
        description: 'The type of timezone to use for the date N. ' + dateN,
        isBindingTarget: true,
        baseType: "STRING",
        defaultValue: 'b2t',
        isEditable: true,
        isVisible: true,
        'selectOptions': [
          {value: 'b2t', text: 'Browser TimeZone to External TimeZone'},
          {value: 't2b', text: 'External TimeZone to Browser TimeZone'}
        ]
      };

      properties['date' + dateN + 'AddDays'] = {
        isBaseProperty: false,
        name: 'date' + dateN + 'AddDays',
        type: 'property',
        description: 'The number of days to add to the date N. ' + dateN + ' (used if and only if date' + dateN + 'TimeZoneType = "Browser TimeZone to External TimeZone")',
        isBindingTarget: true,
        baseType: "INTEGER",
        defaultValue: 0,
        isEditable: true,
        isVisible: true
      };

      properties['date' + dateN + 'IfUndefined'] = {
        isBaseProperty: false,
        name: 'date' + dateN + 'IfUndefined',
        type: 'property',
        description: 'The type of action to be taken if the date N. ' + dateN + " is undefined",
        isBindingTarget: true,
        baseType: "STRING",
        defaultValue: 'nothing',
        isEditable: true,
        isVisible: true,
        'selectOptions': [
          {value: 'nothing', text: 'Nothing (Keep Undefined)'},
          {value: 'create', text: 'Create'},
          {value: 'create_add', text: 'Create and Add Days'}
        ]
      };

      properties['date' + dateN + 'Evaluated'] = {
        isBaseProperty: false,
        name: 'date' + dateN + 'Evaluated',
        type: 'property',
        description: 'The evaluated date N. ' + dateN,
        isBindingSource: true,
        baseType: "DATETIME",
        defaultValue: '',
        isVisible: true,
        isEditable: false
      };

      properties['Date' + dateN + 'Evaluate'] = {
        name: "Date" + dateN + 'Evaluate',
        type: "service",
        description: 'Service to be launched to process the date N. ' + dateN,
        isVisible: true
      };

      properties['Date' + dateN + 'Evaluated'] = {
        name: "Date" + dateN + 'Evaluated',
        type: "event",
        description: 'Event thrown when the date N. ' + dateN + " is processed",
        isVisible: true
      };
    }

    this.updatedProperties({
      updateUI: true
    });
  };
};