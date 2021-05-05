const ConfirmedTxt = document.querySelector('.Confirmed');
const RecoveredTxt = document.querySelector('.Recovered');
const HospitalizedTxt = document.querySelector('.Hospitalized');
const DeathsTxt = document.querySelector('.Deaths');
const NewConfirmedTxt = document.querySelector('.NewConfirmed');
const NewHospitalizedTxt = document.querySelector('.NewHospitalized');
const NewDeathsTxt = document.querySelector('.NewDeaths');
const UpdateDateTxt = document.querySelector('.UpdateDate');


fetch('https://covid19.th-stat.com/api/open/today')
.then((res) => {
    return res.json();
})
.then((data) => {
    ConfirmedTxt.innerHTML = 'ผู้ติดเชื้อสะสม : ' + data.Confirmed;
    RecoveredTxt.innerHTML = 'รักษาหาย : ' + data.Recovered;
    HospitalizedTxt.innerHTML = 'อยู่ใน รพ. : ' + data.Hospitalized;
    DeathsTxt.innerHTML = 'เสียชีวิต : ' + data.Deaths;
    NewConfirmedTxt.innerHTML = 'ผู้ป่วยใหม่ : ' + data.NewConfirmed;
    NewHospitalizedTxt.innerHTML = 'ผู้ป่วยใหม่ที่เข้า รพ. : ' + data.NewHospitalized;
    NewDeathsTxt.innerHTML = 'ผู้เสียชีวิตรายใหม่ : ' + data.NewDeaths;
    UpdateDateTxt.innerHTML = 'อัพเดตล่าสุดเมื่อ : ' + data.UpdateDate;
})
.catch((err) => {
    console.log(err.message);
})