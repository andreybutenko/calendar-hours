function getCalendars() {
  var calendars = CalendarApp.getAllCalendars();
  var result = [];
  
  for(var i = 0; i < calendars.length; i++) {
    result.push({
      id: calendars[i].getId(),
      name: calendars[i].getName()
    });
  }
  
  Logger.log(result);
  
  return result;
}

function sumHours(calendarName, title, weeksBefore) {
  var calendar = CalendarApp.getCalendarsByName(calendarName)[0];
  var now = new Date();
  var start = new Date(now.getTime() - (weeksBefore * 7 * 24 * 60 * 60 * 1000));
  var end = now;
  var searchOptions = {
    search: title
  };
  
  Logger.log(start);
    
  var calendarEvents = calendar.getEvents(start, end, searchOptions);
  
  var time = 0;
  
  Logger.log('Found ' + calendarEvents.length + ' events');
  
  for(var i = 0; i < calendarEvents.length; i++) {
    var event = calendarEvents[i];
    if(event.isAllDayEvent()) {
      continue;
    }
    
    var startTime = event.getStartTime();
    var endTime = event.getEndTime();
    
    time += (endTime - startTime);
  }
  
  var hours = time / (60 * 60 * 1000);
  
  Logger.log(hours);
  
  return hours;
}