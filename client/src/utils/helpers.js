const helpers = {};

helpers.formatDate = date => {
    let a = date.split("T");
    let d = a[0].split("-");
    let t = a[1].split(":");      

    let ampm = (t[0] >= 12) ? 'PM' : 'AM';
    let hour = (t[0] > 12) ? t[0] - 12 : t[0];

    let theDate = new Date(Date.parse(`${d[1]}/${d[2]}/${d[0]} ${hour}:${t[1]} ${ampm} UTC`));

    return theDate.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});    
}

export default helpers;