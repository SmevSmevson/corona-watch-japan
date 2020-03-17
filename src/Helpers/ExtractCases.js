

function getCases() {
    let foundCase = {
        case_number: 'please enter',
        age: 'please enter',
        gender: 'please enter',
        location: 'please enter',
        residence: 'please enter',
        date: 'please enter',
        status: 'ongoing treatment',
        visited_wuhan: false,
        visited_china: false,
        source: window.location.href 
    }
    //target the paragraph
    document.querySelector("#content > div.l-contentBody > div > div.l-contentMain > div:nth-child(4) > div").childNodes.forEach(el => {
        // parse each element
        if(el.innerText && el.innerText.includes('(February')){
            let opening = el.innerText.replace(" o'clock", ':00')
            let times = opening.match(/([01]?[0-9]|2[0-3]):[0-5][0-9]?/g)
            let month = opening.match(/[^((]+(?=\))/g)[0]

            let fullDate = times&&times.length ? `2020 ${month} ${times[0]}` : `2020 ${month}`
            foundCase.date = new Date(fullDate).toISOString()
        }
        else if(el.innerText && el.innerText.includes('Age')){
            foundCase.age = +el.innerText.substr(9,2)
        }
        else if(el.innerText && el.innerText.includes('Gender')){
            foundCase.gender = el.innerText.substr(12)
        }
        else if(el.innerText && el.innerText.includes('Place of residence')){
            foundCase.residence = el.innerText.substr(24).split(' ')[0]
            foundCase.location = foundCase.residence
        }
        else if(el.innerText && el.innerText.includes('Residence')){
            foundCase.residence = el.innerText.substr(15).split(' ')[0]
            foundCase.location = foundCase.residence
        }
        else if(el.innerText && el.innerText.includes('(5)')){
            //End of data collection for this case
            console.log('found case')
            console.log(JSON.stringify(foundCase))
        }
    })
}

function extractCasesFromTable() {
    let cases = [];
    document.querySelector("#content > div.l-contentBody > div > div.l-contentMain > div:nth-child(4) > div > table:nth-child(139) > tbody").childNodes.forEach(tr => {
        let currentCase = {
            case_number: 'please enter',
            age: 'please enter',
            gender: 'please enter',
            location: 'please enter',
            residence: 'please enter',
            date: 'please enter',
            status: 'alive',
            contact: [],
            source: window.location.href 
        }
        // console.log(tr.nodeType)
        if(tr.nodeType !== 1)
            return
        
        let noCol = tr.childNodes[3]
        currentCase.case_number = noCol ? +noCol.textContent.replace('&nbsp;', '') : ''
        if(currentCase.case_number <= 232)
            return

        let dateCol = tr.childNodes[5]
        currentCase.date = dateCol ? `2020/${dateCol.textContent}` : ''
        let ageCol = tr.childNodes[7]
        currentCase.age = ageCol ? ageCol.textContent.replace('s','') : ''
        let genderCol = tr.childNodes[9]
        currentCase.gender = genderCol ? genderCol.textContent === 'Man' ? genderCol.textContent.replace('Man','Male') : genderCol.textContent.replace('woman','Female') : ''
        let residenceCol = tr.childNodes[11]
        currentCase.residence = residenceCol ? residenceCol.textContent.split(' ')[0] : ''
        let contactCol = tr.childNodes[13]
        currentCase.contact = contactCol ? contactCol.textContent.split(' ').map(arr => arr.trim()) : ''

        cases.push(currentCase)
    })

    // console.log(cases)
    console.log(JSON.stringify(cases))
}

getCasesInParagraph() {
    const locations = [
        [
          "Japan",
          "日本",
          "00"
        ],
        [
          "Hokkaido",
          "北海道",
          "01"
        ],
        [
          "Aomori",
          "青森県",
          "02"
        ],
        [
          "Iwate",
          "岩手県",
          "03"
        ],
        [
          "Miyagi",
          "宮城県",
          "04"
        ],
        [
          "Akita",
          "秋田県",
          "05"
        ],
        [
          "Yamagata",
          "山形県",
          "06"
        ],
        [
          "Fukushima",
          "福島県",
          "07"
        ],
        [
          "Ibaraki",
          "茨城県",
          "08"
        ],
        [
          "Tochigi",
          "栃木県",
          "09"
        ],
        [
          "Gunma",
          "群馬県",
          "10"
        ],
        [
          "Saitama",
          "埼玉県",
          "11"
        ],
        [
          "Chiba",
          "千葉県",
          "12"
        ],
        [
          "Tokyo",
          "東京都",
          "13"
        ],
        [
          "Kanagawa",
          "神奈川県",
          "14"
        ],
        [
          "Niigata",
          "新潟県",
          "15"
        ],
        [
          "Toyama",
          "富山県",
          "16"
        ],
        [
          "Ishikawa",
          "石川県",
          "17"
        ],
        [
          "Fukui",
          "福井県",
          "18"
        ],
        [
          "Yamanashi",
          "山梨県",
          "19"
        ],
        [
          "Nagano",
          "長野県",
          "20"
        ],
        [
          "Gifu",
          "岐阜県",
          "21"
        ],
        [
          "Shizuoka",
          "静岡県",
          "22"
        ],
        [
          "Aichi",
          "愛知県",
          "23"
        ],
        [
          "Mie",
          "三重県",
          "24"
        ],
        [
          "Shiga",
          "滋賀県",
          "25"
        ],
        [
          "Kyoto",
          "京都府",
          "26"
        ],
        [
          "Osaka",
          "大阪府",
          "27"
        ],
        [
          "Hyogo",
          "兵庫県",
          "28"
        ],
        [
          "Nara",
          "奈良県",
          "29"
        ],
        [
          "Wakayama",
          "和歌山県",
          "30"
        ],
        [
          "Tottori",
          "鳥取県",
          "31"
        ],
        [
          "Shimane",
          "島根県",
          "32"
        ],
        [
          "Okayama",
          "岡山県",
          "33"
        ],
        [
          "Hiroshima",
          "広島県",
          "34"
        ],
        [
          "Yamaguchi",
          "山口県",
          "35"
        ],
        [
          "Tokushima",
          "徳島県",
          "36"
        ],
        [
          "Kagawa",
          "香川県",
          "37"
        ],
        [
          "Ehime",
          "愛媛県",
          "38"
        ],
        [
          "Kochi",
          "高知県",
          "39"
        ],
        [
          "Fukuoka",
          "福岡県",
          "40"
        ],
        [
          "Saga",
          "佐賀県",
          "41"
        ],
        [
          "Nagasaki",
          "長崎県",
          "42"
        ],
        [
          "Kumamoto",
          "熊本県",
          "43"
        ],
        [
          "Oita",
          "大分県",
          "44"
        ],
        [
          "Miyazaki",
          "宮崎県",
          "45"
        ],
        [
          "Kagoshima",
          "鹿児島県",
          "46"
        ],
        [
          "Okinawa",
          "沖縄県",
          "47"
        ],
        [
          "Undisclosed",
          "非公開",
          "48"
        ],
        [
          "Outside Reporting Country",
          "",
          "49"
        ],
        [
          "Charter",
          "チャーター",
          "50"
        ],
        [
          "Diamond Princess",
          "",
          "51"
        ],
        [
          "China",
          "中国",
          "52"
        ],
        [
          "investigating",
          "investigating",
          "53"
        ]
    ]
    let content = document.querySelector("#content > div.l-contentBody > div > div.l-contentMain > div:nth-child(4) > div")
    let startIndex = content.innerText.search('概要')
    let endIndex = content.innerText.search('\n以下')
    let casesContent = content.innerText.substring(startIndex, endIndex)
    let casesArr = casesContent.split('\n')
    casesArr.pop()
    casesArr.shift()
    //高知市：患者３例（259例目：40代女性、260例目：60代男性、261例目：60代女性）
    let casesMap = casesArr.map(casesByLocation => {
        let location = casesByLocation.substring(0, casesByLocation.search('：')) //then translate to english
        let cases = casesByLocation.substring(casesByLocation.search(/例（/g) + 2, casesByLocation.length - 1).split('、')
        console.log('location', location, 'cases', cases)
        return cases.map(c => {
            //extract from string
            let case_number = c.substring(0, c.search('例目'))
            let age = 'please enter'
            let gender = 'please enter'
            let regex = RegExp('代')
            if(regex.test(c)) {
                age = c.substring(c.search('：') + 1, c.search('代'))
                gender = c.substring(c.search('代') + 1)
            } else {
                age = c.substring(c.search('：') + 1, c.search('歳未満'))
                gender = c.substring(c.search('歳未満') + 1)
            }

            //translate to english
            gender = gender === '男性' ? 'Male' : 'Female'
            let engLocation = locations.find(l => l[1] === location)
            console.log(engLocation)
            if(engLocation)
                location = engLocation[0]

            return {
                case_number: +case_number,
                age,
                gender,
                location,
                residence: location,
                date: '2020/3/7',
                status: 'alive',
                contact: ['investigating'],
                charter: false,
                source: window.location.href, 
            }
        })
    })
    console.log(JSON.stringify(casesMap.flatMap(arr => arr)))
}