function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getCalendars() {
  var calendars = CalendarApp.getAllCalendars();
  var result = {
    calendars: [],
    primaryIndex: -1
  };
  
  for(var i = 0; i < calendars.length; i++) {
    result.calendars.push({
      id: calendars[i].getId(),
      name: calendars[i].getName(),
      color: calendars[i].getColor(),
      description: calendars[i].getDescription(),
      primary: calendars[i].isMyPrimaryCalendar()
    });
    
    if(calendars[i].isMyPrimaryCalendar()) {
      result.primaryIndex = i;
    }
  }
  
  return result;
}

function getTime(calendarName, title, weeksBefore) {
  var calendar = CalendarApp.getCalendarsByName(calendarName)[0];
  var now = new Date();
  var start = new Date(now.getTime() - (weeksBefore * 7 * 24 * 60 * 60 * 1000));
  var end = now;
  var searchOptions = {
    search: title
  };
    
  var calendarEvents = calendar.getEvents(start, end);
  
  var valid =  0;
  var time = 0;
  
  for(var i = 0; i < calendarEvents.length; i++) {
    var event = calendarEvents[i];
    if(!event.isAllDayEvent() && event.getTitle().indexOf(title) !== -1) {
      var startTime = event.getStartTime();
      var endTime = event.getEndTime();
      
      valid++;
      time += (endTime - startTime);
      
      Logger.log(event.getTitle() + ' lasted ' + ((endTime - startTime) / (60 * 60 * 1000)) + ' hours');
    }
  }
  Logger.log('While searching for ' + title + ', found ' + valid  + ' events lasting ' + time);
  return time;
}