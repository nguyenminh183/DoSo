import moment from 'moment';

export function xoaDau(str = '') {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}

const object = {
  xshcm: 'ho chi minh',
  xsdt: 'dong thap',
  xscm: 'ca mau',
  xsbt: 'ben tre',
  xsvt: 'vung tau',
  xsblc: 'bac lieu',
  xsdn: 'dong nai',
  xsct: 'can tho',
  xsst: 'soc trang',
  xstn: 'tay ninh',
  xsag: 'an giang',
  xsbth: 'binh thuan',
  xsvl: 'vinh long',
  xsbd: 'binh duong',
  xstv: 'tra vinh',
  xsla: 'long an',
  xsbp: 'binh phuoc',
  xshg: 'hau giang',
  xstg: 'tien giang',
  xskg: 'kien giang',
  xsdl: 'da lat',
  xspy: 'phu yen',
  xstth: 'thua thien hue',
  xsdlk: 'dak lak',
  xsqnm: 'quang nam',
  xsdng: 'da nang',
  xskh: 'khanh hoa',
  xsqb: 'quang binh',
  xsbdh: 'binh dinh',
  xsqt: 'quang tri',
  xsgl: 'gia lai',
  xsnth: 'ninh thuan',
  xsqng: 'quang ngai',
  xsdkn: 'dak nong',
  xskt: 'kon tum',
};

const ids = {
  xshcm: 7,
  xsdt: 8,
  xscm: 9,
  xsbt: 10,
  xsvt: 11,
  xsblc: 12,
  xsdn: 13,
  xsct: 14,
  xsst: 15,
  xstn: 16,
  xsag: 17,
  xsbth: 18,
  xsvl: 19,
  xsbd: 20,
  xstv: 21,
  xsla: 22,
  xsbp: 23,
  xshg: 24,
  xstg: 25,
  xskg: 26,
  xsdl: 27,
  xspy: 28,
  xstth: 29,
  xsdlk: 30,
  xsqnm: 31,
  xsdng: 32,
  xskh: 33,
  xsqb: 34,
  xsbdh: 35,
  xsqt: 36,
  xsgl: 37,
  xsnth: 38,
  xsqng: 39,
  xsdkn: 40,
  xskt: 41,
};

const dsTenGiaiThuong = {
  1: 'Giai dac biet',
  2: 'Giai nhat',
  3: 'Giai nhi',
  4: 'Giai ba',
  5: 'Giai tu',
  6: 'Giai nam',
  7: 'Giai sau',
  8: 'Giai bay',
  9: 'Giai tam',
};

export function timDai(text) {
  console.log('timDai', text)
  let result = '';
  let text1 = xoaDau(text);
  Object.entries(object).forEach(([ma, ten]) => {
    if (result) return;
    if (text1 === ten || text1 === ma) result = ma;
  });
  return result;
}

export const timKetQua = async (ngay, maDai) => {
  try {
    const id = ids[maDai];
    const details = {
      id,
      searchDate: moment(ngay, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      searchNumber: '123456',
    };

    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join('&');
    console.log('request', formBody);

    const response = await fetch(
      'https://www.kqxs.vn/?com=statistics&act=searchresultajax&ajax=1',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      },
    );
    const json = await response.json();
    console.log(json);
    return json.numbers[id];
  } catch (error) {
    console.error(error);
    return null;
  }
};
