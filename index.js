const fetch = require('node-fetch')
const faker = require('faker')
const moment = require('moment')
const qs = require('qs')
const cronJob = require('cron').CronJob
require('colors')

let referralId = `113266`
let randomIP, timeoutTimer = 10000

function functionRandomIP() {
  randomIP = (Math.floor(Math.random() * 255) + 1) + '.' + (Math.floor(Math.random() * 255)) + '.' + (Math.floor(Math.random() * 255)) + '.' + (Math.floor(Math.random() * 255))
}

function randNumber(length) {
  const result = []
  const characters = '0123456789'
  for ( var i = 0; i < length; i++ ) result.push(characters.charAt(Math.floor(Math.random() *  characters.length)))
  return result.join('')
}

const functionGetCSRF = () => new Promise((resolve, reject) => {
  fetch(`https://ngabuburit.id/daftar?ref=${referralId}&utm_source=whatsapp&utm_campaign=Bonus`, {
    method: 'GET',
    timeout: timeoutTimer,
    headers: {
      'Cookie': `XSRF-TOKEN=eyJpdiI6IjVWM09TUjR0NUQ2Q2JxenlNaUhZTkE9PSIsInZhbHVlIjoiNTRcL1AzOTlFOEl6RmxyYmVaaVoyWDhLdWlndGpVUWFPdVE4cTQxUWpoMTR5MjhYWlNnd2JYTERlVVwvTlZ2SEt4IiwibWFjIjoiYzY5YmJmOTZlMTFjOGY1MzQwMDY3YmQ5ZDk0MWJlMWQyNDIyMzk2NWUzOTAyNDg5ZDBjMzEzMmY0ZGUzYjIzOCJ9; ngabuburit_session=eyJpdiI6IkJCT1U2NjlXbHpcL1l0SVdMYW1wbW53PT0iLCJ2YWx1ZSI6Im95SHZMVkdVdFV1VEU0Q1ZJZ3NBZmtwYWRJNVFVbU9NbkloMzZEemQ5WkpNOWxqMDJackJEaCtBNFFzUWs0YmoiLCJtYWMiOiJmMjA2YWQyZThkODI4YzJiZmM1OWYzOWQwZDUyOWM2ZTA5ZGFkZjVlODAzMWNhZjA0YzVmNmQ4ZDE0OWIzODQzIn0%3D; ref=eyJpdiI6ImFZbUFGcm5OU3prQVhtdzJZYnZiaEE9PSIsInZhbHVlIjoiOWg5OHFhMHNQcnM4UTN0cXo0NXA5UT09IiwibWFjIjoiMzM5YzlmYTcwYzA3ZmVhOGY1NTFiYjVkNTA4ZDc4M2VjNTRkN2ZlYjhiOGFjZDY5YTUyOTRhN2FmYmI0ZmY4NyJ9; utm_campaign=eyJpdiI6ImprR1ZQNnllNzJ4N1F3ZFdpbCtjVXc9PSIsInZhbHVlIjoiSXFPdVVFTVNPUGhxWUtsV0QyY1ZnZz09IiwibWFjIjoiMmRhYTRiNDNhN2E5YmRiZGQzYjE2YzBlZTE0Y2E5MjMxODQxM2Q4OTU5NGZiOGI3MjU1NmM1YTFiMTMwMWJhZSJ9; utm_medium=eyJpdiI6InZ4REFGelZWeVZ2UXd1K3VwMWR3d2c9PSIsInZhbHVlIjoiSW01bmI4allpWjlRTW9iXC83U1VtUGc9PSIsIm1hYyI6IjY3MjllNjg2YTA1ZTc0YmMzZDQ4ZmFiZDQ2Y2VkOTA0ODI2MWYyNDZhODE1MTUwMmMzYjJjMjEyZWEzODFiYjcifQ%3D%3D; utm_source=eyJpdiI6IlFOS1d1eExiTFRPZTl4UndPa1VhWGc9PSIsInZhbHVlIjoiMnZaS1B4MFVEZTZ3djBwQ3Q5TVwvQkE9PSIsIm1hYyI6ImYwZTNkNGMwNjU3NTEyZTY0MzUwMTJiNDAyNGI4MDI1MjMxMzRlMWZlOWMwYzk5M2RlYzYwMjE1YThhMWVkNTAifQ%3D%3D; utm_content=eyJpdiI6IndBbGpmdGswMkNJNWxPSWpJTmtONXc9PSIsInZhbHVlIjoiVWx1UlJRU2diSlpZZWJyN2p6bTZUUT09IiwibWFjIjoiYmUyYmM0ZDBjZmE3NjYxYjM4MGNlNjFjODgwNTYwMzg5NTFiNDQ5NzEwY2M1MjU0ZGQ4OWQ2OGI2YTVkOGU2YSJ9; _ga=GA1.2.752296362.1619402008; _gid=GA1.2.2034739505.1619402008; _fbp=fb.1.1619402033004.1292834463`,
      'X-Forwarded-For': randomIP,
      'X-ProxyUser-Ip': randomIP
    }
  })
  .then(res => res.text())
  .then(res => {
    const csrfToken = res.split('<meta name="csrf-token" content="')[1].split('">')[0]
    resolve(csrfToken)
  })
  .catch(err => reject(err))
})

