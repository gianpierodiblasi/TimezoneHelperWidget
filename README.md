# TimezoneHelperWidget
An extension to manage timezones in dates.

## Description
This extension provides a widget to manage timezones in dates.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- browserTimeZoneOffset - NUMBER (no default value): the browser timezone offset (in minutes)
- browserTimeZone - STRING (no default value): the browser timezone
- numberOfDates - INTEGER (default = 1): the number of dates to manage
- externalTimeZoneOffset - NUMBER (default = 0): the offset of an external timezone (in minutes)
- date1, ..., date\<numberOfDates\> - DATETIME (default = the current datetime): dynamic properties based on the value of numberOfDates, they are the datetime to manage
- date1TimeZoneType, ..., date\<numberOfDates\>TimeZoneType - STRING (default = 'b2t'): the type of timezone to use for each datetime (options: b2t, t2b)
- date1AddDays, ..., date\<numberOfDates\>AddDays - NUMBER (default = 0): the number of days to add to each datetime (used if and only if TimeZoneType = b2t)
- date1IfUndefined, ..., date\<numberOfDates\>IfUndefined - STRING (default = 'nothing'): The type of action to be taken if any date is undefined (options: nothing, create, create_add)
- date1Evaluated, ..., date\<numberOfDates\>Evaluated - DATETIME (no default value): the evaluated date

## Services
- date1Evaluate, ..., date\<numberOfDates\>Evaluate: service to be launched to process each date
  
## Events
- date1Evaluated, ..., date\<numberOfDates\>Evaluated: event thrown when each date is processed
  
## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
