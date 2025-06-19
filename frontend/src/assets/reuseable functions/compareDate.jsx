
const shortMonthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const shortWeekdayNames = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
];

export function compareDate(date){
    const dateObj = new Date(date);
    const formatDate = (dateObj) => new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    const todayDate = formatDate(new Date());  

    if(todayDate.getDate() === formatDate(new Date(dateObj)).getDate()+1-1){
      return "Tomorrow"
    }
    else if(todayDate.getDate() > formatDate(new Date(dateObj)).getDate()+1-1){
      return "Today"
    }else return shortMonthNames[dateObj.getMonth()] + " " + dateObj.getDate()
  
  }