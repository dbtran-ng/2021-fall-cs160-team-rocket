function formatDate(date){
    const isoString = new Date().toISOString();

    const options = { month: "long", day: "numeric", year: "numeric" };
    date = new Date(isoString);
    const americanDate = new Intl.DateTimeFormat("en-US", options).format(date);
    
    const time = document.createElement("time");
    time.setAttribute("datetime", isoString);
    return americanDate;
}
export default formatDate;