const functionSubmitRegister = (csrf, fullname, email, whatsappNumber, idKota) => new Promise((resolve, reject) => {
  const postBody = qs.stringify({
    _token: csrf,
    name: fullname,
    email: email,
    whatsapp: whatsappNumber,
    kota: idKota,
    password: 'y72wSgHPUneVCxx',
    password_confirmation: 'y72wSgHPUneVCxx',
    subscribeEmail: '1',
    subscribeWhatsapp: '1',
    ref: referralId,
    utm_medium: 'share+button',
    utm_campaign: 'Bonus+THR',
    utm_source: 'whatsapp',
    utm_content: 'homepage'
  })
  fetch('https://ngabuburit.id/register', {
    method: 'POST',
    timeout: timeoutTimer,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'id,en-US;q=0.7,en;q=0.3',
      'Accept-Encoding': 'gzip, deflate',
      'Origin': 'https://ngabuburit.id',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36',
      'Cookie': `XSRF-TOKEN=eyJpdiI6IjVWM09TUjR0NUQ2Q2JxenlNaUhZTkE9PSIsInZhbHVlIjoiNTRcL1AzOTlFOEl6RmxyYmVaaVoyWDhLdWlndGpVUWFPdVE4cTQxUWpoMTR5MjhYWlNnd2JYTERlVVwvTlZ2SEt4IiwibWFjIjoiYzY5YmJmOTZlMTFjOGY1MzQwMDY3YmQ5ZDk0MWJlMWQyNDIyMzk2NWUzOTAyNDg5ZDBjMzEzMmY0ZGUzYjIzOCJ9; ngabuburit_session=eyJpdiI6IkJCT1U2NjlXbHpcL1l0SVdMYW1wbW53PT0iLCJ2YWx1ZSI6Im95SHZMVkdVdFV1VEU0Q1ZJZ3NBZmtwYWRJNVFVbU9NbkloMzZEemQ5WkpNOWxqMDJackJEaCtBNFFzUWs0YmoiLCJtYWMiOiJmMjA2YWQyZThkODI4YzJiZmM1OWYzOWQwZDUyOWM2ZTA5ZGFkZjVlODAzMWNhZjA0YzVmNmQ4ZDE0OWIzODQzIn0%3D; ref=eyJpdiI6ImFZbUFGcm5OU3prQVhtdzJZYnZiaEE9PSIsInZhbHVlIjoiOWg5OHFhMHNQcnM4UTN0cXo0NXA5UT09IiwibWFjIjoiMzM5YzlmYTcwYzA3ZmVhOGY1NTFiYjVkNTA4ZDc4M2VjNTRkN2ZlYjhiOGFjZDY5YTUyOTRhN2FmYmI0ZmY4NyJ9; utm_campaign=eyJpdiI6ImprR1ZQNnllNzJ4N1F3ZFdpbCtjVXc9PSIsInZhbHVlIjoiSXFPdVVFTVNPUGhxWUtsV0QyY1ZnZz09IiwibWFjIjoiMmRhYTRiNDNhN2E5YmRiZGQzYjE2YzBlZTE0Y2E5MjMxODQxM2Q4OTU5NGZiOGI3MjU1NmM1YTFiMTMwMWJhZSJ9; utm_medium=eyJpdiI6InZ4REFGelZWeVZ2UXd1K3VwMWR3d2c9PSIsInZhbHVlIjoiSW01bmI4allpWjlRTW9iXC83U1VtUGc9PSIsIm1hYyI6IjY3MjllNjg2YTA1ZTc0YmMzZDQ4ZmFiZDQ2Y2VkOTA0ODI2MWYyNDZhODE1MTUwMmMzYjJjMjEyZWEzODFiYjcifQ%3D%3D; utm_source=eyJpdiI6IlFOS1d1eExiTFRPZTl4UndPa1VhWGc9PSIsInZhbHVlIjoiMnZaS1B4MFVEZTZ3djBwQ3Q5TVwvQkE9PSIsIm1hYyI6ImYwZTNkNGMwNjU3NTEyZTY0MzUwMTJiNDAyNGI4MDI1MjMxMzRlMWZlOWMwYzk5M2RlYzYwMjE1YThhMWVkNTAifQ%3D%3D; utm_content=eyJpdiI6IndBbGpmdGswMkNJNWxPSWpJTmtONXc9PSIsInZhbHVlIjoiVWx1UlJRU2diSlpZZWJyN2p6bTZUUT09IiwibWFjIjoiYmUyYmM0ZDBjZmE3NjYxYjM4MGNlNjFjODgwNTYwMzg5NTFiNDQ5NzEwY2M1MjU0ZGQ4OWQ2OGI2YTVkOGU2YSJ9; _ga=GA1.2.752296362.1619402008; _gid=GA1.2.2034739505.1619402008; _fbp=fb.1.1619402033004.1292834463`,
      'X-Forwarded-For': randomIP,
      'X-ProxyUser-Ip': randomIP
    },
    referrer: `https://ngabuburit.id/daftar?ref=${referralId}&utm_source=whatsapp&utm_campaign=Bonus`,
    body: postBody
  })
  .then(res => res.text())
  .then(res => {
    console.log(`[${moment().format('HH:mm:ss')}] Registering "${fullname}" - ${email}`.green.bold)
    resolve(true)
  })
  .catch(err => reject(err))
})

;(async () => {
  // CronJob
  new cronJob('* * * * * *', async function() {
    await functionRandomIP()
  }, null, true, 'Asia/Jakarta').start()

  // Loop Process
  for (loopProcess = 0; ; loopProcess++) {
    try {
      const idKota = ['1224', '1225', '1271', '1273', '1607', '1608', '1810', '1811']
      const fullname = `${faker.name.findName()}`
      const email = `${fullname.replace(/\s/g, '').toLowerCase()}${randNumber(5)}@gmail.com`
      const whatsappNumber = `85${randNumber(9)}`
      const resCSRF = await functionGetCSRF()
      await functionSubmitRegister(resCSRF, fullname, email, whatsappNumber, idKota[Math.floor(Math.random() * idKota.length)])
    } catch (err) {
      console.log(`[${moment().format('HH:mm:ss')}] Error : ${err.message}`.red.bold)
    }
  }
})()