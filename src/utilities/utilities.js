export const dateToCalendar = (date) => {
    try {
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return yyyy + '-' + mm + '-'+ dd;
    } catch (error) {
        return
    }

}

export const stringToDate = (date) => {
    var tempDate = new Date(date.split('-'))
    return tempDate;
}