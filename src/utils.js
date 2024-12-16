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
const object1 = {
  xshcm: 'Tp.Hồ Chí Minh',
  xsdt: 'Đồng Tháp',
  xscm: 'Cà Mau',
  xsbt: 'Bến Tre',
  xsvt: 'Vũng Tàu',
  xsblc: 'Bạc Liêu',
  xsdn: 'Đồng Nai',
  xsct: 'Cần Thơ',
  xsst: 'Sóc Trăng',
  xstn: 'Tây Ninh',
  xsag: 'An Giang',
  xsbth: 'Bình Thuận',
  xsvl: 'Vĩnh Long',
  xsbd: 'Bình Dương',
  xstv: 'Trà Vinh',
  xsla: 'Long An',
  xsbp: 'Bình Phước',
  xshg: 'Hậu Giang',
  xstg: 'Tiền Giang',
  xskg: 'Kiên Giang',
  xsdl: 'Đà Lạt',
  xspy: 'Phú Yên',
  xstth: 'Thừa Thiên Huế',
  xsdlk: 'Đắk Lắk',
  xsqnm: 'Quảng Nam',
  xsdng: 'Đà Nẵng',
  xskh: 'Khánh Hòa',
  xsqb: 'Quảng Bình',
  xsbdh: 'Bình Định',
  xsqt: 'Quảng Trị',
  xsgl: 'Gia Lai',
  xsnth: 'Ninh Thuận',
  xsqng: 'Quảng Ngãi',
  xsdkn: 'Đắk Nông',
  xskt: 'Kon Tum',
};
export const object3 = {
  'ho chi minh': 'Tp.Hồ Chí Minh',
  'dong thap': 'Đồng Tháp',
  'ca mau': 'Cà Mau',
  'ben tre': 'Bến Tre',
  'vung tau': 'Vũng Tàu',
  'bac lieu': 'Bạc Liêu',
  'dong nai': 'Đồng Nai',
  'can tho': 'Cần Thơ',
  'soc trang': 'Sóc Trăng',
  'tay ninh': 'Tây Ninh',
  'an giang': 'An Giang',
  'binh thuan': 'Bình Thuận',
  'vinh long': 'Vĩnh Long',
  'binh duong': 'Bình Dương',
  'tra vinh': 'Trà Vinh',
  'long an': 'Long An',
  'binh phuoc': 'Bình Phước',
  'hau giang': 'Hậu Giang',
  'tien giang': 'Tiền Giang',
  'kien giang': 'Kiên Giang',
  'da lat': 'Đà Lạt',
  'phu yen': 'Phú Yên',
  'thua thien hue': 'Thừa Thiên Huế',
  'dak lak': 'Đắk Lắk',
  'quang nam': 'Quảng Nam',
  'da nang': 'Đà Nẵng',
  'khanh hoa': 'Khánh Hòa',
  'quang binh': 'Quảng Bình',
  'binh dinh': 'Bình Định',
  'quang tri': 'Quảng Trị',
  'gia lai': 'Gia Lai',
  'ninh thuan': 'Ninh Thuận',
  'quang ngai': 'Quảng Ngãi',
  'dak nong': 'Đắk Nông',
  'kon tum': 'Kon Tum',
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
  1: 'Giải Đặc Biệt',
  2: 'Giải Nhất',
  3: 'Giải Nhì',
  4: 'Giải Ba',
  5: 'Giải Tư',
  6: 'Giải Năm',
  7: 'Giải Sáu',
  8: 'Giải Bảy',
  9: 'Giải Tám',
};
export function timDai(text) {
  let result = '';
  let text1 = xoaDau(text);
  Object.entries(object).forEach(([ma, ten]) => {
    if (result) {
      return;
    } else if (text1 === ten || text1 === ma) {
      result = ma;
    }
  });
  return result;
}
//
//
export const timKetQua = async (ngay, maDai, so) => {
  try {
    const id = ids[maDai];
    const details = {
      id,
      searchDate: moment(ngay, 'DD-MM-YYYY').format('YYYY-MM-DD'),
      searchNumber: so,
    };
    console.log('details', details);
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const response = await fetch(
      'https://www.kqxs.vn/?com=statistics&act=searchresultajax&ajax=1',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      }
    );
    const json = await response.json();
    console.log(json.numbers);
    const result = {
      daySo: so,
      dai: object[maDai],
      daiCoDau: object1[maDai],
      ngay: ngay,
    };

    const giaiDacBiet = json.numbers[id]["1"]?.[0]; // Lấy giải đặc biệt
    const soCuoi5 = giaiDacBiet?.slice(-5); // 5 chữ số cuối của giải đặc biệt

    Object.entries(json.numbers[id]).forEach(([key, value]) => {
      if (result.giai) {
        return;
      } else {
        const length = value[0].length;
        const text5 = so
          .split('')
          .splice(6 - length)
          .join('');
        if (value.includes(text5)) {
          result.giai = dsTenGiaiThuong[key];
        }
      }
    });

    //giải phụ đặc biệt
    if (!result.giai && so.slice(-5) === soCuoi5) {
      result.giai = 'Giải Phụ Đặc Biệt';
    }

    //giải khuyến khích
    if (
      !result.giai &&
      giaiDacBiet &&
      so.split('').filter((digit, index) => digit !== giaiDacBiet[index])
        .length === 1
    ) {
      result.giai = 'Giải Khuyến Khích';
    }

    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
};


/**
 * const months = '123456'.split('');
months.splice(0, 3);
console.log(months.join(''));
 */
